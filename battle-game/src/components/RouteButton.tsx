"use client";

import { useRouter } from "next/navigation";
export const RouteButton = ({
  path,
  title,
  disabled,
  animateClass = "",
  bottomClass = "bottom-0",
  gameStartTime
}: {
  path: string;
  title: string;
  disabled?: boolean;
  animateClass?: string;
  bottomClass?: string;
  gameStartTime:number
}) => {
  const router = useRouter();
   const isStartGame = !(gameStartTime - Math.floor(Date.now()) <= 30000);
   console.log(isStartGame, gameStartTime, Math.floor(Date.now()), "tartTime")
  return (
    <div
      className={
        " mt-4 mx-auto h-20 w-11/12 rounded-2xl md:w-[40%] bg-[#29294f] px-5 py-4 " +
        bottomClass +
        " " +
        animateClass
      }
      style={{
        backgroundColor: disabled ? "#292a4d" : "#29294f",
      }}
    >
      <button
        disabled={disabled || isStartGame}
        type="button"
        onClick={() => router.push(path)}
        className="w-full h-full font-extrabold text-white bg-bggreen rounded-xl"
        style={{
          backgroundColor: disabled || isStartGame ? "#426767" : "#82cacb",
          color: disabled || isStartGame ? "#949494" : "white",
        }}
      >
        {title}
      </button>
    </div>
  );
};
