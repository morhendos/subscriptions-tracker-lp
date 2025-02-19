import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Subscriptions Tracker - Understanding your rights and obligations when using our service",
  alternates: {
    canonical: "https://subscriptions-tracker.com/terms",
  },
};

export default function TermsOfService() {
  return (
    <main className="py-16 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: February 9, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Subscriptions Tracker. These Terms of Service govern your use of our website and services. By accessing or using Subscriptions Tracker, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>"Service"</strong> refers to the Subscriptions Tracker application, website, and related services.</li>
              <li><strong>"User"</strong> refers to any individual who accesses or uses our Service.</li>
              <li><strong>"Account"</strong> refers to the user's registered profile on our Service.</li>
              <li><strong>"Subscription Data"</strong> refers to information about subscriptions that users track using our Service.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p className="mb-4">
              To use certain features of the Service, you must register for an account. You agree to provide accurate and complete information during registration and to keep your account information updated.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Service Usage</h2>
            <p className="mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Attempt to probe, scan, or test the vulnerability of the system</li>
              <li>Use automated scripts to collect information from the Service</li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are owned by Subscriptions Tracker and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any materials from our Service without our express written consent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
            <p className="mb-4">
              You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with providing and improving the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Payments and Subscriptions</h2>
            <p className="mb-4">
              Some features of our Service may require payment. All payments are processed securely through our payment providers. By subscribing to a paid plan, you agree to pay all fees in accordance with the pricing displayed at the time of purchase.
            </p>
            <p className="mb-4">
              Subscriptions automatically renew unless canceled before the renewal date. You can cancel your subscription at any time through your account settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your access to the Service at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our discretion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p className="mb-4">
              We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after the changes have been posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:legal@subscriptions-tracker.com"
                className="text-primary hover:underline"
              >
                legal@subscriptions-tracker.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
