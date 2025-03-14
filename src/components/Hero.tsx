
import React from 'react';
import { ArrowRight, Code, Terminal, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <span className="animate-pulse-light mr-2">✨</span> Introducing Lightforge - AI-Powered Web Development
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 animate-fade-in [animation-delay:200ms]">
            Turn your words into<br />working web apps
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:400ms]">
            Describe what you want to build and watch as Lightforge turns your ideas into beautiful, 
            functional web applications in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:600ms]">
            <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:ring-2 focus:ring-primary/20 focus:outline-none group">
              <span className="flex items-center justify-center">
                Try it now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
            <button className="px-6 py-3 rounded-lg glass-button font-medium">
              Watch demo
            </button>
          </div>
        </div>
        
        <div className="mt-16 relative overflow-hidden rounded-xl shadow-2xl shadow-primary/10 border border-gray-200 dark:border-gray-800 animate-scale-in [animation-delay:800ms]">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/0 to-primary/5 z-0" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl p-3 pt-2 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-xs text-muted-foreground font-medium ml-2">lightforge.app</div>
          </div>
          <div className="relative z-10 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 md:p-6">
                  <h3 className="font-mono text-sm text-muted-foreground mb-3">Your prompt:</h3>
                  <p className="font-medium">Create a modern e-commerce product page with image gallery, reviews, and a sticky add-to-cart button</p>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-none h-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm flex items-center px-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-800 h-5 rounded-full shimmer animate-pulse-light"></div>
                    </div>
                    <div className="flex-1 p-4 grid grid-cols-2 gap-4 overflow-hidden">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-md shimmer animate-pulse-light"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4 shimmer animate-pulse-light"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-full shimmer animate-pulse-light"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-5/6 shimmer animate-pulse-light"></div>
                        <div className="mt-auto h-10 bg-primary/20 rounded-md w-full shimmer animate-pulse-light"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in [animation-delay:1000ms]">
          {features.map((feature, i) => (
            <FeatureCard 
              key={i} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <div 
    className={cn(
      "glass-panel p-6 transition-all duration-300 hover:shadow-md",
      "animate-fade-in",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 text-primary">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const features = [
  {
    icon: Terminal,
    title: "AI-Powered Generation",
    description: "Our advanced AI understands your requirements and generates functional code that meets your needs."
  },
  {
    icon: Code,
    title: "Clean React + Tailwind",
    description: "All generated applications use modern React patterns and Tailwind CSS for beautiful styling."
  },
  {
    icon: Zap,
    title: "Instant Previews",
    description: "See your application come to life in real-time as the AI generates your code."
  }
];
