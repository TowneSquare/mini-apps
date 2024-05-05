import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/battle-game/bg-fall.png";
import type { StaticImageData } from "next/image";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { SlothCarousel } from "./SlothCarousel";
export type SlothsData = {
  slothImg: StaticImageData;
  id: string;
  composed?: true;
}[];

export default function EvolvePage() {
  const sloths: SlothsData = [
    { slothImg: SlothRight2Img, id: "3229" },
    { slothImg: SlothRight2Img, id: "3230" },
    { slothImg: SlothRight2Img, id: "3231" },
    { slothImg: SlothRight2Img, id: "3232" },
    { slothImg: SlothRight2Img, id: "3233" },
  ];
  return (
    <>
      <CommonPageHeader className="z-10" />
      <main
        style={{
          background: `url(${BgFallImg.src}),radial-gradient(circle closest-side at 50% 40%,#5776b1 8%, #516aa2 60%, #3e4878 172%)`,
        }}
        className="relative flex h-full flex-col pt-20 pb-2"
      >
        <p className="px-8 text-xl font-medium text-white">JamesX99,</p>
        <p className="mt-2 mb-3 px-8 text-3xl font-extrabold text-white">
          Evolve your Slothballs!
        </p>
        <SlothCarousel sloths={sloths} />
      </main>
    </>
  );
}
