"use client";

import React, { createContext, useReducer, FC, ReactNode } from "react";
import { dateReducer } from "@/reducers/dateReducer";
import { IDateState, IDateActionType } from "@/interfaces/ICommons";

// Default date: current date
const currentDate = new Date();

const defaultDate: IDateState = {
  date: currentDate,
};

// Context definition
export const DateContext = createContext<{
  state: IDateState;
  dispatch: React.Dispatch<IDateActionType>;
}>({
  state: defaultDate,
  dispatch: () => {},
});

// Provider props type
interface DateContextProviderProps {
  children: ReactNode;
}

// Client component provider
export const DateContextProvider: FC<DateContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dateReducer, defaultDate);

  return (
    <DateContext.Provider value={{ state, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};
