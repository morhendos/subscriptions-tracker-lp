'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SchemaOrg } from './SchemaOrg';
import { generateFAQSchema } from '@/lib/schema';

const faqItems = [
  {
    question: 'What is Subscription Tracker?',
    answer: 'Subscription Tracker is a smart financial management tool that helps you monitor and manage all your recurring subscriptions in one place. It provides features like payment tracking, renewal reminders, spending analytics, and cost optimization suggestions.'
  },
  {
    question: 'Is my financial data secure?',
    answer: 'Yes, your data security is our top priority. We use bank-grade encryption to protect your information and never store full payment details. Our system undergoes regular security audits and complies with industry standards for data protection.'
  },
  {
    question: 'How does the subscription tracking work?',
    answer: 'Simply add your subscriptions to the platform manually or connect your email to automatically detect subscription payments. Our system will track payment dates, amounts, and renewal periods, sending you timely notifications and providing detailed spending analytics.'
  },
  {
    question: 'Can I track shared family subscriptions?',
    answer: 'Yes! Our Family Sharing feature allows you to track shared subscriptions, split costs among family members, and manage family-wide subscription budgets. You can invite family members and assign specific permissions for subscription management.'
  },
  {
    question: 'How does cost optimization work?',
    answer: 'Our intelligent system analyzes your subscription patterns to identify potential savings opportunities. It detects duplicate subscriptions, suggests better-priced alternatives, identifies unused services, and helps you optimize your subscription spending.'
  },
  {
    question: 'Is there a mobile app available?',
    answer: 'Yes, we offer mobile apps for both iOS and Android platforms. The apps provide all the features of our web version, plus mobile-specific features like push notifications and quick subscription management on the go.'
  },
  {
    question: 'What happens if I miss a notification?',
    answer: 'Don't worry! We use multiple notification channels (email, mobile push, SMS) and send repeated reminders for important events. You can customize notification preferences and timing according to your needs.'
  },
  {
    question: 'Can I export my subscription data?',
    answer: 'Yes, you can export your subscription data in various formats (CSV, PDF, Excel) for personal records or analysis. The export includes detailed payment history, analytics, and subscription details.'
  }
];

export default function FAQ() {
  return (
    <section className="py-20 bg-background" id="faq">
      <SchemaOrg schema={generateFAQSchema({ questions: faqItems })} />
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about Subscription Tracker
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{' '}
            <a href="/contact" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}