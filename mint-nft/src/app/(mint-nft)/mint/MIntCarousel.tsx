import sothballs from "@/public/assets/home/sloth_left2.png";
import Image from "next/image";
import { useRef, useState } from "react";

// import type { StaticImageData } from "next/image";
import unknownSothballs from "@/public/assets/unknow_slothball.png";
import { Draggable } from "@/src/components/ui/Draggable";
export interface MintData {
  mintID: string;
  // mintImg: StaticImageData;
  mintImg: string;
}

export const MintCarousel: React.FC<{ mintList: MintData[] }> = ({
  mintList,
}) => {
  console.log("mintList", mintList);
  const Ref = useRef(null);
  // const mokeMintList: MintData[] = [
  //   { mintID: "666", mintImg: sothballs.src },
  //   { mintID: "667", mintImg: sothballs.src },
  //   { mintID: '0', mintImg: sothballs.src },
  // ];
  const hasNoneNft = mintList.length <= 0;

  return (
    <div className="relative flex flex-row w-full h-full mb-5 no-scrollbar">
      {/* <img
        src="/assets/carousel-edge-left.png"
        className="absolute left-0 z-20 h-[249px] max-h-full"
      /> */}
      {/* <div className="carousel-item">
        <div className="h-[108px] w-[100px]" />
      </div> */}
      <Draggable innerRef={Ref} rootClass="drag">
        <div className="flex flex-row mb-5">
          {hasNoneNft ? (
            <div className="flex flex-col w-full carousel-item">
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
            mintList.map((mintData, i) => {
              return (
                <div key={i} className="flex flex-col carousel-item">
                  <img
                    className="mx-auto "
                    src={mintData.mintImg}
                    width={205}
                    height={219}
                    alt="slothball"
                    draggable={false}
                  />
                  <div className="flex justify-center w-full h-6">
                    <span className="text-base font-medium">
                      Slothball #{mintData.mintID}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Draggable>
      {/* <img
        src="/assets/carousel-edge-right.png"
        className="absolute right-0 z-20 h-[249px] max-h-full"
      /> */}
    </div>
  );
};
