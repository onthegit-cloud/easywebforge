
import { toast } from "@/components/ui/use-toast";

// Default API key for users who don't provide their own
const DEFAULT_API_KEY = 'AIzaSyCdCNrlbaz_OJvRQpi1bD6hnF3IUOApz_Y';

// API key would typically be stored in environment variables
// For demo purposes, we'll use a placeholder that users need to replace
let apiKey = '';

export const setGeminiApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('gemini_api_key', key);
  return true;
};

export const getGeminiApiKey = (): string => {
  if (!apiKey) {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      apiKey = storedKey;
    } else {
      // If no user API key is set, use the default key
      apiKey = DEFAULT_API_KEY;
    }
  }
  return apiKey;
};

interface GenerateCodeOptions {
  prompt: string;
  model?: string;
}

export const generateCode = async ({ prompt, model = 'gemini-1.5-pro' }: GenerateCodeOptions) => {
  try {
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please add your Gemini API key in settings",
        variant: "destructive",
      });
      return null;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a React component based on this description: ${prompt}. 
                       Use Tailwind CSS for styling.
                       Return only the complete React code without any explanations.
                       The code should be ready to use in a React+Tailwind project.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to generate code');
    }

    const data = await response.json();
    
    // Extract the generated code from the response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No code was generated');
    }

    // Better extraction of code blocks from the response
    const codeBlockRegex = /```(?:jsx?|tsx?|react)?\s*([\s\S]*?)```/;
    const match = generatedText.match(codeBlockRegex);
    
    const cleanedCode = match ? match[1].trim() : generatedText.trim();
    
    return {
      code: cleanedCode,
      rawResponse: data
    };
  } catch (error) {
    console.error('Error generating code:', error);
    toast({
      title: "Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate code",
      variant: "destructive",
    });
    return null;
  }
};

// Improved HTML preview generator for React code
export const generateHtmlPreview = (reactCode: string): string => {
  // Create a more robust HTML template with proper error handling
  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <title>React Preview</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    #root {
      width: 100%;
      height: 100%;
    }
    .error-message {
      color: #ef4444;
      padding: 1rem;
      margin: 1rem;
      border: 1px solid #f87171;
      border-radius: 0.375rem;
      background-color: #fef2f2;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    try {
      ${reactCode}
      
      // Try different approaches to render the component
      const renderComponent = () => {
        // Try to find the component by looking for capitalized variables
        const componentNames = Object.keys(window).filter(key => 
          typeof window[key] === 'function' && 
          /^[A-Z]/.test(key) && 
          key !== 'React' && 
          key !== 'ReactDOM' &&
          key !== 'Babel'
        );
        
        if (componentNames.length > 0) {
          // Use the first found component
          return ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(window[componentNames[0]])
          );
        }
        
        // Try to extract from export default or export const Component
        const exportDefaultMatch = \`${reactCode}\`.match(/export\\s+default\\s+([A-Za-z0-9_]+)/);
        if (exportDefaultMatch && exportDefaultMatch[1] && window[exportDefaultMatch[1]]) {
          return ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(window[exportDefaultMatch[1]])
          );
        }
        
        const exportConstMatch = \`${reactCode}\`.match(/export\\s+const\\s+([A-Za-z0-9_]+)/);
        if (exportConstMatch && exportConstMatch[1] && window[exportConstMatch[1]]) {
          return ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(window[exportConstMatch[1]])
          );
        }
        
        throw new Error("Could not find a React component to render");
      }
      
      // Call the render function
      renderComponent();
    } catch (error) {
      console.error('Error rendering component:', error);
      document.getElementById('root').innerHTML = \`
        <div class="error-message">
          <h3>Error Rendering Component</h3>
          <p>\${error.message}</p>
        </div>
      \`;
    }
  </script>
</body>
</html>
  `;

  return htmlTemplate;
};
