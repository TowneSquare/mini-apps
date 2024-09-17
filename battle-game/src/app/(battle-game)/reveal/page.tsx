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
      <div className="relative flex h-fit w-screen flex-col items-center justify-center bg-[#4c6299]">
        <CommonPageHeader className="z-10" />
        <div
          id="ImgBg"
          className="absolute bottom-0 top-0 flex h-[900px] w-[900px] animate-spin justify-center overflow-hidden rounded-[50%] animate-duration-[100000ms] animate-infinite"
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
        <RevealCarousel />
      </div>
    </>
  );
}
