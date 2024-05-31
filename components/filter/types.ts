export type T_FilterDataCheckboxContents = { label: string; default: boolean };
export type T_FilterDataCheckbox = {
  type: "checkbox";
  contents: T_FilterDataCheckboxContents[];
};

export type T_FilterInitialData = {
  [key: string]: T_FilterDataCheckbox;
};

export type T_InitialFilterDataArr = [string, T_FilterDataCheckbox][];

export type T_FilterState = {
  [key: string]: boolean;
};

export type T_FilterModal = {
  closeFilterModal: () => void;
  initialFilterDataArr: T_InitialFilterDataArr;
};

export type T_FilterProps = {
  initialFilterDataArr: T_InitialFilterDataArr;
};
