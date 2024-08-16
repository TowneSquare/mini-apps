"use client";
import sothballs from "@/public/assets/home/slothball_left1.svg";
import { Button } from "@/src/components/ui/button";
import unknownSothballs from "@/public/assets/unknow_slothball.png";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/src/components/ui/dialog";
import Image from "next/image";
import { MintData } from "./MIntCarousel";
import { useMediaQuery } from "react-responsive";
import { Draggable } from "@/src/components/ui/Draggable";
import { useRef } from "react";

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
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });
  const Ref = useRef(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="backdrop-blur-sm">
        <DialogContent
          className={`flex ${isDesktopOrLaptop ? "h-[518px] w-[500px]" : "h-[518px] w-[334px]"} flex-col items-center justify-center overflow-hidden ${isDesktopOrLaptop ? "rounded-[16px]" : "rounded-[10px]"} border-2 border-b-4 border-black bg-white bg-cover bg-center p-5`}
        >
          <h2 className="mb-6 text-3xl font-semibold">Well done!!!</h2>

          <div className="relative flex h-[15rem] w-full justify-center">
            <Draggable innerRef={Ref}  rootClass="drag" >
            <div className="flex flex-row w-full overflow-x-auto no-scrollbar">
              {hasNoneNft ? (
                <div className="flex flex-col carousel-item">
                  <img
                    className="mx-auto"
                    src={unknownSothballs.src}
                    width={205}
                    height={219}
                    alt="unknow_slothball"
                  />
                  <div className="flex justify-center w-full h-6">
                    <span className="text-base font-medium" />
                  </div>
                </div>
              ) : (
                mintedData.map((mintedDataItem, i) => {
                  return (
                    <div key={i} className="flex flex-col carousel-item">
                      <img
                        className="mx-auto"
                        src={mintedDataItem.mintImg}
                        width={205}
                        height={219}
                        alt="slothball"
                      />
                      <div className="flex justify-center w-full h-6">
                        <h2 className="mb-2 text-xl font-semibold">
                          Slothball #{mintedDataItem.mintID}
                        </h2>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            </Draggable>
          </div>

          <div className="text-center">
            <p className="mb-2 font-medium indent-2 ">
              Your Slothball's transformation into a Sloth is on the horizon.
              The evolution is coming – be prepared!
            </p>
          </div>

          <DialogClose asChild>
            <Button
              className="w-[302px] h-[48px] rounded-[10px] text-lg"
              type="button"
              variant="secondary"
            >
              CONTINUE
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
