
"use client"
import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/reveal-bg.png";
import { SlothsData } from "../evolve/page";
import { SlothCarousel } from "../evolve/SlothCarousel";
import ComposedImg from "@/public/assets/compose/composed.png";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { RevealCarousel } from "./RevealCarousel";
import Image from "next/image";
import gsap from "gsap";
import {useRef, useEffect} from "react"


export default function RevealPage() {
  const ImgRef = useRef(null)
  const container = useRef(null)
  
  const sloths: SlothsData = [
    { slothImg: ComposedImg, id: "3228", composed: true },
    { slothImg: SlothRight2Img, id: "3229" },
    { slothImg: SlothRight2Img, id: "3230" },
    { slothImg: SlothRight2Img, id: "3231" },
    { slothImg: SlothRight2Img, id: "3232" },
    { slothImg: SlothRight2Img, id: "3233" },
  ];

  // useGSAP(() => {
  //   gsap.to("#ImgBg", {rotation: 360, transformOrigin: "center", ease: "elastic", duration: 30, repeat: -1});
  // }, {scope: container})
  return (
    <main ref={container} className="container relative flex items-center justify-center h-screen">
      <Image id="ImgBg" ref={ImgRef} src={BgFallImg.src} className="absolute h-full" objectFit="cover" fill alt="bg"/>
      <div className="fixed justify-center w-full h-full top-1/3">
        <p className="px-8 mt-2 mb-3 text-3xl font-extrabold text-center text-white bg-center">
          Reveal and compose your Sloth!
        </p>
        <RevealCarousel />
      </div>
    </main>
  );
}
