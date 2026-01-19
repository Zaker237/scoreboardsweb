export interface ITeamBase {
  id: number;
  name: string;
  logo: string;
  stadium: string;
  country: string;
}

export interface ITeam extends ITeamBase {
  team_type: string;
  coach: string;
  confederation: string;
  league: string;
}

export interface ITeamStats {
  team: ITeamBase;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
}
