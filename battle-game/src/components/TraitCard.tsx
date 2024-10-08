"use client";
import Image from "next/image";
import { useTraitData } from "../hooks";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { revealTraits } from "@/src/store/trait";
import csLogo from "@/public/assets/cs_logo.svg";

export const TraitCard: React.FC<{
  tokenName?: string;
  traitName: string;
  id: number;
  revealAnimation: () => void;
  traitUri?: string;
}> = ({ traitName, tokenName, traitUri, id, revealAnimation }) => {
  // const traitData = useTraitData({
  //   digitalAssetAddress: traitTokenId,
  // });
  const dispatch = useAppDispatch();
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState<boolean>(true);

  const revealedTraits = useAppSelector(
    (state) => state.traitState.revealedTraits,
  );
  const container = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });
  const reveal = revealedTraits
    .map((revealTraitId) => {
      return revealTraitId.traitIndex;
    })
    .includes(id);

  const onClickGood = contextSafe(() => {
    revealAnimation();
  });

  const handleImageLoad = () => {
    setLoaded(false);
  };

  const revealTrait = () => {
    // const ImgBg = document.getElementById("ImgBg");
    // ImgBg?.classList.add("animate-spin");
    // ImgBg?.classList.add("animate-once");
    //revealAnimation()

    dispatch(
      revealTraits({
        traitIndex: id,
        traitUri: traitUri,
        traitName: tokenName,
      }),
    );
  };

  useEffect(() => {
    if (!loaded) {
      revealAnimation();
    }
  }, [loaded]);

  return (
    <div>
      {!reveal ? (
        <div
          onClick={revealTrait}
          className={`carousel-item relative flex h-60 w-60 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED] hover:cursor-pointer hover:bg-[#B7CBEB] md:mx-2 md:h-80 md:w-80`}
        >
          <div className="relative flex  h-56 w-56 flex-col justify-center rounded-3xl border-2 border-[#536A8D]/50 md:h-72 md:w-72">
            <h1 className="text-center text-2xl font-bold text-[#3F5679] md:text-4xl">
              {traitName}
            </h1>
            <div className="absolute flex justify-center w-full bottom-5">
              <Image
                width={100}
                height={100}
                src={csLogo}
                alt="Cool Sloth Logo"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex">
          {loaded && (
            <div
              className={`carousel-item relative flex h-60 w-60 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED] hover:bg-[#B7CBEB] md:mx-2 md:h-80 md:w-80`}
            >
              <div className="relative flex  h-56 w-56 flex-col justify-center rounded-3xl border-2 border-[#536A8D]/50 md:h-72 md:w-72">
                <h1 className="text-center text-2xl font-bold text-[#3F5679] md:text-4xl">
                  {traitName}
                </h1>
                <div className="absolute flex justify-center w-full bottom-5">
                  <Image
                    width={100}
                    height={100}
                    src={csLogo}
                    alt="Cool Sloth Logo"
                  />
                </div>
              </div>
              <div
                className="absolute flex items-center justify-center w-full h-full"
                role="status"
              >
                <svg
                  aria-hidden="true"
                  className="h-16 w-14 animate-spin fill-[#21385B] text-transparent"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          )}
          <div
            className={`${loaded ? "hidden" : "block"} carousel-item flex w-full flex-col items-center justify-center md:mx-2`}
            id={`${traitName}`}
            style={{
              transform: "rotateY(0deg)",
            }}
          >
            <div className="flex flex-col items-center justify-center w-56 h-56 mb-4 bg-white border-2 rounded-3xl md:h-80 md:w-80">
              <Image
                onLoad={handleImageLoad}
                src={traitUri ?? ""}
                width={400}
                height={500}
                style={{ objectFit: "contain" }}
                alt={traitName}
                priority
                className="rounded-3xl"
              />
            </div>
            <p className="font-bold text-white texplaceholder:t-xl md:text-2xl opacity-1">
              {tokenName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
