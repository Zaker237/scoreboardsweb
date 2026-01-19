import { IBasePlayer } from "./IBasePlayer";
import { ITeamBase } from "./ITeams";

export interface IPlayerTransfers {
  player: IBasePlayer;
  team: ITeamBase;
  start_date: Date;
  end_date?: Date;
  fee?: number;
}
