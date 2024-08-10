"use client";
import React from "react";
import Image from "next/image";
import Header from "@/src/components/Header";
import Confetti from "react-confetti";
import Link from 'next/link'
import { useWindowSize } from "react-use";



const youMadeIt = () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden text-white bg-no-repeat bg-cover bg-you-made-it">
        
      <Confetti
        width={width}
        height={height}
        gravity={0.1}
        numberOfPieces={220}
      />
        <div className="flex flex-col items-center justify-center">
          
          <div>
            <Image src="/assets/slothballs.png" width={454} height={289} />
          </div>
          
          <div>
            <h1 className="text-center text-[29px] font-bold">Hooraaaay! </h1>
            <h1 className="text-center text-[29px] font-bold">
              You’ve made it!
            </h1>
          </div>
          <button  className="px-24 py-2 mt-10 text-lg font-extrabold text-white rounded-lg bg-bggreen">
            <Link href="/evolve">Continue</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default youMadeIt;
