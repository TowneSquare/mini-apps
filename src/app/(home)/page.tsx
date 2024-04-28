import Image from "next/image";
import Link from "next/link";
import LogoBg from "../../../public/assets/home/home_logo.png";
import TitleImg from "../../../public/assets/home/home_title.png";
import SlothImg from "../../../public/assets/home/sloth.png";
import SlothLeft1Img from "../../../public/assets/home/sloth_left1.png";
import SlothLeft2Img from "../../../public/assets/home/sloth_left2.png";
import SlothRight1Img from "../../../public/assets/home/sloth_right1.png";
import SlothRight2Img from "../../../public/assets/home/sloth_right2.png";

export default function Home() {
  return (
    <main
      className="h-screen overflow-hidden bg-bgorange"
      style={{
        background:
          "radial-gradient(circle closest-side at 50% 40%,#f5f3ecff 30%, #f0eee4ff 60%, #e1dac4 130%)",
      }}
    >
      <div className="h-[40%] pt-5">
        <div className="relative mx-auto h-[50%] w-3/4">
          <Image src={TitleImg} fill={true} objectFit="contain" alt="title" />
        </div>
        <div className="relative mx-auto mt-2 h-[9%] w-3/4">
          <Image
            className=""
            src={LogoBg}
            fill={true}
            objectFit="contain"
            alt="Logo"
          />
        </div>
        <div className="animate-home-title-ani z-10 mt-5 flex h-[41%] flex-col items-center justify-center text-3xl font-black">
          <span>Built with</span>
          <span className="text-textpink">composability</span>
          <span>
            & <span className="text-textgreen">for mobile</span>
          </span>
        </div>
      </div>

      <div className="relative h-[60%]">
        <div className="absolute top-[20%] h-[80%] w-full translate-y-full animate-[sloth-appear-up_0.4s_0.8s_ease-in-out_forwards]">
          <Image src={SlothImg} fill={true} objectFit="contain" alt="title" />
        </div>

        <div className="bg-bggreen absolute bottom-0 h-[30%] w-[120%] -translate-x-[15%] animate-[appear-up_0.3s_ease-in-out_forwards] rounded-tl-[99%] rounded-tr-[190%]"></div>
        <Image
          className="fixed bottom-[1.5rem] left-0 -translate-x-full animate-[appear-left-sm_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothLeft2Img}
          width={180}
          height={196}
          alt="Sloth"
        />

        <Image
          className="fixed bottom-0 left-0 -translate-x-full animate-[appear-left_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothLeft1Img}
          width={114}
          height={172}
          alt="Sloth"
        />

        <Image
          className="fixed bottom-8 right-0 translate-x-full animate-[appear-right-sm_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothRight2Img}
          width={170}
          height={175}
          alt="Sloth"
        />
        <Image
          className="fixed bottom-0 right-0 translate-x-full animate-[appear-right_0.3s_0.8s_ease-in-out_forwards]"
          src={SlothRight1Img}
          width={126}
          height={194}
          alt="Sloth"
        />

        <div className="fixed bottom-0 left-0 right-0 mx-auto h-20 w-11/12 translate-y-full  animate-[button-appear-up_0.3s_1.2s_ease-in-out_forwards] rounded-2xl bg-sky-900 px-5 py-4">
          <button className="bg-bggreen h-full w-full rounded-xl font-extrabold text-white">
            <Link href="/mint">CONTINUE</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
