
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
                text: `Create a complete, fully functional React component based on this description: ${prompt}.
                
                Requirements:
                - Use Tailwind CSS for styling
                - Include necessary imports (React, hooks, etc.)
                - Implement actual functionality, not just UI
                - Add proper event handlers and state management
                - Include comments explaining complex logic
                - Make the component responsive
                - Follow React best practices
                - Use modern React patterns (hooks, functional components)
                
                Return ONLY the complete React code without any explanations or markdown.
                The code should be ready to use in a React+Tailwind project.
                DO NOT omit any parts of the code for brevity.
                Include ALL necessary imports, event handlers, and state variables.`
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
    
    // If we found a code block, use that; otherwise use the entire response
    const cleanedCode = match ? match[1].trim() : generatedText.trim();
    
    console.log("Generated code:", cleanedCode.substring(0, 200) + "...");
    
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
      // Define common mock functions and libraries that components might need
      window.fetch = window.fetch || function mockFetch(url) {
        console.log('Mock fetch called with:', url);
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'Mock data' }),
          text: () => Promise.resolve('Mock text response')
        });
      };
      
      // Mock router functions
      window.navigate = (path) => console.log('Navigate to:', path);
      
      // Mock event functions
      window.preventDefault = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        return false;
      };
      
      ${reactCode}
      
      // Try different approaches to render the component
      const renderComponent = () => {
        // Try to find the component by looking for capitalized variables or function/class declarations
        const componentRegex = /(?:function|const)\\s+([A-Z][A-Za-z0-9_]*)\\s*(?:=|\\()/g;
        const matches = [...reactCode.matchAll(componentRegex)];
        const componentNames = matches.map(match => match[1])
          .filter(name => typeof window[name] === 'function' || React.isValidElement(window[name]));
        
        if (componentNames.length > 0) {
          // Use the first found component
          const MainComponent = window[componentNames[0]];
          console.log('Rendering component:', componentNames[0]);
          return ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(MainComponent)
          );
        }
        
        // Try to extract from export default or export const Component
        const exportDefaultMatch = \`${reactCode}\`.match(/export\\s+default\\s+([A-Za-z0-9_]+)/);
        if (exportDefaultMatch && exportDefaultMatch[1] && window[exportDefaultMatch[1]]) {
          const ExportedComponent = window[exportDefaultMatch[1]];
          console.log('Rendering exported default component:', exportDefaultMatch[1]);
          return ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(ExportedComponent)
          );
        }
        
        const exportConstMatch = \`${reactCode}\`.match(/export\\s+const\\s+([A-Za-z0-9_]+)/);
        if (exportConstMatch && exportConstMatch[1] && window[exportConstMatch[1]]) {
          const ExportedConstComponent = window[exportConstMatch[1]];
          console.log('Rendering exported const component:', exportConstMatch[1]);
          return ReactDOM.createRoot(document.getElementById('root')).render(
            React.createElement(ExportedConstComponent)
          );
        }
        
        // Look for any function or class that might be a component
        for (const key in window) {
          if (typeof window[key] === 'function' && /^[A-Z]/.test(key) && key !== 'React' && key !== 'ReactDOM') {
            console.log('Found potential component:', key);
            const PotentialComponent = window[key];
            try {
              console.log('Attempting to render component:', key);
              return ReactDOM.createRoot(document.getElementById('root')).render(
                React.createElement(PotentialComponent)
              );
            } catch (error) {
              console.error('Failed to render component:', key, error);
              continue;
            }
          }
        }
        
        throw new Error("Could not find a React component to render. Make sure your component is properly defined and exported.");
      }
      
      // Call the render function
      renderComponent();
    } catch (error) {
      console.error('Error rendering component:', error);
      document.getElementById('root').innerHTML = \`
        <div class="error-message">
          <h3>Error Rendering Component</h3>
          <p>\${error.message}</p>
          <pre>\${error.stack}</pre>
        </div>
      \`;
    }
  </script>
</body>
</html>
  `;

  return htmlTemplate;
};
