"use client";
import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import { FaCheck } from "react-icons/fa";

export type T_Checkbox = InputHTMLAttributes<HTMLInputElement>;

const Checkbox: FC<T_Checkbox> = ({ children, onChange, ...attributes }) => {
  const [checked, setChecked] = useState(attributes.checked || false);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    setChecked(e.target.checked);
  };

  return (
    <label className="flex justify-center items-center gap-1 cursor-pointer mb-3">
      <div className="w-[1.2rem] h-[1.2rem] border-2 border-gray-400 rounded-sm">
        <FaCheck
          className={`transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <input
        type="checkbox"
        className={"w-0 h-0"}
        onChange={handleChecked}
        {...attributes}
      />
      <span>{children}</span>
    </label>
  );
};

export default Checkbox;
