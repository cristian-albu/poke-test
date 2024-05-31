import React, { FC } from "react";
import { T_PokeRowData } from "./PokeTable";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex float-start flex-grow capitalize">{data.name}</div>
      <div>{data.type}</div>
      <p className="opacity-0 transition-opacity group-hover:opacity-100">
        View more
      </p>
    </Link>
  );
};

export default PokeRow;
