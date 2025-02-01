import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 opacity-50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Track Your Subscriptions
              <span className="block text-purple-600 dark:text-purple-400">Save Money Monthly</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Never forget about your subscriptions again. Track, manage, and optimize your recurring expenses in one place.
            </p>
            <div className="mt-10 flex gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700"
              >
                How it Works
              </Button>
            </div>
            {/* Social Proof */}
            <div className="mt-12">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Trusted by companies worldwide
              </p>
              <div className="mt-4 flex space-x-8 opacity-75">
                {/* Replace with actual company logos */}
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative lg:col-span-1">
            <div className="aspect-w-5 aspect-h-4 lg:aspect-w-4 lg:aspect-h-3">
              <div className="w-full h-full bg-purple-100 dark:bg-purple-900/20 rounded-2xl overflow-hidden">
                {/* Replace with actual product screenshot/illustration */}
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-100 dark:from-purple-800 dark:to-blue-900 animate-pulse rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
