"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { T_FilterState } from "./types";

export type T_ContextState = {
  filterData: T_FilterState | null;
  setFilterData: Dispatch<SetStateAction<T_FilterState | null>>;
};

export const FilterContext = createContext<T_ContextState | null>(null);

export default function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterData, setFilterData] = useState<T_FilterState | null>(null);

  return (
    <FilterContext.Provider value={{ filterData, setFilterData }}>
      {children}
    </FilterContext.Provider>
  );
}
