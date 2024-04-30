import { SlothsData } from "./page";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
export const SlothCarousel = ({ sloths }: { sloths: SlothsData }) => {
  return (
    <div className="carousel carousel-center max-w-md flex-1 space-x-4 bg-transparent px-8 py-4">
      {sloths.map((sloth) => {
        if (sloth.composed) {
          return (
            <div
              key={sloth.id}
              className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3"
            >
              <div className="flex flex-col items-center justify-center justify-self-start">
                <span className="text-3xl font-black">Your Sloth</span>
                <span className="mt-2 text-xl font-semibold">
                  Sloth #{sloth.id}
                </span>
              </div>
              <div className="mb-5 flex flex-col items-center justify-center justify-self-center">
                <div className="relative h-72 w-64">
                  <Image
                    src={sloth.slothImg}
                    fill
                    objectFit="contain"
                    alt="Sloth"
                  />
                </div>
                <span className="font-semibold text-[#8869ee]">cNFT</span>
              </div>
              <div className="mb-2 flex flex-col items-center justify-center justify-self-end">
                <span>Edit your cNFT on</span>
                <span className="text-bggreen font-extrabold">
                  townespase.xyz
                </span>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={sloth.id}
              className="carousel-item flex w-80 flex-col items-center justify-between rounded-3xl border-2 border-b-8 border-black bg-white pt-8 pb-3"
            >
              <div className="flex flex-col items-center justify-center justify-self-start">
                <span className="text-3xl font-black">Congratulations</span>
                <span className="mt-2 text-xl font-semibold">you minted</span>
              </div>
              <div className="relative mb-5 flex flex-col items-center justify-center justify-self-center">
                <div className="mb-5 h-72 w-64">
                  <Image
                    src={sloth.slothImg}
                    fill
                    objectFit="contain"
                    alt="Sloth"
                  />
                </div>
                <span className="text-lg font-semibold">
                  Slothball #{sloth.id}
                </span>
                <span className="font-semibold text-[#8869ee]">cNFT</span>
              </div>
              <Button
                className="h-14 w-[92%] justify-self-end text-lg"
                variant="secondary"
              >
                <Link href="/battle-game/compose">EVOLVE</Link>
              </Button>
            </div>
          );
        }
      })}
    </div>
  );
};
