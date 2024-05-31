import { T_FilterState, T_InitialFilterDataArr } from "./types";

export default function buildFilterStateShape(data: T_InitialFilterDataArr) {
  return data.reduce((prev, curr) => {
    const item = curr[1];

    const checkboxes =
      item.type === "checkbox"
        ? item.contents.reduce((prevItem, currItem) => {
            return {
              ...prevItem,
              [currItem.label]: currItem.default,
            };
          }, {})
        : null;

    return {
      ...prev,
      ...checkboxes,
    };
  }, {}) as T_FilterState;
}
