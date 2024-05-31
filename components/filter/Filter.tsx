"use client";
import { createPortal } from "react-dom";
import { T_FilterProps } from "./types";
import { FC, useState } from "react";
import { Button } from "../layout";
import FilterModal from "./FilterModal";
import { FaFilter } from "react-icons/fa";

const Filter: FC<T_FilterProps> = ({ initialFilterDataArr }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const toggleFilterModal = () => {
    setShowFilterModal((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleFilterModal}>
        <FaFilter />
        Filter
      </Button>

      {showFilterModal &&
        createPortal(
          <FilterModal
            closeFilterModal={closeFilterModal}
            initialFilterDataArr={initialFilterDataArr}
          />,
          document.body
        )}
    </>
  );
};

export default Filter;
