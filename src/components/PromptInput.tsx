
import React, { useState } from 'react';
import { Send, Trash, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGeminiApiKey } from '@/services/geminiService';
import { ApiKeyForm } from './ApiKeyForm';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isProcessing: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isProcessing }) => {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(!!getGeminiApiKey());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      onSubmit(prompt.trim());
    }
  };

  const handleClear = () => {
    setPrompt('');
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-foreground">Describe your application</h3>
        <ApiKeyForm onKeySet={setIsApiKeySet} />
      </div>
      
      <div 
        className={cn(
          "glass-panel transition-all duration-300 relative",
          isFocused ? "shadow-md ring-2 ring-primary/20" : "shadow-sm"
        )}
      >
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe the web app you want to create..."
            className="w-full h-32 resize-none bg-transparent p-4 pr-24 text-foreground focus:outline-none"
            disabled={isProcessing}
          />
          
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            {prompt && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md"
                title="Clear prompt"
              >
                <Trash size={16} />
              </button>
            )}
            
            <button
              type="submit"
              disabled={!prompt.trim() || isProcessing}
              className={cn(
                "p-2 rounded-md transition-all duration-200 flex items-center justify-center",
                prompt.trim() && !isProcessing
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
              )}
              title="Send prompt"
            >
              {isProcessing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </form>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-2 text-xs">
          <SuggestionButton onClick={() => setPrompt("Create a landing page for a SaaS product with hero, features, and pricing")}>
            Landing page
          </SuggestionButton>
          <SuggestionButton onClick={() => setPrompt("Create a blog post layout with featured image, author info, and related posts")}>
            Blog layout
          </SuggestionButton>
          <SuggestionButton onClick={() => setPrompt("Create a dashboard with charts, stats cards, and a sidebar navigation")}>
            Dashboard
          </SuggestionButton>
          <SuggestionButton onClick={() => setPrompt("Create a product page with image gallery, reviews, and checkout form")}>
            E-commerce
          </SuggestionButton>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2 px-1">
        Be specific about the components, layout, and functionality you need. The more details, the better the result.
      </p>
    </div>
  );
};

const SuggestionButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ 
  onClick, 
  children 
}) => (
  <button
    type="button"
    onClick={onClick}
    className="px-2 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors duration-200 text-xs"
  >
    {children}
  </button>
);
