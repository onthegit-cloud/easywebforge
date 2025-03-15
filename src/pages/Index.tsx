
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PromptInput } from '@/components/PromptInput';
import { Preview } from '@/components/Preview';
import { Footer } from '@/components/Footer';
import { Sparkles } from 'lucide-react';
import { generateCode, generateHtmlPreview, getGeminiApiKey } from '@/services/geminiService';
import { featuresList } from '@/data/features';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [lastPrompt, setLastPrompt] = useState('');

  // Process prompt submission
  const handlePromptSubmit = async (prompt: string) => {
    if (!getGeminiApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please set your Gemini API key in the settings",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setLastPrompt(prompt);
    
    try {
      // Generate code from the prompt
      const result = await generateCode({ prompt });
      
      if (result?.code) {
        setGeneratedCode(result.code);
        
        // Generate HTML preview from the code
        const html = generateHtmlPreview(result.code);
        setPreviewHtml(html);
        
        toast({
          title: "Code Generated",
          description: "Your code has been successfully generated!",
        });
      }
    } catch (error) {
      console.error('Error processing prompt:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An error occurred while generating code",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Regenerate code with the same prompt
  const handleRegenerateCode = async () => {
    if (lastPrompt) {
      await handlePromptSubmit(lastPrompt);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-20 relative" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles size={16} className="mr-2" />
                Gemini-Powered Code Generation
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Turn text into functional code</h2>
              <p className="text-xl text-muted-foreground">
                Describe your idea in natural language and watch as Gemini creates a working web application for you.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <PromptInput onSubmit={handlePromptSubmit} isProcessing={isProcessing} />
              
              <div className="mt-8">
                <Preview 
                  isGenerating={isProcessing} 
                  generatedCode={generatedCode} 
                  previewHtml={previewHtml}
                  onRefresh={handleRegenerateCode}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30" id="features">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build faster</h2>
              <p className="text-xl text-muted-foreground">
                Our platform provides all the tools you need to transform ideas into production-ready code.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuresList.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-6 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
