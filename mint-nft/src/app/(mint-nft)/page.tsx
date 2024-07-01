"use client";
import Image from "next/image";
import LogoBg from "@/public/assets/home/home_logo.png";
import TitleImg from "@/public/assets/home/home_title.png";
import SlothWithNoMounthImg from "@/public/assets/home/sloth_with_no_mounth.png";
import BgWaveImg from "@/public/assets/home/bg_wave.png";
import BubbleMounthImg from "@/public/assets/home/bubble_mouth.png";
import EvilSmileImg from "@/public/assets/home/evil_smile.png";
import SlothLeft1Img from "@/public/assets/home/panda_sloth_left1.png";
import SlothLeft2Img from "@/public/assets/home/panda_sloth_left2.png";
import SlothRight1Img from "@/public/assets/home/panda_sloth_right1.png";
import SlothRight2Img from "@/public/assets/home/panda_sloth_right2.png";
import { RouteButton } from "@/src/components/RouteButton";

export default function MintHome() {
  return (
    <main
      className="h-full overflow-hidden bg-bgorange"
      style={{
        background:
          "radial-gradient(circle closest-side at 50% 40%,#f5f3ecff 30%, #f0eee4ff 60%, #e1dac4 130%)",
      }}
    >
      <div className="h-[40%] pt-5">
        <div className="relative mx-auto h-[45%] w-3/4">
          <Image
            src={TitleImg}
            priority
            className="object-contain"
            fill
            alt="title"
          />
        </div>
        <div className="relative mx-auto mt-2 h-[12%] w-3/4">
          <Image src={LogoBg} fill className="object-contain" alt="Logo" />
        </div>
        <div className="z-10 mt-5 flex h-[41%] animate-home-title-ani flex-col items-center justify-center text-3xl font-black">
          <span>Built with</span>
          <span className="text-textpink">composability</span>
          <span>
            & <span className="text-textgreen">for mobile</span>
          </span>
        </div>
      </div>
      <div className="relative mx-auto h-[60%] max-w-[500px]">
        {/* sloth */}
        <div className="absolute top-[20%] h-[80%] w-full translate-y-full animate-[sloth-appear-up_0.4s_0.8s_ease-in-out_forwards]">
          <Image
            src={SlothWithNoMounthImg}
            fill
            className="object-cover"
            alt="title"
          />
        </div>

        {/* sloth bubble */}
        <div className="absolute left-[25%] top-[100%] z-[1] h-[10%] w-[80%] translate-y-full animate-[sloth-bubble-appear-up_1.6s_0.8s_ease-in-out_forwards]">
          <Image
            src={BubbleMounthImg}
            fill
            className="object-contain"
            alt="title"
          />
        </div>

        {/* sloth smile */}
        <div className="absolute opacity-0 left-[1%] top-0 h-[80%] w-full translate-x-full animate-[sloth-smile-appear-left_0.5s_2.0s_ease-in-out_forwards]">
          <Image
            src={EvilSmileImg}
            fill
            className="object-contain"
            alt="title"
          />
        </div>

        {/* frontball */}
        <Image
          className="fixed bottom-[1.5rem] left-0 z-[1] h-auto w-[11rem] -translate-x-full animate-[appear-left-sm_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothLeft2Img}
          alt="Sloth"
        />

        <Image
          className="fixed bottom-[-4rem] left-[-4rem] z-[1] h-auto w-[13rem] -translate-x-full animate-[appear-left_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothLeft1Img}
          alt="Sloth"
        />

        <Image
          className="fixed bottom-8 right-0 z-[1] h-auto w-[11rem] translate-x-full animate-[appear-right-sm_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothRight2Img}
          alt="Sloth"
        />
        <Image
          className="fixed bottom-[-4rem] right-[-4rem] z-[1] h-auto w-[13rem] translate-x-full animate-[appear-right_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothRight1Img}
          alt="Sloth"
        />

        {/* continue button */}
        <RouteButton
          animateClass="translate-y-full max-w-[25rem] animate-[button-appear-up_0.3s_1.2s_ease-in-out_forwards]"
          title="CONTINUE"
          path="/mint"
        />
      </div>
      {/* frontground */}
      <div className="fixed bottom-[-15%] left-0 right-0 m-auto h-[16rem] w-full max-w-[50rem] -translate-x-[15%] animate-[appear-up_0.3s_ease-in-out_forwards] ">
        <Image src={BgWaveImg} fill className="object-cover" alt="title" />
      </div>
    </main>
  );
}
