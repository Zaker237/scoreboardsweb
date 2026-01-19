"use client";

import { FC } from "react";

import { NavbarTop } from "./NavbarTop";
import { MobileChampionshipSidebar } from "../championships/MobileChampionshipSidebar";

export const AppHeader: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
      <div className="flex flex-col w-full">
        {/* Sidebar menu button (mobile only) */}
        <MobileChampionshipSidebar />
        <NavbarTop />
      </div>
    </header>
  );
};
