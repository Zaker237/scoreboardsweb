import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IStanding } from "@/interfaces/IStanding";
import { ITimelineEvent } from "@/interfaces/ITimelineEvent";

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


/**
 * Sorts match events chronologically, handling stoppage time.
 * Logic: (Minute * 100) + StoppageMinute
 */
export const sortByMatchTime = (
  a: ITimelineEvent,
  b: ITimelineEvent,
): number => {
  // Use 0 if minute or stoppage_minute is missing/null
  const minuteA = a.minute ?? 0;
  const stoppageA = a.stoppage_minute ?? 0;

  const minuteB = b.minute ?? 0;
  const stoppageB = b.stoppage_minute ?? 0;

  const weightA = minuteA * 100 + stoppageA;
  const weightB = minuteB * 100 + stoppageB;

  return weightA - weightB;
};

