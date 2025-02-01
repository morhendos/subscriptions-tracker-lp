'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CTAButtonProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
}

const CTAButton = ({ className, children, href = "https://app.subscriptions-tracker.com/" }: CTAButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Add a slight delay before redirect to ensure the user sees the loading state
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "bg-[#DAA520] hover:bg-[#FFD700] text-[#1A1F2C] font-semibold py-6 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:bg-[#DAA520] disabled:hover:scale-100 min-w-[160px]",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default CTAButton;