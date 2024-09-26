"use client";

import { useRouter } from "next/navigation";
import { useBattleEvil } from "@/src/hooks/battleEvilProvider";
export const RouteButton = ({
  title,
  disabled,
  animateClass = "",
  bottomClass = "bottom-0",
  gameStartTime,
}: {
  title: string;
  disabled?: boolean;
  animateClass?: string;
  bottomClass?: string;
  gameStartTime: number;
}) => {
  const router = useRouter();
  const { evilBlood } = useBattleEvil();
  const isStartGame = !(gameStartTime - Math.floor(Date.now()) <= 30000);

  return (
    <div
      className={
        " mx-auto mt-4 h-20 w-11/12 rounded-2xl bg-[#29294f] px-5 py-4 md:w-[40%] " +
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
        onClick={() => {
          router.push("/evolve");
        }}
        className="w-full h-full font-extrabold text-white rounded-xl bg-bggreen"
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
