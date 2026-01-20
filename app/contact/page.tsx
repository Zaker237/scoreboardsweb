import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { appDomain, contactPageText } from "@/constants/seoTexts";

export const metadata = {
  title: "Contact Us  | Scoreboards",
  description: contactPageText.description,
  openGraph: {
    title: contactPageText.ogTitle,
    description: contactPageText.ogDescription,
    type: "website",
    url: `${appDomain}/contact`,
    images: [`${appDomain}logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: contactPageText.ogTitle,
    description: contactPageText.ogDescription,
    images: [`${appDomain}logo.svg`],
  },
};

export default function ContactPage() {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-primary">Contact Us</h1>
            <p className="text-muted-foreground">
              Have questions or feedback? Fill out the form below and we&apos;ll get
              back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Your Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Write your message..."
                required
                className="mt-1 min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </form>


          <div className="text-center text-sm text-muted-foreground">
            Or reach us directly at{" "}
            <a
              href="mailto:mboutchouangalex+scoreboards@gmail.com"
              className="text-primary underline hover:opacity-80"
            >
              mboutchouangalex+scoreboards@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD structured data for ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Scoreboards",
            description: contactPageText.description,
            url: `${appDomain}/contact`,
            publisher: {
              "@type": "Organization",
              name: "Scoreboards",
              logo: `${appDomain}logo.svg`,
            },
          }),
        }}
      />
    </div>
  );
}
