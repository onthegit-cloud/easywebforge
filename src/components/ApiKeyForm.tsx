
import React, { useState, useEffect } from 'react';
import { Settings, Key } from 'lucide-react';
import { setGeminiApiKey, getGeminiApiKey } from '@/services/geminiService';

interface ApiKeyFormProps {
  onKeySet?: (isSet: boolean) => void;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onKeySet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = getGeminiApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
      onKeySet?.(true);
    }
  }, [onKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setGeminiApiKey(apiKey.trim());
      setIsSaved(true);
      setIsOpen(false);
      onKeySet?.(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
        title="API Settings"
      >
        <Settings size={18} />
        <span className="ml-2 text-sm">API Settings</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 w-80 p-4 bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-50">
          <div className="flex items-center mb-4">
            <Key size={16} className="mr-2 text-primary" />
            <h3 className="font-medium">Gemini API Key</h3>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false);
                }}
                placeholder="Enter your Gemini API key"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your API key is stored locally and is never sent to our servers.
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              {isSaved && (
                <span className="text-xs text-green-500">API key saved</span>
              )}
              
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-sm mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
