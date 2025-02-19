import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR Compliance",
  description:
    "GDPR Compliance for Subscriptions Tracker - Understanding your rights under the General Data Protection Regulation",
  alternates: {
    canonical: "https://subscriptions-tracker.com/gdpr",
  },
};

export default function GDPRCompliance() {
  return (
    <main className="py-16 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">GDPR Compliance</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: February 9, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              At Subscriptions Tracker, we are committed to protecting the privacy and rights of our users. This page explains how we comply with the General Data Protection Regulation (GDPR), which is a regulation in EU law on data protection and privacy applicable to all individuals within the European Union and the European Economic Area.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Role Under GDPR</h2>
            <p className="mb-4">
              Under GDPR, Subscriptions Tracker acts as both:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Data Controller:</strong> We determine the purposes and means of processing personal data collected through our service.
              </li>
              <li>
                <strong>Data Processor:</strong> We process personal data on behalf of our users when they use our service to track their subscriptions.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
            <p className="mb-4">
              We process your personal data under the following legal bases:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Contractual Necessity:</strong> Processing necessary for the performance of our contract with you (our Terms of Service).
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, such as improving our service and ensuring security, as long as your interests and fundamental rights do not override those interests.
              </li>
              <li>
                <strong>Consent:</strong> Processing based on your specific, informed, and unambiguous consent for specific purposes.
              </li>
              <li>
                <strong>Legal Obligation:</strong> Processing necessary for compliance with a legal obligation to which we are subject.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your Rights Under GDPR</h2>
            <p className="mb-4">
              If you are located in the EU or EEA, you have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Right to Access:</strong> You have the right to request information about the personal data we hold about you and to receive a copy of that data.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal data.
              </li>
              <li>
                <strong>Right to Erasure (Right to be Forgotten):</strong> You have the right to request the deletion of your personal data under certain conditions.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data under certain conditions.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller.
              </li>
              <li>
                <strong>Right to Object:</strong> You have the right to object to the processing of your personal data under certain conditions.
              </li>
              <li>
                <strong>Right to Not be Subject to Automated Decision-making:</strong> You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How to Exercise Your Rights</h2>
            <p className="mb-4">
              You can exercise your GDPR rights by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Using the privacy controls in your account settings</li>
              <li>Contacting us directly at privacy@subscriptions-tracker.com</li>
              <li>Using our Data Subject Access Request form available in your account settings</li>
            </ul>
            <p>
              We will respond to your request within 30 days. In certain cases, we may extend this period to 60 days, taking into account the complexity and number of requests, but we will inform you of any such extension within the first 30 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Protection Measures</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Encryption of personal data</li>
              <li>Regular testing and evaluation of technical and organizational security measures</li>
              <li>Data minimization and purpose limitation</li>
              <li>Regular data protection training for our staff</li>
              <li>Strict access controls and authentication procedures</li>
              <li>Regular security assessments and audits</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p>
              We primarily store and process your data within the European Economic Area (EEA). If we transfer your data outside the EEA, we ensure that appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, to ensure that your data receives an adequate level of protection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Protection Officer</h2>
            <p>
              We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and implementation. You can contact our DPO at dpo@subscriptions-tracker.com for any data protection related inquiries.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Breach Notification</h2>
            <p>
              In the event of a personal data breach, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach, where feasible. If the breach is likely to result in a high risk to your rights and freedoms, we will also notify you without undue delay.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Changes to This GDPR Compliance Policy</h2>
            <p>
              We may update our GDPR Compliance Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our GDPR compliance or wish to exercise your rights, please contact us at{" "}
              <a
                href="mailto:privacy@subscriptions-tracker.com"
                className="text-primary hover:underline"
              >
                privacy@subscriptions-tracker.com
              </a>
            </p>
            <p className="mt-4">
              You also have the right to lodge a complaint with your local data protection authority if you believe that we have not complied with applicable data protection laws.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
