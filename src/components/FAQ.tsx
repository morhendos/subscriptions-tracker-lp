'use client';

import { Card, CardContent } from '@/components/ui/card';
import { SchemaOrg } from '@/components/SchemaOrg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: 'How can I track all my subscriptions in one place?',
    answer: 'Subscription Tracker makes it easy to manage all your subscriptions in one dashboard. Simply add your subscriptions manually or connect your email to automatically detect them. You\'ll get a clear overview of all recurring payments, due dates, and total monthly costs.'
  },
  {
    question: 'How does Subscription Tracker help me save money?',
    answer: 'We help you save money in multiple ways: by identifying unused or overlapping subscriptions, sending reminders before free trials end, highlighting price increases, and providing spending insights. Our users save an average of $240 per year by optimizing their subscriptions.'
  },
  {
    question: 'Is my financial information secure with Subscription Tracker?',
    answer: 'Yes, we take security seriously. We use bank-level encryption (256-bit SSL), never store your full card details, and are SOC 2 Type II certified. We only track subscription amounts and dates, not your actual bank or card transactions.'
  },
  {
    question: 'What happens when Subscription Tracker detects a price increase?',
    answer: 'When we detect a price increase in any of your subscriptions, you\'ll receive an immediate notification via email and in-app alert. We show you the old and new price, percentage increase, and impact on your monthly budget, helping you make informed decisions about your subscriptions.'
  },
  {
    question: 'Can I share subscription management with family members?',
    answer: 'Yes, our Family Sharing feature lets you collaborate on subscription management. You can invite family members to view and manage shared subscriptions, split costs, and get notifications. Each member can also maintain their private subscriptions separately.'
  }
];

const FAQ = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-background" id="faq">
      <SchemaOrg schema={faqSchema} />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about managing your subscriptions
          </p>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <Accordion type="single" collapsible>
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;