import React, { FC } from "react";
import { T_PokeRowData } from "./PokeTable";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export type T_PokeRow = {
  data: T_PokeRowData;
};

const PokeRow: FC<T_PokeRow> = ({ data }) => {
  return (
    <Link
      href={data.url}
      className="group w-full flex justify-between items-center gap-3 border-b-[1px] border-b-gray-300 mb-2"
    >
      <Image width={50} height={50} src={data.image} alt={data.name} />
      <div className="flex float-start w-[30%] capitalize text-lg">
        {data.name}
      </div>

      <div className="flex float-start w-[30%] ">
        <div className="flex gap-3">
          {data.type.split(", ").map((type) => (
            <p
              key={type}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg text-sm"
            >
              {type}
            </p>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="opacity-0 transition-opacity group-hover:opacity-100">
          View more
        </p>
        <FaArrowRight />
      </div>
    </Link>
  );
};

export default PokeRow;
