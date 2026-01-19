import { IDateState, IDateActionType } from "@/interfaces/ICommons";
import { dateActions } from "@/constants/actions";
import { Reducer } from "react";

export const dateReducer: Reducer<IDateState, IDateActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case dateActions.DATE_CHANGED:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
