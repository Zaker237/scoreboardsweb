import { IBasePlayer } from "./IBasePlayer";
import { ITeamBase } from "./ITeams";
import { GoalStatus, GoalType } from "@/enums/goals";

export interface IGoal {
  id: number;
  match: number;
  team: ITeamBase;
  minute: number;
  stoppage_minute: number;
  is_csc: boolean;
  is_penalty: boolean;
  scorer: IBasePlayer;
  assister: IBasePlayer | null;
  goal_type: GoalType;
  status: GoalStatus;
  disallowed_reason: string | null;
  decision_minute: number | null;
  shootout_order: number | null;
}
