import sothballs from "@/public/assets/home/sloth_left2.png";
import Image from "next/image";
// import type { StaticImageData } from "next/image";
import unknownSothballs from "@/public/assets/unknown_sothballs.png";
export interface MintData {
  mintID: string;
  // mintImg: StaticImageData;
  mintImg: string;
}
export const MintCarousel: React.FC<{ mintList: MintData[] }> = ({
  mintList,
}) => {
  console.log("mintList", mintList);
  // const mokeMintList: MintData[] = [
  //   { mintID: "666", mintImg: sothballs.src },
  //   { mintID: "667", mintImg: sothballs.src },
  //   { mintID: '0', mintImg: sothballs.src },
  // ];
  const hasNoneNft = mintList.length <= 0;
  return (
    <div className="carousel carousel-center rounded-box pb-5">
      <div className="carousel-item">
        <div className="h-[108px] w-[100px]" />
      </div>
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
        mintList.map((mintData, i) => {
          return (
            <div key={i} className="carousel-item flex flex-col">
              <img
                className="mx-auto"
                src={mintData.mintImg}
                width={205}
                height={219}
                alt="slothball"
              />
              <div className="flex h-6 w-full justify-center">
                <span className="text-base font-medium">
                  Slothball #{mintData.mintID}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
