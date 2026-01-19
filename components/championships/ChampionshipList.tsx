"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

import { ChampionshipService } from "@/services/ChampionshipService";
import { IEdition } from "@/interfaces/IEditions";

interface IChampionshipListProps {
  onItemClick?: () => void;
}

export const ChampionshipList: FC<IChampionshipListProps> = ({ onItemClick }) => {
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
    <div className="flex flex-col w-full p-3">
      <div className="mb-4">
        <h6 className="px-5 text-sm font-bold">COMPETITIONS</h6>
      </div>

      <div className="w-full flex flex-col">
        {editions.map((edition) => (
          <div key={edition.id} className="flex flex-col w-full">
            <Link
              href={`/leagues/${edition.id}`}
              onClick={onItemClick}
              className="flex w-full"
            >
              <div className="flex items-center justify-start p-2 w-full">
                <div className="flex px-5">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={edition.championship.logo}
                      alt={edition.championship.name}
                    />
                    <AvatarFallback>
                      {edition.championship.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="pl-4 text-xs font-semibold">{edition.label}</h3>
                <ChevronRight className="ml-auto" />
              </div>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
