'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function FooterLegal() {
  const pathname = usePathname();

  const links = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    // Add About Us when implemented
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'text-sm text-muted-foreground hover:text-primary transition-colors',
            pathname === href && 'text-primary font-medium'
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}