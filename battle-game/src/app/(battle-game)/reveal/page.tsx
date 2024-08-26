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

  const revealedTraits = useAppSelector(
      (state) => state.traitState.revealedTraits,
    );

  // useGSAP(() => {
  //   gsap.to("#ImgBg", {rotation: 360, transformOrigin: "center", ease: "elastic", duration: 30, repeat: -1});
  // }, {scope: container})
  return (
    <div
      className=" relative flex items-center justify-center w-screen h-screen bg-[#4c6299]"
    >
      <div id="ImgBg" className="absolute w-screen h-full rounded-full animate-duration-[2000ms]">
        <Image
          src={BgFallImg.src}
          fill
          alt="shining-bg"
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
    </div>
  );
}
