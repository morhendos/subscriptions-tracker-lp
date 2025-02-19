import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Subscriptions Tracker - Learn how we protect your data and respect your privacy in compliance with GDPR and international regulations",
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
            Last updated: February 19, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
            <p className="mb-4">
              At Subscriptions Tracker ("we", "us", "our"), we take your privacy seriously. This
              Privacy Policy explains how we collect, use, and protect your
              personal information when you use our service.
            </p>
            <p>
              This policy complies with the General Data Protection Regulation (GDPR),
              the California Consumer Privacy Act (CCPA), and other applicable
              privacy laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Data Controller</h2>
            <p>
              For the purposes of the GDPR, Subscriptions Tracker is the data controller
              responsible for your personal data. You can contact our data protection
              officer at <a href="mailto:dpo@subscriptions-tracker.com" className="text-primary hover:underline">
                dpo@subscriptions-tracker.com
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              3. Information We Collect
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
                <strong>Profile Information:</strong> Optional information you choose
                to provide such as name and profile picture
              </li>
              <li>
                <strong>Subscription Data:</strong> Information about your
                subscriptions that you choose to track, including service names,
                payment amounts, billing cycles, and renewal dates
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with our service,
                including features used, time spent, actions taken, and preferences
              </li>
              <li>
                <strong>Technical Information:</strong> Browser type, IP address,
                device type, operating system, screen resolution, language preference,
                and referring website
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> Information collected
                through cookies, web beacons, and similar technologies as described in
                our Cookie Policy
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              4. Legal Basis for Processing
            </h2>
            <p className="mb-4">
              Under the GDPR, we process your personal data on the following legal bases:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Contract:</strong> Processing necessary for the performance of our
                contract with you to provide the Subscriptions Tracker service
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing necessary for our legitimate
                interests, such as improving and securing our service, as long as those
                interests are not overridden by your rights
              </li>
              <li>
                <strong>Consent:</strong> Processing based on your specific consent, such as
                for sending marketing communications
              </li>
              <li>
                <strong>Legal Obligation:</strong> Processing necessary to comply with
                legal obligations to which we are subject
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              5. How We Use Your Information
            </h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our service</li>
              <li>Create and manage your account</li>
              <li>Process and track your subscriptions</li>
              <li>Send important notifications about your subscriptions</li>
              <li>Provide customer support and respond to your requests</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Detect, investigate, and prevent fraudulent transactions and unauthorized access</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              6. Data Sharing and Third Parties
            </h2>
            <p className="mb-4">
              We may share your information with the following categories of third parties:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us provide
                our service (e.g., cloud hosting, payment processing, analytics)
              </li>
              <li>
                <strong>Business Partners:</strong> With your consent, we may share data with
                partners who offer complementary services
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or
                governmental authority
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition,
                or sale of assets
              </li>
            </ul>
            <p>
              We require all third parties to respect the security of your data and to
              treat it in accordance with the law. We do not allow our third-party service
              providers to use your personal data for their own purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              7. International Data Transfers
            </h2>
            <p>
              Your data may be transferred to, and processed in, countries other than
              your country of residence. These countries may have data protection laws
              that differ from those in your country. We ensure appropriate safeguards
              are in place to protect your data, including Standard Contractual Clauses
              approved by the European Commission for transfers from the EEA.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to
              protect your data, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Encryption of data in transit using TLS/SSL</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection and security</li>
              <li>Physical security measures at our data centers</li>
            </ul>
            <p>
              Despite these measures, no method of transmission over the Internet or
              electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Your Data Protection Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Right to Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correct inaccurate or incomplete information
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Right to Restriction:</strong> Request restriction of processing
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in a structured,
                commonly used, machine-readable format
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing based on legitimate interests
                or for direct marketing
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent where processing
                is based on consent
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> File a complaint with a data
                protection authority
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:privacy@subscriptions-tracker.com"
                className="text-primary hover:underline"
              >
                privacy@subscriptions-tracker.com
              </a>. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience on our website.
              These technologies include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences and settings
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact
                with our website
              </li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings.
              For more information, please see our{" "}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Cookie Policy
              </a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">11. Data Retention</h2>
            <p className="mb-4">
              We retain your personal data only for as long as necessary to fulfill the
              purposes for which we collected it, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing our services to you</li>
              <li>Complying with legal, accounting, or reporting requirements</li>
              <li>Resolving disputes</li>
              <li>Enforcing our agreements</li>
            </ul>
            <p>
              If you delete your account, your personal data will be deleted or anonymized
              within 30 days, except where retention is necessary for the purposes outlined above.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">12. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under 16. We do not knowingly
              collect personal information from children. If you become aware that a child
              has provided us with personal information, please contact us. If we become
              aware that we have collected personal information from a child without
              parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              13. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for legal, operational, or regulatory reasons. We will notify you
              of any material changes by posting the updated policy on our website with a
              new "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy
              or our data practices, please contact us at:
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@subscriptions-tracker.com"
                className="text-primary hover:underline"
              >
                privacy@subscriptions-tracker.com
              </a>
            </p>
            <p className="mb-2">
              <strong>Data Protection Officer:</strong>{" "}
              <a
                href="mailto:dpo@subscriptions-tracker.com"
                className="text-primary hover:underline"
              >
                dpo@subscriptions-tracker.com
              </a>
            </p>
            <p className="mb-2">
              <strong>Postal Address:</strong><br />
              Subscriptions Tracker<br />
              123 Privacy Avenue<br />
              Tech City, TC 12345<br />
              United States
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
