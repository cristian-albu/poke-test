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
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const FilterContext = createContext<T_ContextState | null>(null);

export default function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterData, setFilterData] = useState<T_FilterState | null>(null);

  const [searchValue, setSearchValue] = useState("");

  const activeCheckboxFilters = Object.entries(filterData || [])
    .filter(([key, val]) => val === true)
    .map(([key]) => key);

  return (
    <FilterContext.Provider
      value={{
        filterData,
        setFilterData,
        activeCheckboxFilters,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
