"use client";
import React, { FC, HTMLAttributes } from "react";

export type T_Container = HTMLAttributes<HTMLDivElement>;

const Container: FC<T_Container> = ({ children, className, ...attributes }) => {
  return (
    <div
      className={`w-full max-w-[900px] flex flex-col justify-start items-start ${className}`}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default Container;
