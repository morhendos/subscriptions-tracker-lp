"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Add shadow and more opacity when scrolled
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    // Close mobile menu if it's open
    setIsSheetOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper function to determine link behavior based on current page
  const getNavigationProps = (sectionId: string) => {
    if (isHomePage) {
      return {
        href: `#${sectionId}`,
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, sectionId)
      };
    }
    return {
      href: `/#${sectionId}`,
      // No onClick handler for absolute links to homepage sections
    };
  };

  // Navigation Links configuration for reuse in both desktop and mobile menus
  const navigationLinks = [
    { 
      label: "Features", 
      ...getNavigationProps("features")
    },
    { 
      label: "Testimonials", 
      ...getNavigationProps("testimonials")
    },
    { 
      label: "FAQ", 
      ...getNavigationProps("faq")
    },
    { 
      label: "Pricing", 
      href: "/pricing",
    },
    { 
      label: "Login", 
      href: "https://app.subscriptions-tracker.com/login",
    }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background/80 backdrop-blur-sm"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={link.onClick}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            <Button asChild>
              <Link href="https://app.subscriptions-tracker.com/signup">
                Get Started
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] pt-16">
                <nav className="flex flex-col space-y-6">
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={link.onClick}
                      className="text-base text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <Link 
                        href="https://app.subscriptions-tracker.com/signup"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
