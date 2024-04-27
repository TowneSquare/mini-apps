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
    <main className="h-screen overflow-hidden bg-bgorange">
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
        <div className="z-10 mt-5 flex h-[41%] flex-col items-center justify-center text-3xl font-black">
          <span>Built with</span>
          <span className="text-textpink">composability</span>
          <span>
            & <span className="text-textgreen">for mobile</span>
          </span>
        </div>
      </div>

      <div className="relative h-[60%]">
        <div className="absolute top-0 h-[80%] w-full ">
          <Image src={SlothImg} fill={true} objectFit="contain" alt="title" />
        </div>

        <div className="absolute bottom-0 h-[30%] w-[120%] -translate-x-[15%] rounded-tl-[100%] rounded-tr-[50%] bg-bggreen"></div>
        <Image
          className="fixed bottom-[1.5rem] left-[2rem]"
          src={SlothLeft2Img}
          width={180}
          height={196}
          alt="Sloth"
        />

        <Image
          className="fixed bottom-0 left-0"
          src={SlothLeft1Img}
          width={114}
          height={172}
          alt="Sloth"
        />

        <Image
          className="fixed bottom-8 right-[1.5rem]"
          src={SlothRight2Img}
          width={170}
          height={175}
          alt="Sloth"
        />
        <Image
          className="fixed bottom-0 right-0"
          src={SlothRight1Img}
          width={126}
          height={194}
          alt="Sloth"
        />

        <div className="fixed left-1/2 bottom-8 h-20 w-11/12 -translate-x-2/4 rounded-2xl bg-sky-900 px-5 py-4">
          <button className="h-full w-full rounded-xl bg-bggreen font-extrabold text-white">
            <Link href="/mint">CONTINUE</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
