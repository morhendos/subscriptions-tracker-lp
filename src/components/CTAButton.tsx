'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  className?: string;
  children: React.ReactNode;
}

const CTAButton = ({ className, children }: CTAButtonProps) => {
  return (
    <Button
      className={cn(
        "bg-[#DAA520] hover:bg-[#FFD700] text-[#1A1F2C] font-semibold py-6 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default CTAButton;