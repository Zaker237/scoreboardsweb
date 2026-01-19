import { appDomain, privacyPageText } from "@/constants/seoTexts";

export const metadata = {
  title: "Privacy Notice | Scoreboards",
  description: privacyPageText.description,
  openGraph: {
    title: privacyPageText.ogTitle,
    description: privacyPageText.ogDescription,
    type: "website",
    url: `${appDomain}/privacy-notice`,
    images: [`${appDomain}logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: privacyPageText.ogTitle,
    description: privacyPageText.ogDescription,
    images: [`${appDomain}logo.svg`],
  },
};

export default function PrivacyNoticePage() {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Privacy Notice
          </h1>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(2025, 8, 14).toLocaleDateString()}
          </p>

          <p>
            This Privacy Notice describes how Scoreboards collects, uses, and
            protects your personal information when you use our application. By
            using our service, you agree to the practices described in this
            notice.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Personal Information:</strong> such as your name, email,
                or account details when you sign up or contact us.
              </li>
              <li>
                <strong>Usage Data:</strong> including pages visited, features
                used, and interactions with our app.
              </li>
              <li>
                <strong>Cookies and Tracking:</strong> to improve your
                experience and analyze app performance.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">How We Use Information</h2>
            <p>We may use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve our services.</li>
              <li>Respond to your requests and support needs.</li>
              <li>Send important updates or notifications.</li>
              <li>Analyze usage to enhance functionality and security.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Sharing of Information</h2>
            <p>
              We do not sell or rent your personal data. We may share
              information with trusted service providers who assist us in
              operating the application, or when required by law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access, loss, or
              misuse. However, no system is completely secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>
              You may have certain rights under applicable data protection laws,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request correction or deletion of your data.</li>
              <li>The right to withdraw consent at any time.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              Changes to This Privacy Notice
            </h2>
            <p>
              We may update this Privacy Notice periodically. Updates will be
              posted within the application and are effective immediately upon
              publication.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Notice or how your
              data is handled, please contact us at:{" "}
              <a
                href="mailto:mboutchouangalex+scoreboards@gmail.com"
                className="text-primary underline"
              >
                mboutchouangalex+scoreboards@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>

      {/* JSON-LD structured data for PrivacyNoticePage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Notice",
            description: privacyPageText.description,
            url: `${appDomain}/privacy-notice`,
          }),
        }}
      />
    </div>
  );
}
