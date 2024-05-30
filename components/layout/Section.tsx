"use client";
import React, { FC, HTMLAttributes } from "react";

export type T_Section = HTMLAttributes<HTMLDivElement>;

const Section: FC<T_Section> = ({ children, className, ...attributes }) => {
  return (
    <section
      className={`w-full flex flex-col justify-center items-center p-10 ${className}`}
      {...attributes}
    >
      {children}
    </section>
  );
};

export default Section;