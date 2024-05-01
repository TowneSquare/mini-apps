import Image from "next/image";
import type { StaticImageData } from "next/image";
import unknownSothballs from "@/public/assets/unknown_sothballs.png";
export interface MintData {
  mintID: string;
  mintImg: StaticImageData;
}
export const MintCarousel: React.FC<{ mintList: MintData[] }> = ({
  mintList,
}) => {
  const hasNoneNft = mintList.length <= 0;
  return (
    <div className="carousel carousel-center rounded-box pb-5">
      <div className="carousel-item">
        <div className="h-[108px] w-[100px]"></div>
      </div>
      {hasNoneNft ? (
        <div className="carousel-item flex flex-col">
          <Image
            className="mx-auto"
            src={unknownSothballs}
            width={205}
            height={219}
            alt="unknown_sothballs"
          />
          <div className="flex h-6 w-full justify-center">
            <span className="text-base font-medium"></span>
          </div>
        </div>
      ) : (
        mintList.map((mintData) => {
          return (
            <div className="carousel-item flex flex-col">
              <Image
                className="mx-auto"
                src={mintData.mintImg}
                width={205}
                height={219}
                alt="sothball"
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
