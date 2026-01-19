import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { appDomain, faqsPageText } from "@/constants/seoTexts";

export const metadata = {
  title: "FAQs | Scoreboards",
  description: faqsPageText.description,
  openGraph: {
    title: faqsPageText.ogTitle,
    description: faqsPageText.ogDescription,
    type: "website",
    url: `${appDomain}/faqs`,
    images: [`${appDomain}logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: faqsPageText.ogTitle,
    description: faqsPageText.ogDescription,
    images: [`${appDomain}logo.svg`],
  },
};

export default function FAQsPage() {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground">
          Find answers to some of the most common questions about Scoreboards.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqsPageText.faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`q${idx + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <span
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* JSON-LD structured data for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqsPageText.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer.replace(/<[^>]+>/g, ""), // strip HTML
              },
            })),
            publisher: {
              "@type": "Organization",
              name: "Scoreboards",
              logo: `${appDomain}logo.svg`,
              contactPoint: {
                "@type": "ContactPoint",
                email: "mboutchouangalex+scoreboards@gmail.com",
                contactType: "customer support",
              },
            },
          }),
        }}
      />
    </div>
  );
}
