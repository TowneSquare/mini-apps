"use client";
import { useState } from "react";
import { SlothItem } from "./page";
import Image from "next/image";

export const ComposeList = ({ slothItems }: { slothItems: SlothItem[] }) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {slothItems.map((sloth) => {
        return <ComposeItem key={sloth.id} sloth={sloth} />;
      })}
    </div>
  );
};

const ComposeItem = ({ sloth }: { sloth: SlothItem }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected(!selected)}
      className="relative h-[calc(50vw-2rem)] w-[calc(50vw-2.5rem)] cursor-pointer overflow-hidden rounded-xl border border-b-[6px] border-black bg-[#c4d1e6]"
      style={{ background: selected ? "white" : "#c4d1e6" }}
    >
      <div
        className="absolute flex h-full w-full items-center justify-center text-xl font-semibold transition-opacity duration-500"
        style={{ opacity: selected ? 0 : 1 }}
      >
        {sloth.type}
      </div>
      <Image
        className="opacity-0 transition-opacity duration-500"
        style={{ opacity: selected ? 1 : 0 }}
        src={sloth.img}
        fill
        objectFit="cover"
        alt="sloth"
      />
    </div>
  );
};
