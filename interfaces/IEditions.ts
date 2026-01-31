export interface IChampionshipEdition {
  id: number;
  name: string;
  country: string;
  logo?: string;
}

export interface IEditionStandingRule {
  id: number;
  edition: number;
  phase: string;
  from_position: number;
  to_position?: number;
  outcome: string;
  color: string;
  priority: number;
}

export interface IMatchEdition {
  id: number;
  championship: IChampionshipEdition;
  year: string;
  label?: string;
  start_date: Date;
  end_date: Date;
  is_current: boolean;
}

export interface IEdition {
  id: number;
  championship: IChampionshipEdition;
  year: string;
  label?: string;
  start_date: Date;
  end_date: Date;
  is_current: boolean;
  description: string;
}
