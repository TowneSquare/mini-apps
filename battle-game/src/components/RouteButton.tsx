"use client";

import { useRouter } from "next/navigation";
export const RouteButton = ({
  path,
  title,
  disabled,
  animateClass = "",
  bottomClass = "bottom-0",
}: {
  path: string;
  title: string;
  disabled?: boolean;
  animateClass?: string;
  bottomClass?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={
        "fixed bottom-0 left-0 right-0 z-[2] mx-auto h-20 w-11/12 rounded-2xl bg-[#29294f] px-5 py-4 " +
        bottomClass +
        " " +
        animateClass
      }
      style={{
        backgroundColor: disabled ? "#292a4d" : "#29294f",
      }}
    >
      <button
        disabled={disabled}
        type="button"
        onClick={() => router.push(path)}
        className="bg-bggreen h-full w-full rounded-xl font-extrabold text-white"
        style={{
          backgroundColor: disabled ? "#426767" : "#82cacb",
          color: disabled ? "#949494" : "white",
        }}
      >
        {title}
      </button>
    </div>
  );
};
