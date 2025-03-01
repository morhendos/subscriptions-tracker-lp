'use client';

import React from 'react';
import Link from 'next/link';
import { APP_URL } from '@/config/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export function ComingSoonModal({ isOpen, onClose, planName }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {planName} Coming Soon!
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-muted-foreground mb-4">
            We're working hard to bring you our {planName.toLowerCase()} plan. Get started with
            our free plan today and we'll notify you as soon as premium features become available.
          </p>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">
              Already in development
            </span>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center gap-2 flex-col sm:flex-row">
          <Button asChild variant="outline" onClick={onClose}>
            <Link href="/waitlist">
              Join Waitlist
            </Link>
          </Button>
          <Button asChild>
            <Link href={`${APP_URL}signup`}>
              Get Started Free
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ComingSoonModal;
