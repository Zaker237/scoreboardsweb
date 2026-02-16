"use client";

import React, {
  createContext,
  useReducer,
  FC,
  ReactNode,
  useMemo,
} from "react";
import { dateReducer } from "@/reducers/dateReducer";
import { IDateState, IDateActionType } from "@/interfaces/ICommons";

// Context definition
export const DateContext = createContext<{
  state: IDateState;
  dispatch: React.Dispatch<IDateActionType>;
}>({
  state: { date: new Date() },
  dispatch: () => {},
});

// Provider props type
interface DateContextProviderProps {
  children: ReactNode;
  initialDate: string | undefined;
}

// Client component provider
export const DateContextProvider: FC<DateContextProviderProps> = ({
  children,
  initialDate,
}) => {
  const validateDate = (dateStr: string | undefined): Date => {
    if (!dateStr) return new Date();
    const d = new Date(dateStr);
    // isNaN(d.getTime()) is true if the date is "Invalid Date"
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const parsedDate = useMemo(() => validateDate(initialDate), [initialDate]);

  const [state, dispatch] = useReducer(dateReducer, { date: parsedDate });

  // This ensures the reducer stays in sync with URL changes
  React.useEffect(() => {
    if (initialDate) {
      dispatch({ type: "SET_DATE", payload: new Date(initialDate) });
    }
  }, [initialDate]);

  return (
    <DateContext.Provider value={{ state, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};
