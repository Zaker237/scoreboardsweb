"use client";

import { FC } from "react";
import Link from "next/link";
// import { Apple, Smartphone } from "lucide-react";

export const AppFooter: FC = () => {
  return (
    <footer className="w-full bg-primary text-primary-foreground border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Middle Section */}
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-6 border-primary-foreground/30">
          {/* Left: Info Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/faqs" className="hover:underline">
              FAQs
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy-notice" className="hover:underline">
              Privacy Notice
            </Link>
          </div>

          {/* Right: App Store Buttons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {/* Example buttons with icons */}
            {/*
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-xs hover:opacity-80"
            >
              <Apple size={16} /> App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-xs hover:opacity-80"
            >
              <Smartphone size={16} /> Google Play
            </a>
            */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center border-t border-primary-foreground/30 text-xs text-center md:text-left">
          <span>© {new Date().getFullYear()} Scoreboards. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/cookies-policy" className="hover:underline">
              Cookies Policy
            </Link>
            <Link href="/terms-of-use" className="hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
