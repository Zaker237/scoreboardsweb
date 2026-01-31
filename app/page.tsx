import MatchsPageClient from "./MatchsPageClient";
import { homePageText, appDomain } from "@/constants/seoTexts";
import { DateContextProvider } from "@/contexts/DateContext";

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;

  return (
    <DateContextProvider initialDate={date}>
      <MatchsPageClient />
    </DateContextProvider>
  );
}
