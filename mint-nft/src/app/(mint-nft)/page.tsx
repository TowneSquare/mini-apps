"use client";
import Image from "next/image";
import MintLogoSVG from "@/public/assets/home/mint_logo.svg";

import SlothWithNoMounthImg from "@/public/assets/home/fur.svg";

import GlassesSVG from "@/public/assets/home/glasses.svg";
import Glasses1SVG from "@/public/assets/home/glasses1.svg";
import Glasses2SVG from "@/public/assets/home/eyes.svg";

import ClothingSVG from "@/public/assets/home/clothing.svg";
import Clothing1SVG from "@/public/assets/home/clothing1.svg";

import MouthSVG from "@/public/assets/home/mouth.svg";
import Mouth1SVG from "@/public/assets/home/mouth1.svg";
import Mouth2SVG from "@/public/assets/home/mouth2.svg";

import HatSVG from "@/public/assets/home/hat.svg";
import Hat1SVG from "@/public/assets/home/hat1.svg";
import Hat2SVG from "@/public/assets/home/hat2.svg";

import SlothLeft1Img from "@/public/assets/home/slothball_left1.svg";
import SlothLeft2Img from "@/public/assets/home/slothball_left2.svg";
import SlothRight1Img from "@/public/assets/home/slothball_right1.svg";
import SlothRight2Img from "@/public/assets/home/slothball_right2.svg";
import BgWaveImg from "@/public/assets/home/bg_wave.svg";

import { RouteButton } from "@/src/components/RouteButton";
import Header from "@/src/components/Header";

export default function MintHome() {
  return (
    <>
      <Header />
      <main
        className="h-full overflow-hidden bg-bgorange"
        style={{
          background:
            "radial-gradient(circle closest-side at 50% 40%,#f5f3ecff 30%, #f0eee4ff 60%, #e1dac4 130%)",
        }}
      >
        <div className="h-[40%] pt-5">
          <div className="relative mx-auto h-[57%] w-3/4">
            <Image
              src={MintLogoSVG}
              priority
              className="object-contain"
              fill
              alt="title"
            />
          </div>
          <div className="z-10 mt-5 flex h-[41%] animate-home-title-ani flex-col items-center justify-center text-2xl font-black">
            <span>Built with</span>
            <span className="text-textpink">composability</span>
            <span>
              & <span className="text-textgreen">for mobile</span>
            </span>
          </div>
        </div>
        <div className="relative mx-auto h-[60%] max-w-[350px] md:max-w-[500px]">
          {/* sloth */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-y-full animate-[sloth-appear-up_0.4s_0.8s_ease-in-out_forwards]">
            <Image
              src={SlothWithNoMounthImg}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* mouth */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-y-full animate-[sloth-bubble-appear-up3_6s_0.8s_ease-in-out_forwards]">
            <Image src={MouthSVG} fill className="object-contain" alt="title" />
          </div>
          {/* hat */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-y-full animate-[sloth-bubble-appear-up_1.6s_0.8s_ease-in-out_forwards] opacity-0">
            <Image src={HatSVG} fill className="object-contain" alt="title" />
          </div>
          {/* glasses */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-y-full animate-[sloth-bubble-appear-up2_3.5s_0.8s_ease-in-out_forwards]">
            <Image
              src={GlassesSVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* hat1 */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left1_6s_2.0s_ease-in-out_forwards] opacity-0">
            <Image src={Hat1SVG} fill className="object-contain" alt="title" />
          </div>

          {/* glasses1 */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left1_5.8s_3s_ease-in-out_forwards] opacity-0">
            <Image
              src={Glasses1SVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* mouth1 */}
          <div className="opacity-0] absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left1_5.5s_4s_ease-in-out_forwards] opacity-0">
            <Image
              src={Mouth1SVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* clothing */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left1_5.5s_4.8s_ease-in-out_forwards] opacity-0">
            <Image
              src={ClothingSVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* hat2 */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left_0.5s_5.6s_ease-in-out_forwards] opacity-0">
            <Image src={Hat2SVG} fill className="object-contain" alt="title" />
          </div>

          {/* glasses2 */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left_0.5s_6.5s_ease-in-out_forwards] opacity-0">
            <Image
              src={Glasses2SVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* mouth2 */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left_0.5s_7.2s_ease-in-out_forwards] opacity-0">
            <Image
              src={Mouth2SVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* cloasing1 */}
          <div className="absolute bottom-[5.5rem] h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left_0.5s_8.3s_ease-in-out_forwards] opacity-0">
            <Image
              src={Clothing1SVG}
              fill
              className="object-contain"
              alt="title"
            />
          </div>

          {/* frontball */}
          <Image
            className="fixed bottom-[0.8rem] left-0 z-[1] h-auto w-[11rem] translate-x-[calc(50vw-31rem)] animate-[appear-left-sm_0.3s_0.8s_ease-in-out_forwards] opacity-0"
            src={SlothLeft2Img}
            alt="Sloth"
          />

          <Image
            className="fixed bottom-[-3.5rem] left-0 z-[1] h-auto w-[13rem] translate-x-[calc(50vw-36rem)] animate-[appear-left_0.3s_0.8s_ease-in-out_forwards] opacity-0"
            src={SlothLeft1Img}
            alt="Sloth"
          />

          <Image
            className="fixed bottom-[0.8rem] right-0 z-[1] h-auto w-[11rem] translate-x-[calc(-50vw+31rem)] animate-[appear-right-sm_0.3s_0.8s_ease-in-out_forwards] opacity-0"
            src={SlothRight2Img}
            alt="Sloth"
          />
          <Image
            className="fixed bottom-[-3.5rem] right-0 z-[1] h-auto w-[13rem] translate-x-[calc(-50vw+36rem)] animate-[appear-right_0.3s_0.8s_ease-in-out_forwards] opacity-0"
            src={SlothRight1Img}
            alt="Sloth"
          />

          {/* continue button */}
          <RouteButton
            animateClass="translate-y-full max-w-[25rem] animate-[button-appear-up_0.4s_1.2s_ease-in-out_forwards]"
            title="CONTINUE"
            path="/mint"
          />

          {/* frontground */}
          <div className="fixed bottom-[-7rem] left-0 right-0 m-auto h-[16rem] w-full max-w-[50rem]">
            <Image src={BgWaveImg} fill className="object-cover" alt="title" />
          </div>
        </div>
      </main>
    </>
  );
}
