"use client";
import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/reveal-bg.png";
import { SlothsData } from "../evolve/page";
import { SlothCarousel } from "../evolve/SlothCarousel";
import ComposedImg from "@/public/assets/compose/composed.png";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { RevealCarousel } from "./RevealCarousel";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import { useRef, useEffect } from "react";

export default function RevealPage() {
  const ImgRef = useRef(null);
  const container = useRef(null);

  const revealedTraits = useAppSelector(
      (state) => state.traitState.revealedTraits,
    );

  // useGSAP(() => {
  //   gsap.to("#ImgBg", {rotation: 360, transformOrigin: "center", ease: "elastic", duration: 30, repeat: -1});
  // }, {scope: container})
  return (
    <main
      ref={container}
      className="container relative flex items-center justify-center h-screen"
    >
      <div className="absolute w-screen h-full rounded-full">
        <Image
          id={`ImgBg`}
          ref={ImgRef}
          src={BgFallImg.src}
          fill
          alt="Background"
          style={{
            objectFit:"contain"
          }}
          priority
        />
      </div>
      <div className="fixed w-full h-full top-1/3">
        <p className="px-8 mt-2 mb-3 text-3xl font-extrabold text-center text-white bg-center">
          Reveal and compose your Sloth!
        </p>
        <RevealCarousel />
      </div>
    </main>
  );
}
