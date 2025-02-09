'use client';

import FooterLegal from './FooterLegal';

export default function Footer() {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <FooterLegal />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Subscriptions Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}