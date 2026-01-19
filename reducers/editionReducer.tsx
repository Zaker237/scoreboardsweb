import { IEditionState, IEditionActionType } from "@/interfaces/ICommons";
import { editionActions } from "@/constants/actions";
import { Reducer } from "react";

export const editionReducer: Reducer<IEditionState, IEditionActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case editionActions.EDITION_CHANGED:
      return {
        ...state,
        edition: action.payload,
      };
    default:
      return state;
  }
};
