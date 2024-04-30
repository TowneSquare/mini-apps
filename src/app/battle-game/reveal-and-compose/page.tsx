import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.png";
import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/battle-game/bg-fall.png";
import { SlothsData } from "../evolve/page";
import { SlothCarousel } from "../evolve/SlothCarousel";
import ComposedImg from "@/public/assets/compose/composed.png";


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
      <header className="fixed z-10 flex h-20 w-full flex-row items-center justify-between px-4 backdrop-blur-sm">
        <Image src={HeaderBg} width={126} height={80} alt="Header" />
        <CloseOutlined className="text-2xl text-white" />
      </header>
      <main
        style={{
          background: `url(${BgFallImg.src}),radial-gradient(circle closest-side at 50% 40%,#5776b1 8%, #516aa2 60%, #3e4878 172%)`,
        }}
        className="relative flex min-h-screen flex-col py-20"
      >
        <p className="mt-2 mb-3 px-8 text-3xl font-extrabold text-white">
          Reveal and compose your Sloth!
        </p>

        <SlothCarousel sloths={sloths} />
      </main>
    </>
  );
}
