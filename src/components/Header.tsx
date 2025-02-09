'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add shadow and more opacity when scrolled
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md' 
          : 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-st.svg" 
              alt="Subscriptions Tracker" 
              width={130} 
              height={32}
              className="w-auto h-8"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => scrollToSection(e, 'features')}
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => scrollToSection(e, 'pricing')}
            >
              Pricing
            </Link>
            <Link 
              href="#testimonials" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => scrollToSection(e, 'testimonials')}
            >
              Testimonials
            </Link>
            <Link 
              href="#faq" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => scrollToSection(e, 'faq')}
            >
              FAQ
            </Link>
            <Link 
              href="https://app.subscriptions-tracker.com/login" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Button asChild>
              <Link href="https://app.subscriptions-tracker.com/signup">
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}