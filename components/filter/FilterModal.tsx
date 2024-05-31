"use client";
import { ChangeEvent, FC, useMemo, useState } from "react";
import useFilterContext from "./useFilterContext";
import buildFilterStateShape from "./utils";
import { T_FilterModal, T_FilterState } from "./types";
import { Checkbox } from "../inputs";
import { Button } from "../layout";

const FilterModal: FC<T_FilterModal> = ({
  closeFilterModal,
  initialFilterDataArr,
}) => {
  const { filterData, setFilterData } = useFilterContext();
  const initialData = useMemo(
    () => buildFilterStateShape(initialFilterDataArr),
    [initialFilterDataArr]
  );

  const [filterState, setFilterState] = useState<T_FilterState>(
    filterData || initialData
  );

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : Number(e.target.value);

    const key = e.target.type === "radio" ? e.target.name : e.target.id;

    setFilterState((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleApplyFilter = () => {
    closeFilterModal();
    setFilterData(filterState);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-end items-center px-5 pt-[6rem] pb-[4rem]">
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={closeFilterModal}
      />
      <div className="relative w-full md:w-[30%] h-full bg-white p-5 shadow-lg rounded-lg flex flex-col ">
        <form
          className="w-full flex flex-col overflow-auto"
          onSubmit={(e) => e.preventDefault()}
          onChange={handleChange}
          name="filter"
        >
          <p className="text-3xl w-full">Filter</p>

          {initialFilterDataArr.map(([key, val]) => {
            return (
              <div
                key={key}
                className="w-full flex flex-col justify-start items-start"
              >
                <p
                  className="text-xl mb-3"
                  style={{ textTransform: "capitalize" }}
                >
                  {key}
                </p>

                {val.type === "checkbox" &&
                  val.contents.map((item) => {
                    const defaultChecked = filterData
                      ? (filterData[item.label] as boolean)
                      : item.default;
                    return (
                      <Checkbox
                        key={item.label}
                        id={item.label}
                        defaultChecked={defaultChecked}
                        name={item.label}
                      >
                        {item.label}
                      </Checkbox>
                    );
                  })}
              </div>
            );
          })}
        </form>
        <div className="w-full border-t-2 border-t-gray-200 py-3 flex justify-between mt-auto">
          <Button onClick={closeFilterModal}>Close</Button>
          <Button onClick={handleApplyFilter} name="apply-filters">
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
