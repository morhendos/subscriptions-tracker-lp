import { Card } from "@/components/ui/card";
import { CreditCard, Bell, PieChart, Settings } from "lucide-react";

const features = [
  {
    title: "Track All Subscriptions",
    description: "Monitor all your recurring payments in one place",
    icon: CreditCard,
  },
  {
    title: "Smart Notifications",
    description: "Never miss a payment with timely reminders",
    icon: Bell,
  },
  {
    title: "Spending Analytics",
    description: "Visualize your subscription spending patterns",
    icon: PieChart,
  },
  {
    title: "Easy Management",
    description: "Update or cancel subscriptions with ease",
    icon: Settings,
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-[#0A0A1B]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Everything you need to manage subscriptions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 bg-[#1A1F2C]/50 backdrop-blur-sm border-[#DAA520]/20 hover:border-[#DAA520]/40"
            >
              <feature.icon className="w-12 h-12 text-[#DAA520] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;