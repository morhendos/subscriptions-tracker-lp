import React from "react";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "default" | "small";
}

const CTAButton = ({ children, variant = "default" }: CTAButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-[#FFD43B] hover:bg-[#FFD43B]/90 text-black";
  const sizeStyles =
    variant === "small" ? "px-4 py-2 text-sm" : "px-8 py-3 text-lg";

  return <button className={`${baseStyles} ${sizeStyles}`}>{children}</button>;
};

export default CTAButton;
