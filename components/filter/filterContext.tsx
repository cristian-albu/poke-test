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
  activeCheckboxFilters: string[];
};

export const FilterContext = createContext<T_ContextState | null>(null);

export default function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterData, setFilterData] = useState<T_FilterState | null>(null);

  const activeCheckboxFilters = Object.entries(filterData || [])
    .filter(([key, val]) => val === true)
    .map(([key]) => key);

  return (
    <FilterContext.Provider
      value={{ filterData, setFilterData, activeCheckboxFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}
