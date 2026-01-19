import { ITeamBase } from "./ITeams";

export interface IParticipation {
  id: number;
  team: ITeamBase;
  group?: string;
  is_promoted: boolean;
  is_relegated: boolean;
  edition: number;
}

export interface IStanding {
  id: number;
  participation: IParticipation;
  points: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
}
