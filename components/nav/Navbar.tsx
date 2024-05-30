"use client";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export type T_NavLink = {
  label: string;
  icon?: ReactNode;
  href: string;
};

export type T_Navbar = {
  links?: T_NavLink[];
};

const Navbar: FC<T_Navbar> = ({ links }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white flex gap-5 shadow-md">
      {links &&
        links.map(({ label, href, icon }, index) => (
          <Link
            key={label}
            href={href}
            className={`flex justify-center items-center gap-2 p-3 transition-colors hover:bg-blue-500 ${
              index === 0 && "mr-auto"
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
    </nav>
  );
};

export default Navbar;
