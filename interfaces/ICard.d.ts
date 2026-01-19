import { ITeamBase } from "./ITeams";
import { IBasePlayer } from "./IBasePlayer";

export interface ICard {
  id: number;
  card_type: string;
  match_id: number;
  team: ITeamBase;
  minute: number;
  stoppage_minute: number;
  player: IBasePlayer;
  reason?: string;
  is_second_yellow: boolean;
}
