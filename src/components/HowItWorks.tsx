import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Accounts",
    description: "Securely link your payment methods to start tracking",
  },
  {
    number: "02",
    title: "Auto-Detection",
    description: "We'll automatically identify your active subscriptions",
  },
  {
    number: "03",
    title: "Smart Management",
    description: "Optimize spending with our intelligent recommendations",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#2A2F3C]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#DAA520]">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#1A1F2C] p-8 rounded-lg shadow-sm relative z-10 border border-[#DAA520]/20">
                <div className="text-4xl font-bold text-[#DAA520]/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#DAA520]">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 text-[#DAA520] transform -translate-y-1/2 z-20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;