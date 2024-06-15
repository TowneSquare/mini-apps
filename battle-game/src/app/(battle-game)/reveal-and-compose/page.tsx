import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/battle-game/bg-fall.png";
import { SlothsData } from "../evolve/page";
import { SlothCarousel } from "../evolve/SlothCarousel";
import ComposedImg from "@/public/assets/compose/composed.png";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";

export default function EvolvePage() {
  const sloths: SlothsData = [
    { slothImg: ComposedImg, id: "3228", composed: true },
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
        className="relative flex min-h-[calc(100vh-4rem)] flex-col pt-20 pb-10"
      >
        <p className="mt-2 mb-3 px-8 text-3xl font-extrabold text-white">
          Reveal and compose your Sloth!
        </p>

        <SlothCarousel sloths={sloths} />
      </main>
    </>
  );
}
