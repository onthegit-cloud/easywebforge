
import { toast } from "@/components/ui/use-toast";

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

    // Basic extraction of code blocks from the response
    const codeBlockRegex = /```(?:jsx?|tsx?|react)?\s*([\s\S]*?)```/;
    const match = generatedText.match(codeBlockRegex);
    
    const cleanedCode = match ? match[1].trim() : generatedText;
    
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

// Generate HTML preview from React code (simple approach for demo)
export const generateHtmlPreview = (reactCode: string): string => {
  // This is a simplified approach - in a real implementation, you would use a more robust method
  // like server-side rendering or a sandboxed environment
  
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
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    ${reactCode}
    
    // Render the component to the DOM
    const componentName = Object.keys(window).find(key => 
      typeof window[key] === 'function' && 
      /^[A-Z]/.test(key) && 
      key !== 'React' && 
      key !== 'ReactDOM'
    );
    
    if (componentName) {
      ReactDOM.render(React.createElement(window[componentName]), document.getElementById('root'));
    } else {
      // Fallback if we can't determine the component name
      // Try to execute the last line if it's an export default statement
      try {
        const lines = \`${reactCode}\`.split('\\n');
        const lastLine = lines[lines.length - 1];
        if (lastLine.includes('export default')) {
          const componentNameMatch = lastLine.match(/export\\s+default\\s+([A-Za-z0-9_]+)/);
          if (componentNameMatch && componentNameMatch[1]) {
            ReactDOM.render(React.createElement(window[componentNameMatch[1]]), document.getElementById('root'));
          }
        }
      } catch (e) {
        console.error('Error rendering component:', e);
        document.getElementById('root').innerHTML = '<div class="p-4 text-red-500">Error rendering component</div>';
      }
    }
  </script>
</body>
</html>
  `;

  return htmlTemplate;
};
