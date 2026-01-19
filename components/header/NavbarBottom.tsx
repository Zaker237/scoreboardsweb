"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";

import { IEdition } from "@/interfaces/IEditions";
import { ChampionshipService } from "@/services/ChampionshipService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavbarBottom: FC = () => {
  const [editions, setEditions] = useState<IEdition[]>([]);

  useEffect(() => {
    const loadChampionships = async () => {
      try {
        const datas = await ChampionshipService.getActiveEditions();
        setEditions(datas);
      } catch (error) {
        console.error("Failed to load editions:", error);
      }
    };
    loadChampionships();
  }, []);

  return (
    <nav className="flex justify-center pb-4">
      <ul className="flex gap-4">
        {editions.map((edition) => (
          <li key={edition.championship.id}>
            <Link
              href={`/leagues/${edition.championship.id}`}
              className="flex flex-col items-center gap-1"
            >
              <Avatar>
                <AvatarImage
                  src={edition.championship.logo}
                  alt={edition.championship.name}
                />
                <AvatarFallback>
                  {edition.championship.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xs font-semibold text-white">
                {edition.label ?? ""}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
