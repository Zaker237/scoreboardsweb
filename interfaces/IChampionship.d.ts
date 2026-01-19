import { IEdition } from "./IEditions";

export interface IChampionship {
  id: number;
  name: string;
  country: string;
  logo: string;
  description: string;
  editions: IEdition[];
}
