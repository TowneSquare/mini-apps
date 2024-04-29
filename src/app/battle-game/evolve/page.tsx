import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.png";
import { Button } from "@/src/components/ui/button";
import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/battle-evovling/bg-fall.png";
import Link from "next/link";

export default function EvolvePage() {
  return (
    <>
      <header className="fixed z-10 flex h-20 w-full flex-row items-center justify-between px-4 backdrop-blur-sm">
        <Image src={HeaderBg} width={126} height={80} alt="Header" />
        <CloseOutlined className="text-2xl text-white" />
      </header>
      <main
        style={{
          background: `url(${BgFallImg.src}),radial-gradient(circle closest-side at 50% 40%,#5776b1 8%, #516aa2 60%, #3e4878 172%)`,
        }}
        className="relative flex min-h-screen flex-col py-20"
      >
        <p className="px-8 text-xl font-medium text-white">JamesX99,</p>
        <p className="mt-2 mb-3 px-8 text-3xl font-extrabold text-white">
          Evolve your Slothballs!
        </p>

        <div className="carousel carousel-center max-w-md flex-1 space-x-4 bg-transparent px-8 py-4">
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>{" "}
          <div className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3">
            <div className="flex flex-col items-center justify-center justify-self-start">
              <span className="text-3xl font-black">Congratulations</span>
              <span className="mt-2 text-xl font-semibold">you minted</span>
            </div>
            <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
              <div className="mb-5 h-72 w-64">
                <Image
                  src={SlothRight2Img}
                  fill
                  objectFit="contain"
                  alt="Sloth"
                />
              </div>
              <span className="text-lg font-semibold">Slothball #3229</span>
              <span className="font-semibold text-[#8869ee]">cNFT</span>
            </div>
            <Button
              className="h-14 w-[92%] justify-self-end text-lg"
              variant="secondary"
            >
              <Link href="/battle-game/compose">EVOLVE</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
