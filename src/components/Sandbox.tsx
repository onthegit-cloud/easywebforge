
import React, { useRef, useEffect, useState } from 'react';
import { Loader2, RefreshCw, AlertTriangle } from 'lucide-react';

interface SandboxProps {
  htmlContent: string;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export const Sandbox: React.FC<SandboxProps> = ({ 
  htmlContent, 
  isLoading = false,
  onRefresh 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!htmlContent || isLoading) return;
    
    setIsRendering(true);
    setError(null);
    setConsoleMessages([]);
    
    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      
      // Clear previous timeout
      const timeoutId = setTimeout(() => {
        setError('Preview timed out. The code might contain an infinite loop or other runtime errors.');
        setIsRendering(false);
      }, 8000); // Increased timeout for more complex components
      
      // Load content into the iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
      
      // Capture console messages from the iframe
      if (iframe.contentWindow) {
        const originalConsoleLog = iframe.contentWindow.console.log;
        const originalConsoleError = iframe.contentWindow.console.error;
        
        iframe.contentWindow.console.log = function(...args) {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          
          setConsoleMessages(prev => [...prev, `LOG: ${message}`]);
          originalConsoleLog.apply(this, args);
        };
        
        iframe.contentWindow.console.error = function(...args) {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          
          setConsoleMessages(prev => [...prev, `ERROR: ${message}`]);
          originalConsoleError.apply(this, args);
        };
      }
      
      // Listen for load event
      const handleLoad = () => {
        clearTimeout(timeoutId);
        setIsRendering(false);
        console.log("Iframe loaded successfully");
        
        // Check if there was an error message rendered in the iframe
        const errorElements = iframe.contentDocument?.querySelectorAll('.error-message');
        if (errorElements && errorElements.length > 0) {
          setError('Component failed to render. Check console for details.');
        }
      };
      
      iframe.addEventListener('load', handleLoad);
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
        clearTimeout(timeoutId);
      };
    } catch (err) {
      console.error("Sandbox error:", err);
      setError(`Error rendering preview: ${err instanceof Error ? err.message : String(err)}`);
      setIsRendering(false);
    }
  }, [htmlContent, isLoading]);

  // Debug function to show console messages
  const showConsoleMessages = () => {
    if (consoleMessages.length > 0) {
      console.log("Iframe console messages:", consoleMessages);
    }
  };

  useEffect(() => {
    showConsoleMessages();
  }, [consoleMessages]);

  return (
    <div className="w-full h-full relative border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden bg-white dark:bg-gray-900">
      {(isLoading || isRendering) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 z-10">
          <Loader2 size={40} className="text-primary animate-spin mb-4" />
          <p className="text-muted-foreground animate-pulse">
            {isLoading ? 'Generating preview...' : 'Rendering preview...'}
          </p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 z-10">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 w-full max-w-md">
            <div className="flex items-center mb-2">
              <AlertTriangle size={16} className="text-red-600 dark:text-red-400 mr-2" />
              <h3 className="text-red-800 dark:text-red-400 font-medium">Preview Error</h3>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            
            {consoleMessages.length > 0 && (
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/40 rounded-sm overflow-auto max-h-32 text-xs font-mono">
                {consoleMessages.map((msg, i) => (
                  <div key={i} className={`${msg.startsWith('ERROR') ? 'text-red-600 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {msg}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="mt-4 flex items-center px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              <RefreshCw size={16} className="mr-2" />
              Try Again
            </button>
          )}
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        title="Code Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
