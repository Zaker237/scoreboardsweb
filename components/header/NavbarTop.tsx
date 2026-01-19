"use client";

import Link from "next/link";
import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Bell, Search } from "lucide-react";
// import clsx from "clsx";
import { FC } from "react";

export const NavbarTop: FC = () => {
  // const [search, setSearch] = useState<string>("");

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  return (
    <nav className="relative flex h-24 items-center justify-center px-4 lg:justify-between">
      {/* Logo / Home Link */}
      <Link
        href="/"
        className="flex items-center justify-center cursor-pointer p-2"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={64}
          height={64}
          loading="eager"
          className="w-16 h-16"
        />
        {/* <h1 className="text-black font-bold bg-white text-4xl p-5">Scoreboards</h1> */}
      </Link>

      {/* Optional: Search & Actions */}
      {/* 
      <div className="flex items-center justify-center gap-4">
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <Bell className="text-white" />
      </div>
      */}
    </nav>
  );
};
