import Image from "next/image";
import EvilAndSloths from "@/public/assets/battle-game/sloth-evil.png";
import { RouteButton } from "@/src/components/RouteButton";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { CountDown } from "@/src/components/CountDown";

export default function BattleGamePage() {
  return (
    <>
      <CommonPageHeader className="z-10" />
      <main className="relative min-h-screen bg-[#1b2537] pt-20 pb-32">
        <div
          className="absolute bottom-0 z-[1] mx-auto h-[50rem] w-full rounded-tl-[3rem] rounded-tr-[3rem] bg-[#4c6299]"
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
          objectFit="contain"
          sizes="100vw"
          alt="evil-and-sloths"
        />

        <div className="relative z-[2] mx-auto w-11/12 rounded-xl">
          <div className="rounded-t-xl bg-[#29294f] px-4 pt-2">
            <div className="flex h-12 w-full items-center justify-between">
              <span className="text-lg font-bold text-white">Battle</span>
              <span className="border-bggreen text-bggreen rounded-full border-2 px-4 text-base font-medium">
                You're eligible
              </span>
            </div>
            <div className="flex h-56 w-full flex-col items-center justify-center pb-3">
              <h1 className="text-lg font-bold text-white">Battle starts</h1>
              <span className="mb-9 text-lg text-white">
                19 April⋅00:00 GMT
              </span>
              <CountDown bgcolor='bg-[#555372]' />
            </div>
          </div>
          <div className="rounded-b-xl bg-white px-4 py-5">
            <span className="font-semibold text-[#424242]">
              After the battle
            </span>

            <div className="mt-2 flex items-center justify-between text-lg">
              <span className="font-black">Evolve</span>
              <span className="font-black">3 Slothballs</span>
            </div>
          </div>
        </div>

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
