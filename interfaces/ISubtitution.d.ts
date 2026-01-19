import { IBasePlayer } from "./IBasePlayer";
import { ITeamBase } from "./ITeams";

interface ISubtitution {
  id: number;
  match: number;
	team: ITeamBase;
  player_out: IBasePlayer
  player_in: IBasePlayer
  minute: number;
  stoppage_minute: number | null;
  reason: string | null;
}
