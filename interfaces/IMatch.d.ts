import { ICard } from "@/interfaces/ICard";
import { IMatchEdition } from "@/interfaces/IEditions";
import { IGoal } from "@/interfaces/IGoal";
import { IBasePlayer } from "@/interfaces/IBasePlayer";
import { ITeamBase } from "@/interfaces/ITeams";
import { ISubtitution } from "@/interfaces/ISubtitution";
import { MatchStatus, MatchType, CompetitionPhase, KnockoutRound  } from "@/enums/matchs";

interface IMatchTeam {
  id: number;
  name: string;
  logo: string;
}

interface IMatchLineUp {
  id: number,
  player: IBasePlayer;
  team: ITeamBase,
  match: number,
  poistion: string;
  is_starting: boolean;
  minutes_played: number;
}

export interface IMatchBase {
  id: number;
  type: MatchType;
  date: Date;
  location: string;
  round: string;
  status: planned;
  edition: IMatchEdition;
  home_team: IMatchTeam;
  away_team: IMatchTeam;
  status: MatchStatus;
  competition_phase: CompetitionPhase;
  knockout_round: KnockoutRound;
  attendance: number | null;
  score_ht_home: number | null;
  score_ht_away: number | null;
  score_90_home: number | null;
  score_90_away: number | null;
  score_final_home: number | null;
  score_final_away: number | null;
  score_pso_home: number | null;
  score_pso_away: number | null;
  went_to_extra_time: boolean;
  went_to_penalties: boolean;
}

export interface IMatch extends IMatchBase {
  events: [];
  goals: IGoal[];
  cards: ICard[];
  substitutions: ISubtitution[];
  lineups: IMatchLineUp[];
}


export interface IMatchEvent {
  id: number;
  minute: number;
  team: IMatchTeam;
  player: IBasePlayer;
  assist?: IBasePlayer;
  type: "goal" | "yellow_card" | "red_card" | "penalty_miss" | "own_goal";
  description?: string;
}
