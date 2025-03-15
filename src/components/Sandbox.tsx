
import React, { useRef, useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

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

  useEffect(() => {
    if (!htmlContent || isLoading) return;
    
    setIsRendering(true);
    setError(null);
    
    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      
      // Clear previous timeout
      const timeoutId = setTimeout(() => {
        setError('Preview timed out. The code might contain an infinite loop or other runtime errors.');
        setIsRendering(false);
      }, 5000);
      
      // Load content into the iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
      
      // Listen for load event
      const handleLoad = () => {
        clearTimeout(timeoutId);
        setIsRendering(false);
        console.log("Iframe loaded successfully");
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
            <h3 className="text-red-800 dark:text-red-400 font-medium mb-2">Preview Error</h3>
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
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
