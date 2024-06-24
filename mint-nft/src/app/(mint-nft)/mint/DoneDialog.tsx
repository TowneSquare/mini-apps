import bg from "@/public/assets/hooray/bg.png";
import sothballs from "@/public/assets/home/panda_sloth_left2.png";
import { Button } from "@/components/ui/button";
import centerImage from "@/public/assets/hooray/ball-brown.png";
import unknownSothballs from "@/public/assets/unknown_sothballs.png";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import Image from "next/image";
import { MintData } from "./MIntCarousel";

export const MintDoneDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  mintedData: Array<MintData>;
}> = ({ open, setOpen, mintedData }) => {
  // const mokeMintList: MintData[] = [
  //   { mintID: "666", mintImg: sothballs.src },
  //   { mintID: "667", mintImg: sothballs.src },
  //   { mintID: "0", mintImg: sothballs.src },
  // ];
  const hasNoneNft = mintedData.length <= 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="backdrop-blur-sm">
        <DialogContent className="flex h-[40rem] w-[85%] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-black bg-white bg-cover bg-center p-5">
          <h2 className="mb-6 text-3xl font-semibold">Well done!!!</h2>

          <div className="relative h-[15rem] w-full flex justify-center">
            {/* <Image
              src={centerImage.src}
              alt="Center Image"
              fill
              className="object-contain "
            /> */}
            <div className="carousel-center carousel rounded-box pb-5">
              {/* <div className="carousel-item">
          <div className="h-[108px] w-[100px]" />
        </div> */}
              {hasNoneNft ? (
                <div className="carousel-item flex flex-col">
                  <img
                    className="mx-auto"
                    src={unknownSothballs.src}
                    width={205}
                    height={219}
                    alt="unknown_sothballs"
                  />
                  <div className="flex h-6 w-full justify-center">
                    <span className="text-base font-medium" />
                  </div>
                </div>
              ) : (
                mintedData.map((mintedDataItem, i) => {
                  return (
                    <div key={i} className="carousel-item flex flex-col">
                      <img
                        className="mx-auto"
                        src={mintedDataItem.mintImg}
                        width={205}
                        height={219}
                        alt="slothball"
                      />
                      <div className="flex h-6 w-full justify-center">
                        <h2 className="mb-2 text-xl font-semibold">
                          Slothball #{mintedDataItem.mintID}
                        </h2>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="mb-2 indent-2 font-medium ">
              Your Slothball's transformation into a Sloth is on the horizon.
              The evolution is coming – be prepared!
            </p>
          </div>

          <DialogClose asChild>
            <Button
              className="w-[100%] text-lg"
              type="button"
              variant="secondary"
            >
              CONTINUE
            </Button>
          </DialogClose>

          {/* 分享按钮 */}
          <a
            href="#"
            className=" flex items-center px-3 py-3  text-xl font-black text-[#6C5BA4]"
          >
            {/*<img src={shareImage.src} className="w-5 fill-blue-500 mr-2"  alt=""/>*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            SHARE
          </a>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
