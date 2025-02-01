import Image from 'next/image';
import CTAButton from './CTAButton';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop blur effect */}
      <div className="absolute inset-0 bg-[#0A0A1B]/80 backdrop-blur-md" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/logo-small.png"
              alt="Subscription Tracker"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div>
            <CTAButton variant="small">Get Started</CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;