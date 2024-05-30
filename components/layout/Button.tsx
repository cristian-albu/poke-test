"use client";
import React, { ButtonHTMLAttributes, FC } from "react";

export type T_Button = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<T_Button> = ({ children, className, ...attributes }) => {
  return (
    <button
      className={`bg-black text-white px-3 py-2 rounded-md transition-all shadow-lg hover:scale-[1.03] hover:bg-blue-500 active:scale-[0.97] disabled:scale-[1] disabled:cursor-not-allowed disabled:bg-gray-600 ${className}`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
