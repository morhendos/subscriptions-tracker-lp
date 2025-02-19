import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Users, HelpCircle, Briefcase, HeadphonesIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Subscriptions Tracker",
  description:
    "Get in touch with Subscriptions Tracker for support, partnerships, careers, or general inquiries",
  alternates: {
    canonical: "https://subscriptions-tracker.com/contact",
  },
};

function ContactOption({ icon, title, description, link, linkText }) {
  return (
    <div className="p-6 bg-card border rounded-xl hover:shadow-md transition-shadow">
      <div>
        <div className="p-3 inline-flex bg-primary/10 rounded-lg text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-primary hover:underline"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const contactOptions = [
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "Customer Support",
      description: "Need help with your account or have questions about our service?",
      link: "mailto:support@subscriptions-tracker.com",
      linkText: "support@subscriptions-tracker.com"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Business Inquiries",
      description: "Interested in partnering with us or exploring enterprise solutions?",
      link: "mailto:business@subscriptions-tracker.com",
      linkText: "business@subscriptions-tracker.com"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Careers",
      description: "Interested in joining our team? Check out our open positions.",
      link: "/careers",
      linkText: "View open positions"
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "Press Inquiries",
      description: "Working on a story? Get the information you need from our press team.",
      link: "mailto:press@subscriptions-tracker.com",
      linkText: "press@subscriptions-tracker.com"
    }
  ];

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Have questions, feedback, or want to learn more about Subscriptions Tracker? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactOptions.map((option, index) => (
              <ContactOption
                key={index}
                icon={option.icon}
                title={option.title}
                description={option.description}
                link={option.link}
                linkText={option.linkText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="support">Customer Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Product Feedback</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="press">Press Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                ></textarea>
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="privacy"
                  type="checkbox"
                  className="mt-1"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-muted-foreground">
                  I agree to the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and consent to Subscriptions Tracker processing my data for the purpose of responding to my inquiry.
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Help Center */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Check out our help center for answers to frequently asked questions and detailed guides.
          </p>
          <Link
            href="#"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            Visit Help Center
          </Link>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              While we're primarily a remote-first company, we have offices in these locations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-xl border text-center">
              <h3 className="text-xl font-semibold mb-3">San Francisco</h3>
              <div className="flex justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground">
                123 Market Street<br />
                Suite 456<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border text-center">
              <h3 className="text-xl font-semibold mb-3">New York</h3>
              <div className="flex justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground">
                789 Broadway<br />
                Floor 10<br />
                New York, NY 10003<br />
                United States
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl border text-center">
              <h3 className="text-xl font-semibold mb-3">London</h3>
              <div className="flex justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="text-muted-foreground">
                10 Finsbury Square<br />
                3rd Floor<br />
                London EC2A 1AF<br />
                United Kingdom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Follow us on social media for the latest updates, tips, and news.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://twitter.com/substracker" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://facebook.com/substracker" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/company/substracker" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://instagram.com/substracker" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions about contacting us.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-semibold mb-2">What's your typical response time?</h3>
                <p className="text-muted-foreground">
                  We aim to respond to all inquiries within 24 hours during business days. For urgent support issues, our premium customers receive priority responses.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-semibold mb-2">Do you offer phone support?</h3>
                <p className="text-muted-foreground">
                  Phone support is available for our Business and Enterprise plan customers. If you're on a different plan, please use our contact form or email support.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-semibold mb-2">How can I report a bug?</h3>
                <p className="text-muted-foreground">
                  You can report bugs through our contact form by selecting "Customer Support" as the subject and describing the issue in detail. Screenshots or screen recordings are very helpful.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-semibold mb-2">I have a feature suggestion. Who do I contact?</h3>
                <p className="text-muted-foreground">
                  We love hearing your ideas! Please use our contact form with "Product Feedback" as the subject, or email feedback@subscriptions-tracker.com with your suggestions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
