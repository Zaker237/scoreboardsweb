"use client";

import React, { createContext, useReducer, FC, ReactNode } from "react";
import { editionReducer } from "@/reducers/editionReducer";
import { IEditionState, IEditionActionType } from "@/interfaces/ICommons";

// Default state
const defaultEditionState: IEditionState = {
  edition: null,
};

// Context definition
export const EditionContext = createContext<{
  state: IEditionState;
  dispatch: React.Dispatch<IEditionActionType>;
}>({
  state: defaultEditionState,
  dispatch: () => {},
});

// Provider props type
interface EditionContextProviderProps {
  children: ReactNode;
}

// Client component provider
export const EditionContextProvider: FC<EditionContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(editionReducer, defaultEditionState);

  return (
    <EditionContext.Provider value={{ state, dispatch }}>
      {children}
    </EditionContext.Provider>
  );
};
