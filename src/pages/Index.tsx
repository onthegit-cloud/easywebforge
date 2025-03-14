
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PromptInput } from '@/components/PromptInput';
import { Preview } from '@/components/Preview';
import { CodeOutput } from '@/components/CodeOutput';
import { Footer } from '@/components/Footer';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');

  // This is a mock function that would be replaced with actual AI code generation
  const handlePromptSubmit = (prompt: string) => {
    setIsProcessing(true);
    console.log("Processing prompt:", prompt);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // For demo purposes, we'll just set some sample code
      const sampleReactCode = `import React, { useState } from 'react';

function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const images = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[selectedImage]}
              alt="Product"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={\`aspect-square rounded-md overflow-hidden \${
                  selectedImage === index
                    ? 'ring-2 ring-indigo-500'
                    : 'ring-1 ring-gray-200'
                }\`}
              >
                <img
                  src={image}
                  alt={\`Product \${index + 1}\`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-auto">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Premium Wireless Headphones
            </h1>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={\`h-5 w-5 \${
                      rating < 4 ? 'text-yellow-400' : 'text-gray-300'
                    }\`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">4.0 (128 reviews)</p>
            </div>
            
            <div className="mt-6">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">$299.99</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 space-y-4 text-sm text-gray-500">
                <p>
                  Experience immersive sound with our premium wireless headphones.
                  Featuring advanced noise cancellation technology, premium materials,
                  and up to 24 hours of battery life. Perfect for music lovers and
                  professionals alike.
                </p>
              </div>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="mt-8 sticky bottom-0 bg-white pt-4">
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 py-3 px-8 rounded-md text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="mt-6 space-y-8">
          {/* Review 1 */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm font-medium text-gray-900">Sarah T.</p>
              <span className="mx-2 text-gray-300">|</span>
              <p className="text-sm text-gray-500">2 months ago</p>
            </div>
            <h3 className="text-sm font-medium text-gray-900">Amazing sound quality!</h3>
            <p className="mt-2 text-sm text-gray-500">
              These headphones exceeded my expectations! The sound quality is crystal clear,
              and the noise cancellation is truly impressive. Battery life is as advertised,
              and they're very comfortable for long listening sessions.
            </p>
          </div>
          
          {/* Review 2 */}
          <div>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[0, 1, 2, 3].map((rating) => (
                  <svg
                    key={rating}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <svg
                  className="h-4 w-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-2 text-sm font-medium text-gray-900">Michael R.</p>
              <span className="mx-2 text-gray-300">|</span>
              <p className="text-sm text-gray-500">1 month ago</p>
            </div>
            <h3 className="text-sm font-medium text-gray-900">Good, but not perfect</h3>
            <p className="mt-2 text-sm text-gray-500">
              The sound quality is great and they're comfortable to wear. My only complaint
              is that the Bluetooth connection occasionally drops when I'm more than 20 feet
              away from my device. Otherwise, they're a solid pair of headphones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;`;

      setGeneratedCode(sampleReactCode);
      
      // For demo purposes, we'll create a simple HTML preview
      const previewHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Generated App Preview</title>
        </head>
        <body>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Product Images -->
              <div class="space-y-4">
                <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt="Product"
                    class="h-full w-full object-cover object-center"
                  />
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <button
                    class="aspect-square rounded-md overflow-hidden ring-2 ring-indigo-500"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                      alt="Product 1"
                      class="h-full w-full object-cover object-center"
                    />
                  </button>
                  <button
                    class="aspect-square rounded-md overflow-hidden ring-1 ring-gray-200"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                      alt="Product 2"
                      class="h-full w-full object-cover object-center"
                    />
                  </button>
                  <button
                    class="aspect-square rounded-md overflow-hidden ring-1 ring-gray-200"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1485955900006-10f4d324d411"
                      alt="Product 3"
                      class="h-full w-full object-cover object-center"
                    />
                  </button>
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="flex flex-col">
                <div class="mb-auto">
                  <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Premium Wireless Headphones
                  </h1>
                  <div class="mt-2 flex items-center">
                    <div class="flex items-center">
                      <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z" clip-rule="evenodd"></path>
                      </svg>
                      <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z" clip-rule="evenodd"></path>
                      </svg>
                      <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z" clip-rule="evenodd"></path>
                      </svg>
                      <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z" clip-rule="evenodd"></path>
                      </svg>
                      <svg class="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 15.585l-7.07 3.707 1.351-7.873-5.719-5.573 7.902-1.148L10 0l3.536 7.698 7.902 1.148-5.719 5.573 1.351 7.873z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <p class="ml-2 text-sm text-gray-500">4.0 (128 reviews)</p>
                  </div>
                  
                  <div class="mt-6">
                    <h2 class="sr-only">Product information</h2>
                    <p class="text-3xl tracking-tight text-gray-900">$299.99</p>
                  </div>
                  
                  <div class="mt-6">
                    <h3 class="text-sm font-medium text-gray-900">Description</h3>
                    <div class="mt-2 space-y-4 text-sm text-gray-500">
                      <p>
                        Experience immersive sound with our premium wireless headphones.
                        Featuring advanced noise cancellation technology, premium materials,
                        and up to 24 hours of battery life. Perfect for music lovers and
                        professionals alike.
                      </p>
                    </div>
                  </div>
                </div>
                
                <!-- Add to Cart -->
                <div class="mt-8 sticky bottom-0 bg-white pt-4">
                  <div class="mb-4">
                    <label for="quantity" class="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    class="w-full bg-indigo-600 py-3 px-8 rounded-md text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      setPreviewHtml(previewHtml);
      setIsProcessing(false);
    }, 3000);
  };

  const handleRegenerateCode = () => {
    setIsProcessing(true);
    // Simulate regeneration
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
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
                AI-Powered Code Generation
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Turn text into functional code</h2>
              <p className="text-xl text-muted-foreground">
                Describe your idea in natural language and watch as our AI creates a working web application for you.
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

// Sample features for demonstration
import { 
  Code, 
  Layers, 
  Zap, 
  Download, 
  RefreshCw, 
  Database, 
  Edit, 
  Eye, 
  Share2 
} from 'lucide-react';

const featuresList = [
  {
    icon: Code,
    title: "AI Code Generation",
    description: "Transform natural language descriptions into functional React components with Tailwind CSS."
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your application come to life in real-time as the AI generates your code."
  },
  {
    icon: Edit,
    title: "Edit & Refine",
    description: "Fine-tune the generated code with our intuitive editor or request changes through prompts."
  },
  {
    icon: Layers,
    title: "Component Library",
    description: "Access a rich library of pre-built components to speed up your development process."
  },
  {
    icon: RefreshCw,
    title: "Iterative Refinement",
    description: "Refine your application through multiple iterations with the AI to get exactly what you want."
  },
  {
    icon: Download,
    title: "Export Code",
    description: "Download your generated code as React components ready to use in your projects."
  },
  {
    icon: Database,
    title: "API Integration",
    description: "Generate code that connects to your APIs and external services."
  },
  {
    icon: Share2,
    title: "Collaborative Sharing",
    description: "Share your projects with team members and collaborate in real-time."
  },
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Generate production-ready code in seconds, not hours or days."
  }
];

export default Index;
