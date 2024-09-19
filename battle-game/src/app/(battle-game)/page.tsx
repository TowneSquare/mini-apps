"use client";

import Image from "next/image";
import EvilAndSloths from "@/public/assets/battle-game/sloth-evil.png";
import { RouteButton } from "@/src/components/RouteButton";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { BattleCard } from "./BattleCard";
import { useSlothBallData } from "@/src/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useCountdown } from "@/src/hooks/useCountdown";
import { GAME_START_TIME } from "@/src/config/constants";

export default function BattleGamePage() {
  const { account, connected } = useWallet();

  const slothBallData = useSlothBallData({
    accountAddress: account?.address,
  });

  const eligible = slothBallData.data && slothBallData.data.length > 0;

  const timeInfo = useCountdown({ deadlineTime: GAME_START_TIME });
 

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
          gameStartTime={GAME_START_TIME}
          evolveNumber={slothBallData.data?.length}
          connected={connected}
        />
        {GAME_START_TIME - Math.floor(Date.now()) <= 30000 && !(GAME_START_TIME - Math.floor(Date.now()) <= 0) ? (
          <RouteButton
            //disabled={!eligible}
            title={`Battle ${timeInfo.secondsStr}`}
            
            bottomClass="bottom-8"
            gameStartTime={GAME_START_TIME}
          />
        ) : (
          <RouteButton
            //disabled={!eligible}
            title={`Battle`}
            
            bottomClass="bottom-8"
            gameStartTime={GAME_START_TIME}
          />
        )}
      </main>
    </>
  );
}
