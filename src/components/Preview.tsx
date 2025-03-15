
import React, { useEffect, useState } from 'react';
import { ArrowDown, Code, Copy, Download, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeOutput } from './CodeOutput';
import { Sandbox } from './Sandbox';

interface PreviewProps {
  isGenerating: boolean;
  generatedCode?: string;
  previewHtml?: string;
  onRefresh?: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ 
  isGenerating, 
  generatedCode = '', 
  previewHtml = '', 
  onRefresh 
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isCopied, setIsCopied] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (generatedCode && activeTab === 'code') {
        setShowScrollHint(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [generatedCode, activeTab]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-app.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel overflow-hidden transition-all duration-300 flex flex-col h-[500px]">
      <div className="border-b border-gray-200 dark:border-gray-800 flex items-center">
        <TabButton 
          isActive={activeTab === 'preview'} 
          onClick={() => setActiveTab('preview')}
          disabled={isGenerating && !previewHtml}
        >
          Preview
        </TabButton>
        <TabButton 
          isActive={activeTab === 'code'} 
          onClick={() => setActiveTab('code')}
          disabled={isGenerating && !generatedCode}
        >
          <Code size={14} className="mr-1.5" />
          Code
        </TabButton>
        
        <div className="ml-auto flex items-center pr-2">
          {activeTab === 'code' && generatedCode && (
            <>
              <button
                onClick={copyToClipboard}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md"
                title="Copy code"
              >
                {isCopied ? (
                  <span className="text-green-500 text-xs font-medium">Copied!</span>
                ) : (
                  <Copy size={14} />
                )}
              </button>
              <button
                onClick={downloadCode}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md"
                title="Download code"
              >
                <Download size={14} />
              </button>
            </>
          )}
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md"
              title="Regenerate"
              disabled={isGenerating}
            >
              <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 size={40} className="text-primary animate-spin mb-4" />
            <p className="text-muted-foreground animate-pulse">Generating your application...</p>
          </div>
        )}
        
        {activeTab === 'preview' ? (
          previewHtml ? (
            <Sandbox 
              htmlContent={previewHtml} 
              isLoading={isGenerating}
              onRefresh={onRefresh}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No preview available yet
            </div>
          )
        ) : (
          <div className="h-full overflow-auto p-4">
            {generatedCode ? (
              <CodeOutput code={generatedCode} language="jsx" filename="component.jsx" />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No code generated yet
              </div>
            )}
            
            {showScrollHint && (
              <div 
                className="absolute bottom-4 right-4 bg-primary text-white text-xs py-1 px-2 rounded-full flex items-center animate-bounce opacity-70 hover:opacity-100 transition-opacity duration-200"
                onClick={() => setShowScrollHint(false)}
              >
                <ArrowDown size={12} className="mr-1" />
                Scroll to see more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, disabled, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "px-4 py-2.5 text-sm font-medium transition-colors duration-200 flex items-center",
      isActive 
        ? "text-primary border-b-2 border-primary" 
        : "text-muted-foreground hover:text-foreground",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);
