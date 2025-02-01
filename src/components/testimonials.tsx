import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Made me more mindful about my subscription spending. When you see all the numbers in one place, it really makes you think!",
    author: "Sarah K.",
    role: "Marketing Professional"
  },
  {
    quote: "Having all my subscriptions organized in one list changed everything. Now I know exactly what I'm paying for and when each payment is due.",
    author: "Michael R.",
    role: "Small Business Owner"
  },
  {
    quote: "As someone who hates spreadsheets, this is exactly what I needed to keep track of my monthly services.",
    author: "Alex T.",
    role: "Software Developer"
  }
];

export default function Testimonials() {
  return (
    <section className="container py-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="bg-muted">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <Quote className="h-8 w-8 text-muted-foreground" />
                <p className="text-lg">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}