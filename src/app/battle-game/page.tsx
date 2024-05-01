import Image from "next/image";
import EvilAndSloths from "@/public/assets/battle-game/sloth-evil.png";
import { RouteButton } from "@/src/components/RouteButton";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { BattleCard } from "./BattleCard";

export default function BattleGamePage() {
  return (
    <>
      <CommonPageHeader className="z-10" />
      <main className="relative min-h-screen bg-[#1b2537] pt-20 pb-32">
        <div
          className="absolute bottom-0 z-[1] mx-auto h-[60rem] w-full rounded-tl-[3rem] rounded-tr-[3rem] bg-[#4c6299]"
          style={{
            background:
              "radial-gradient(circle closest-side at 50% 40%,#5776b1 8%, #516aa2 60%, #3e4878 172%)",
          }}
        ></div>
        <div className="z-[2] mb-10 flex flex-col items-center justify-center">
          <p className="text-xl text-white">JamseX99,</p>
          <p className="mt-2 text-3xl font-semibold text-[#8be5d4]">
            Defeat the Evil Sloth
          </p>
          <p className="text-3xl font-semibold text-white">
            to evolve your Slothball!
          </p>
        </div>

        <Image
          src={EvilAndSloths}
          fill
          className="!relative z-[2] !h-auto"
          alt="evil-and-sloths"
        />

        <BattleCard
          eligible={true}
          gameStartTime={new Date("2024-5-19").getTime()}
          evolveNumber={23}
        />

        <RouteButton
          // disabled={true}
          title="BATTLE (22 SEC)"
          path="/battle-game/evolve"
          bottomClass="bottom-8"
        />
      </main>
    </>
  );
}
