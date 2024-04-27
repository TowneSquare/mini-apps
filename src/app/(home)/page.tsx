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
    <main className="h-screen bg-bgorange pt-5">
      <Image
        className="mx-auto"
        src={TitleImg}
        width={248}
        height={144}
        alt="title"
      />
      <Image
        className="mx-auto mt-2"
        src={LogoBg}
        width={203}
        height={32}
        alt="Logo"
      />
      <div className="z-10 mt-5 flex flex-col items-center justify-center text-2xl font-black">
        <span>Built with</span>
        <span className="text-textpink">composability</span>
        <span>
          & <span className="text-textgreen">for mobile</span>
        </span>
      </div>
      <Image
        className="fixed bottom-[9rem] left-1/2 -translate-x-2/4"
        src={SlothImg}
        width={360}
        height={326}
        alt="Sloth"
      />
      <div className="fixed -bottom-[9rem] h-80 w-[120%] -translate-x-[15%] rounded-tl-[90%] rounded-tr-[50%] bg-bggreen"></div>
      <Image
        className="fixed bottom-[1.5rem] left-[2.5rem]"
        src={SlothLeft2Img}
        width={180}
        height={191}
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
        className="fixed bottom-8 left-1/2"
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
    </main>
  );
}
