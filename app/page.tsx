import MatchsPageClient from "./MatchsPageClient";
import { homePageText, appDomain } from "@/constants/seoTexts";

export const metadata = {
  title: "Home | Scoreboards",
  description: homePageText.description,
  openGraph: {
    title: "Home | Scoreboards",
    description: homePageText.description,
    type: "website",
    url: appDomain,
    images: [`${appDomain}logo.svg`],
  },
};

export default function Home() {
  return <MatchsPageClient />;
}