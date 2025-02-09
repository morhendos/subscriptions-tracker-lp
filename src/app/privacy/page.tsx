import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Subscriptions Tracker - Learn how we protect your data and respect your privacy",
  alternates: {
    canonical: "https://subscriptions-tracker.com/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="py-16 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: February 9, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p>
              At Subscriptions Tracker, we take your privacy seriously. This
              Privacy Policy explains how we collect, use, and protect your
              personal information when you use our service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Account Information:</strong> Email address and password
                when you create an account
              </li>
              <li>
                <strong>Subscription Data:</strong> Information about your
                subscriptions that you choose to track
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with our service,
                including features used and time spent
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, IP address,
                and device type
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Send important notifications about your subscriptions</li>
              <li>Improve and optimize our service</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Data Storage and Security
            </h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard encryption.
              We implement appropriate security measures to protect against
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal data</li>
              <li>Correct any inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              We use essential cookies to maintain your session and preferences.
              We do not use any tracking or marketing cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p>
              We retain your data only for as long as necessary to provide our
              service. If you delete your account, your data will be permanently
              deleted within 30 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@subscriptions-tracker.com"
                className="text-primary hover:underline"
              >
                privacy@subscriptions-tracker.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
