import Image from "next/image";
import { appDomain, aboutPageText } from "@/constants/seoTexts";

export const metadata = {
  title: "About | Scoreboards",
  description: aboutPageText.description,
  openGraph: {
    title: aboutPageText.ogTitle,
    description: aboutPageText.ogDescription,
    type: "website",
    url: `${appDomain}/about`,
    images: [`${appDomain}logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutPageText.ogTitle,
    description: aboutPageText.ogDescription,
    images: [`${appDomain}logo.svg`],
  },
};

export default function AboutPage() {
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">
              About Scoreboards
            </h1>
            <p className="text-muted-foreground text-sm">
              Learn more about our mission, values, and the data we provide.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p>
              At Scoreboards, our mission is to make football more accessible
              and engaging for fans across Cameroon. We focus on delivering{" "}
              <strong>
                match updates, player statistics, and team insights
              </strong>{" "}
              from our local leagues through a clean and easy-to-use platform.
            </p>
            <p>
              Beyond real-time updates, we are committed to{" "}
              <strong>
                building a reliable archive of Cameroonian football data{" "}
              </strong>
              capturing results, performances, and stories that often go
              unrecorded. Over time, this growing database will support fans,
              analysts, and future projects that showcase the richness of our
              local game.
            </p>
            <p>
              While our priority is Cameroon today, we aim to expand to other
              African leagues in the future, strengthening the visibility and
              appreciation of football across the continent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  <strong>Match updates:</strong> Follow Cameroon local league
                  matches in real time, including scores, lineups, and match
                  events.
                </li>
                <li>
                  <strong>Comprehensive player and team statistics:</strong>{" "}
                  Track player performances, team standings, and historical
                  results to gain insights into the league.
                </li>
                <li>
                  <strong>Local league data archive:</strong> Access a growing
                  database of past matches, results, and performance records,
                  collected to support fans, analysts, and future football
                  projects.
                </li>
                <li>
                  <strong>Responsive and easy-to-use platform:</strong> Access
                  Scoreboards on any device desktop, tablet, or mobile for
                  seamless navigation and updates.
                </li>
                <li>
                  <strong>Future expansion:</strong> While we prioritize
                  Cameroon leagues today, we plan to extend coverage to other
                  African leagues, making local football more visible across the
                  continent.
                </li>
              </ul>
            </ul>
          </section>

          <section className="flex justify-center">
            <Image
              width={64}
              height={64}
              src="/about-illustration.svg"
              loading="eager"
              alt="About Scoreboards illustration"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">Our Vision</h2>
            <p>
              We envision a future where fans, analysts, and football
              enthusiasts can easily access reliable information about
              Cameroon's local leagues. By combining real-time match updates
              with a growing historical data archive, Scoreboards aims to
              enhance the experience of following football in Cameroon.
            </p>
            <p>
              Our long-term vision is to expand this platform to other African
              leagues, helping to increase the visibility and appreciation of
              football across the continent while empowering fans and
              researchers with accurate and comprehensive data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">About Our Data</h2>
            <p>
              At Scoreboards, we are committed to collecting accurate and
              comprehensive data from Cameroon's local football leagues. Every
              match, player performance, and team statistic is carefully
              recorded to create a reliable historical archive.
            </p>
            <p>
              This growing database not only allows fans to stay updated in real
              time but also provides valuable insights for analysts, coaches,
              and researchers. Over time, it will support a wide range of
              football related use cases, from performance analysis to
              historical comparisons.
            </p>
            <p>
              While our priority is Cameroon today, we plan to gradually extend
              our data collection to other African leagues, making local
              football more visible and accessible across the continent.
            </p>
          </section>
        </div>
      </div>

      {/* JSON-LD structured data for AboutPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Scoreboards",
            description: aboutPageText.description,
            url: `${appDomain}/about`,
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
