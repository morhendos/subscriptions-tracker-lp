'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Facebook, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and social */}
          <div className="space-y-4">
            <Image 
              src="/logo-st.svg" 
              alt="Subscriptions Tracker" 
              width={150} 
              height={40}
              className="w-auto h-8"
            />
            <p className="text-sm text-muted-foreground">
              The smart way to manage your subscriptions and save money.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/substracker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/substracker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/substracker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/morhendos/subscriptions-tracker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link>
              </li>
              <li>
                <Link href="/integrations" className="text-muted-foreground hover:text-primary">Integrations</Link>
              </li>
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-primary">Changelog</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">About</Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-primary">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-muted-foreground hover:text-primary">GDPR</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Subscriptions Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}