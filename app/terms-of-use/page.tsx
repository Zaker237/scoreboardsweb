import { appDomain, termsPageText } from "@/constants/seoTexts";

export const metadata = {
  title: "Terms of Use | Scoreboards",
  description: termsPageText.description,
  openGraph: {
    title: termsPageText.ogTitle,
    description: termsPageText.ogDescription,
    type: "website",
    url: `${appDomain}/terms-of-use`,
    images: [`${appDomain}logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: termsPageText.ogTitle,
    description: termsPageText.ogDescription,
    images: [`${appDomain}logo.svg`],
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Terms of Use</h1>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(2025, 8, 14).toLocaleDateString()}
          </p>

          <p>
            These Terms of Use govern your access to and use of the Scoreboards
            application. By using our service, you agree to comply with and be
            bound by these terms.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Eligibility</h2>
            <p>
              By using this service, you represent that you are at least 13
              years old or the minimum legal age in your jurisdiction. If you
              are under 18, you must have parental or guardian consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Use of the Service</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You agree not to misuse or interfere with the service.</li>
              <li>
                You may not attempt to gain unauthorized access to our systems.
              </li>
              <li>
                You agree to comply with all applicable laws and regulations.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Intellectual Property</h2>
            <p>
              All content, trademarks, and materials available through the
              application are the property of Scoreboards or its licensors and
              are protected by applicable laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Scoreboards shall not be
              liable for any damages arising from your use of or inability to
              use the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Termination</h2>
            <p>
              We may suspend or terminate your access to the service at any
              time, without prior notice, if we reasonably believe you have
              violated these Terms of Use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Changes to These Terms</h2>
            <p>
              We may update these Terms of Use from time to time. Any changes
              will be posted within the application and will take effect
              immediately upon posting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Use, please contact
              us at:{" "}
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

      {/* JSON-LD structured data for TermsOfUsePage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Use",
            description: termsPageText.description,
            url: `${appDomain}/terms-of-use`,
          }),
        }}
      />
    </div>
  );
}
