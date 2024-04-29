import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.png";
import EvilAndSloths from "@/public/assets/battle-evovling/sloth-evil.png";
import { RouteButton } from "@/src/components/RouteButton";

export default function BattleGamePage() {
  return (
    <>
      <header className="fixed z-10 flex h-20 w-full flex-row items-center justify-between px-4 backdrop-blur-sm">
        <Image src={HeaderBg} width={126} height={80} alt="Header" />
        <CloseOutlined className="text-2xl text-white" />
      </header>
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
              <span className="text-base border-bggreen text-bggreen rounded-full border-2 px-4 font-medium">
                You're eligible
              </span>
            </div>
            <div className="flex h-56 w-full flex-col items-center justify-center pb-3">
              <h1 className="text-lg font-bold text-white">Battle starts</h1>
              <span className="text-lg text-white">19 April⋅00:00 GMT</span>
              <div className="mt-9 grid grid-cols-4 divide-x divide-slate-400/25 rounded-xl bg-[#555372] text-slate-300">
                <div className="flex flex-col items-center justify-center px-3 py-2">
                  <span className="text-xl">02</span>
                  <span>Days</span>
                </div>
                <div className="flex flex-col items-center justify-center px-3 py-2">
                  <span className="text-xl">23</span>
                  <span>Hours</span>
                </div>
                <div className="flex flex-col items-center justify-center px-3 py-2">
                  <span className="text-xl">56</span>
                  <span>Minutes</span>
                </div>
                <div className="flex flex-col items-center justify-center px-3 py-2">
                  <span className="text-xl">12</span>
                  <span>Seconds</span>
                </div>
              </div>
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
