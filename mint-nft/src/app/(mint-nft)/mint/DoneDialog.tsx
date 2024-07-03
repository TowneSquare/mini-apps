import sothballs from "@/public/assets/home/slothball_left1.svg";
import { Button } from "@/components/ui/button";
import unknownSothballs from "@/public/assets/unknow_slothball.png";

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

          <div className="relative flex h-[15rem] w-full justify-center">
            <div className="carousel carousel-center rounded-box pb-5">
              {hasNoneNft ? (
                <div className="carousel-item flex flex-col">
                  <img
                    className="mx-auto"
                    src={unknownSothballs.src}
                    width={205}
                    height={219}
                    alt="unknow_slothball"
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
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
