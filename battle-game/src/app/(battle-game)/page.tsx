"use client";

import Image from "next/image";
import EvilAndSloths from "@/public/assets/battle-game/sloth-evil.png";
import { RouteButton } from "@/src/components/RouteButton";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { BattleCard } from "./BattleCard";
import { useSlothBallData } from "@/src/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useCountdown } from "@/src/hooks/useCountdown";

export default function BattleGamePage() {
  const { account, connected } = useWallet();

  const slothBallData = useSlothBallData({
    accountAddress: account?.address,
  });

  const eligible = slothBallData.data && slothBallData.data.length > 0;
  const gameStartTime = 1726045200000;
  const timeInfo = useCountdown({ deadlineTime: gameStartTime });
 

  return (
    <>
      <main className="w-full h-full pb-10 bg-no-repeat bg-contain bg-oval-pattern">
        <CommonPageHeader />
        <div className="flex flex-col items-center justify-center mt-3">
          {/* <p className="text-xl text-white">JamseX99,</p> */}
          <p className="text-3xl font-bold text-[#8be5d4]">
            Defeat the Evil Sloth
          </p>
          <p className="text-3xl font-bold text-white">
            to evolve your Slothball!
          </p>
        </div>

        <div className="flex items-center justify-center mt-16">
          <Image
            src={EvilAndSloths}
            className="md:h-[493px] md:w-[426px]"
            alt="evil-and-sloths"
            style={{ objectFit: "contain" }}
          />
        </div>

        <BattleCard
          eligible={eligible}
          gameStartTime={gameStartTime}
          evolveNumber={slothBallData.data?.length}
          connected={connected}
        />
        {gameStartTime - Math.floor(Date.now()) <= 30000 && !(gameStartTime - Math.floor(Date.now()) <= 0) ? (
          <RouteButton
            disabled={!eligible}
            title={`Battle ${timeInfo.secondsStr}`}
            path="/hitbear"
            bottomClass="bottom-8"
            gameStartTime={gameStartTime}
          />
        ) : (
          <RouteButton
            disabled={!eligible}
            title={`Battle`}
            path="/hitbear"
            bottomClass="bottom-8"
            gameStartTime={gameStartTime}
          />
        )}
      </main>
    </>
  );
}
