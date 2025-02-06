'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling down past 100px
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-all duration-300 ease-in-out',
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    )}>
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
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </Link>
            <Link 
              href="#testimonials" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Testimonials
            </Link>
            <Link 
              href="#faq" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
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