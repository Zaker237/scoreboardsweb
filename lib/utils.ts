import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IStanding } from "@/interfaces/IStanding";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function standingSort(a: IStanding, b: IStanding): number {
  if (b.points !== a.points) {
    return b.points - a.points;
  }

  const goalDiffA = a.goals_for - a.goals_against;
  const goalDiffB = b.goals_for - b.goals_against;

  if (goalDiffB !== goalDiffA) {
    return goalDiffB - goalDiffA;
  }

  if (b.goals_for !== a.goals_for) {
    return b.goals_for - a.goals_for;
  }

  if (b.wins !== a.wins) {
    return b.wins - a.wins;
  }

  return b.participation.team.name.localeCompare(a.participation.team.name);
}

