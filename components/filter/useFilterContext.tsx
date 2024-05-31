"use client";
import { useContext } from "react";
import { FilterContext } from "./filterContext";

export default function useFilterContext() {
  const context = useContext(FilterContext);

  if (context === undefined || context === null) {
    throw new Error(
      "useFilterContext must be used within the FilterContextProvider"
    );
  }

  return context;
}
