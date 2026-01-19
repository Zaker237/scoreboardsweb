import "./globals.css";

import { ReactNode } from "react";
import { AppHeader } from "@/components/header/AppHeader";
import { AppFooter } from "@/components/footer/AppFooter";
import { ToastContainer } from "@/components/ToastContainer";
import { DateContextProvider } from "@/contexts/DateContext";
import { EditionContextProvider } from "@/contexts/EditionContext";

export const metadata = {
  title: "Scoreboards",
  description:
    "Follow Cameroon's football competitions with Scoreboards. Live scores, fixtures, and match results.",
  openGraph: {
    title: "Scoreboards",
    description:
      "Follow Cameroon's football competitions with Scoreboards. Live scores, fixtures, and match results.",
    url: "https://scoreboards.alexwalker.app/",
    type: "website",
    images: ["https://scoreboards.alexwalker.app/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scoreboards",
    description:
      "Follow Cameroon's football competitions with Scoreboards. Live scores, fixtures, and match results.",
    images: ["https://scoreboards.alexwalker.app/logo.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <DateContextProvider>
          <EditionContextProvider>
            <div className="flex flex-col min-h-screen w-full">
              <AppHeader />
              <main className="flex-1 w-full flex justify-center">
                <div className="w-full max-w-6xl px-4">{children}</div>
              </main>
              <AppFooter />
            </div>
            <ToastContainer />
          </EditionContextProvider>
        </DateContextProvider>
      </body>
    </html>
  );
}
