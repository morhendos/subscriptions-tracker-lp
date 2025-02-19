import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Subscriptions Tracker - Learn how we use cookies and similar technologies",
  alternates: {
    canonical: "https://subscriptions-tracker.com/cookie-policy",
  },
};

export default function CookiePolicy() {
  return (
    <main className="py-16 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: February 9, 2025
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              This Cookie Policy explains how Subscriptions Tracker ("we", "us", or "our") uses cookies and similar technologies on our website and application. This policy should be read alongside our Privacy Policy, which explains how we use personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit websites. They're widely used to make websites work more efficiently and provide information to the website owners. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies for several reasons, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> These are necessary for the website to function properly. They enable core functionality such as account login, security, and session management. The website cannot function properly without these cookies.
              </li>
              <li>
                <strong>Preference Cookies:</strong> These cookies remember your preferences (like language or theme) to enhance your experience using our website.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's functionality and user experience.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Cookie Name</th>
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Purpose</th>
                    <th className="py-2 px-4 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">st_session</td>
                    <td className="py-2 px-4">Essential</td>
                    <td className="py-2 px-4">Maintains user session</td>
                    <td className="py-2 px-4">Session</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">st_auth</td>
                    <td className="py-2 px-4">Essential</td>
                    <td className="py-2 px-4">Authentication token</td>
                    <td className="py-2 px-4">30 days</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">st_theme</td>
                    <td className="py-2 px-4">Preference</td>
                    <td className="py-2 px-4">Stores theme preference (light/dark)</td>
                    <td className="py-2 px-4">1 year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">st_analytics</td>
                    <td className="py-2 px-4">Analytics</td>
                    <td className="py-2 px-4">Anonymous usage data</td>
                    <td className="py-2 px-4">90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p>
              We use limited third-party services that may set cookies on your device. These services include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. Google Analytics cookies collect information about how you use our site.
              </li>
              <li>
                <strong>Stripe:</strong> For payment processing, which uses cookies to help prevent fraud and improve the payment experience.
              </li>
            </ul>
            <p>
              These third parties have their own privacy and cookie policies. We recommend you review these to understand how they use your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Block all cookies</li>
              <li>Delete cookies when you close your browser</li>
              <li>Allow only first-party cookies</li>
              <li>Browse in "private" or "incognito" mode</li>
            </ul>
            <p className="mb-4">
              Please note that restricting cookies may impact the functionality of our website. Instructions for managing cookies in your browser can usually be found in the "Help" section of your browser or you can visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">allaboutcookies.org</a> for more information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>
            <p>
              When you first visit our website, we ask for your consent to use cookies. You can choose to accept all cookies or customize your preferences. You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at{" "}
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
