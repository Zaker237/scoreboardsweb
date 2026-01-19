import { IBasePlayer } from "./IBasePlayer";
import { IPlayerTeam } from "./ITeams";

export interface IPlayer {
  id: number;
  firstname: string;
  lastname: string;
  height: number;
  weight: number;
  position: string;
  avatar?: string;
  nationality: string;
  jersey_number: number;
  date_of_birth: Date;
  matricule: string;
}

export interface IPlayerStats {
  player: IBasePlayer;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  team: IPlayerTeam;
}

export interface IPlayerContracts {
  player: IBasePlayer;
  team: IPlayerTeam;
  start_date: Date;
  end_date?: Date;
  fee?: number
}

export interface IPlayerTeamHistory {
  team: IPlayerTeam;
  start_date: Date;
  end_date?: Date;
}
