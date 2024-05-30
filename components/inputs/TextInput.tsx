"use client";
import React, { FC, InputHTMLAttributes, ReactNode } from "react";
import { Button } from "../layout";

export type T_TextInput = {
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<T_TextInput> = ({
  icon,
  children,
  className,
  ...attributes
}) => {
  return (
    <label className="w-full flex flex-col justify-start items-start mb-5">
      <span className="w-full">{children}</span>
      <div className="w-full flex justify-stretch items-stretch">
        <input
          className={`w-full border-2 border-gray-400 px-2 py-1 ${
            icon ? "rounded-l-lg" : "rounded-lg"
          } ${className}`}
          {...attributes}
        />

        {icon && <Button className={`rounded-l-none px-6`}>{icon}</Button>}
      </div>
    </label>
  );
};

export default TextInput;
