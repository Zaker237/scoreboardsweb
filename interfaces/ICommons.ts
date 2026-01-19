import { IMatchEdition } from "./IEditions";

export interface IDateState {
  date: Date;
}

export interface IDateActionType {
  type: string;
  payload: Date;
}

export interface IEditionState {
  edition: IMatchEdition | null;
}

export interface IEditionActionType {
  type: string;
  payload: IMatchEdition;
}
