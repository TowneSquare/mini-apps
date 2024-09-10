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
    <>
      <CommonPageHeader className="z-10" />
      <div className="relative flex h-screen w-screen items-center justify-center bg-[#4c6299]">
        <div
          id="ImgBg"
          className="absolute flex h-[1032px] w-[1032px] justify-center animate-spin  animate-duration-[100000ms] animate-infinite overflow-hidden rounded-[50%]"
        >
          <Image
            src={BgFallImg.src}
            width={1000}
            height={1000}
            alt="shining-bg"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              objectPosition: "50% 50%",
            }}
            priority
            className=""
          />
        </div>
        <div className="w-full h-full">
          <RevealCarousel />
        </div>
      </div>
    </>
  );
}
