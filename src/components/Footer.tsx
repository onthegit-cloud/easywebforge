
import React from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-medium text-xl">lightforge</span>
            </a>
            <p className="text-muted-foreground mb-4">
              Transform your ideas into working web applications with our AI-powered code generation platform.
            </p>
            <div className="flex space-x-3">
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Github size={18} />} label="GitHub" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <FooterLinks
              links={[
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Documentation', href: '#docs' },
              ]}
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <FooterLinks
              links={[
                { label: 'Tutorial', href: '#tutorial' },
                { label: 'Blog', href: '#blog' },
                { label: 'Examples', href: '#examples' },
                { label: 'API Reference', href: '#api' },
              ]}
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <FooterLinks
              links={[
                { label: 'About us', href: '#about' },
                { label: 'Contact', href: '#contact' },
                { label: 'Privacy Policy', href: '#privacy' },
                { label: 'Terms of Service', href: '#terms' },
              ]}
            />
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Lightforge. All rights reserved.</p>
            <div className="mt-4 sm:mt-0">
              <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
              <span className="mx-2">·</span>
              <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
              <span className="mx-2">·</span>
              <a href="#cookies" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a 
    href={href}
    className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 text-muted-foreground hover:text-foreground hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200"
    aria-label={label}
  >
    {icon}
  </a>
);

interface FooterLinksProps {
  links: Array<{
    label: string;
    href: string;
  }>;
}

const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => (
  <ul className="space-y-2">
    {links.map((link, i) => (
      <li key={i}>
        <a 
          href={link.href}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
);
