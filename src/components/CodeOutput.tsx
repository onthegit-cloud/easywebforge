
import React, { useState, useEffect } from 'react';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeOutputProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ 
  code, 
  language = 'jsx', 
  filename = 'component.jsx' 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    Prism.highlightAll();
    
    const highlight = () => {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language
      );
      setHighlightedCode(highlighted);
    };
    
    highlight();
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageForFilename = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js': return 'javascript';
      case 'jsx': return 'jsx';
      case 'ts': return 'typescript';
      case 'tsx': return 'tsx';
      case 'css': return 'css';
      case 'html': return 'html';
      case 'json': return 'json';
      default: return extension || 'text';
    }
  };

  const displayLanguage = getLanguageForFilename(filename);

  return (
    <div className="glass-panel overflow-hidden mb-8 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center">
          <span className="text-xs font-medium text-muted-foreground">{filename}</span>
          <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-gray-200 dark:bg-gray-800 text-muted-foreground">
            {displayLanguage}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className={cn(
              "p-1.5 rounded-md transition-colors duration-200 flex items-center text-xs",
              isCopied 
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400" 
                : "text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-gray-800"
            )}
            title="Copy code"
          >
            {isCopied ? (
              <>
                <Check size={14} className="mr-1" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={downloadCode}
            className="p-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md flex items-center"
            title="Download code"
          >
            <Download size={14} className="mr-1" />
            <span>Download</span>
          </button>
          <button
            onClick={() => {
              // This would open in CodeSandbox or similar service in a real app
              console.log('Open in sandbox');
            }}
            className="p-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md flex items-center"
            title="Open in sandbox"
          >
            <ExternalLink size={14} className="mr-1" />
            <span>Open</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto max-h-[500px] p-4 bg-[#2d2d2d] text-gray-100 font-mono text-sm">
        {highlightedCode ? (
          <pre className="language-none">
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        ) : (
          <pre className="language-none">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
