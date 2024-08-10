"use client";

import Image from "next/image";
import EvilAndSloths from "@/public/assets/battle-game/sloth-evil.png";
import { RouteButton } from "@/src/components/RouteButton";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { BattleCard } from "./BattleCard";
import { useSlothBallData } from "@/src/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function BattleGamePage() {

  const {account, connected} = useWallet()

  const slothBallData = useSlothBallData({
    accountAddress: account?.address
  })
  const eligible = slothBallData.data && slothBallData.data.length > 0
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
          eligible = {eligible}
          gameStartTime={1723475243000}
          evolveNumber={slothBallData.data?.length}
          connected={connected}
        />

        <RouteButton
          disabled={!eligible}
          title="BATTLE (30 SEC)"
          path="/hitbear"
          bottomClass="bottom-8"
        />
      </main>
    </>
  );
}
