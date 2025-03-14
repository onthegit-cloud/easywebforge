
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="font-medium text-xl">lightforge</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all duration-300 hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 focus:outline-none">
            Get Started
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-foreground p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 pt-20 px-6 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6 items-start">
          <MobileNavLink href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</MobileNavLink>
          <MobileNavLink href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</MobileNavLink>
          <MobileNavLink href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileNavLink>
          <MobileNavLink href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</MobileNavLink>
          <button className="w-full py-3 mt-4 rounded-lg bg-primary text-white font-medium transition-all duration-300 hover:bg-primary/90">
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-foreground/80 font-medium hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-foreground text-xl font-medium block w-full py-2 transition-colors duration-200"
  >
    {children}
  </a>
);
