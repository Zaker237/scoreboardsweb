import { appDomain, cookiesPageText } from "@/constants/seoTexts";

export const metadata = {
  title: "Cookies Policy | Scoreboards",
  description: cookiesPageText.description,
  openGraph: {
    title: cookiesPageText.ogTitle,
    description: cookiesPageText.ogDescription,
    type: "website",
    url: `${appDomain}/cookies-policy`,
    images: [`${appDomain}logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: cookiesPageText.ogTitle,
    description: cookiesPageText.ogDescription,
    images: [`${appDomain}logo.svg`],
  },
};

export default function CookiesPolicyPage() {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Cookies Policy
          </h1>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(2025, 8, 10).toLocaleDateString()}
          </p>

          <p>
            This Cookies Policy explains what cookies are, how we use them, and
            your choices regarding cookies when you use our application.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">What are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when
              you visit a website. They help us improve your experience by
              remembering your preferences and providing insights on how the
              service is being used.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To enable essential functionality of the application.</li>
              <li>To analyze usage and improve performance.</li>
              <li>To remember your preferences and settings.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how users
                interact with our app.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                choices.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Your Choices</h2>
            <p>
              You can control and manage cookies through your browser settings.
              Please note that disabling certain cookies may affect the
              functionality of the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Cookies Policy, you can
              contact us at:{" "}
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

      {/* JSON-LD structured data for CookiesPolicyPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cookies Policy",
            description: cookiesPageText.description,
            url: `${appDomain}/cookies-policy`,
          }),
        }}
      />
    </div>
  );
}
