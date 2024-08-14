"use client";
import { useTraitData } from "@/src/hooks";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import { revealTraits } from "@/src/store/trait";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { removeSpaceAndHash, revealAnimation } from "@/src/utils";
import Image from "next/image";

export interface TraitsProps {
  traitName: string;
  traitImage: string;
}
gsap.registerPlugin(useGSAP);
export const RevealCarousel = () => {
  const traits = useAppSelector((state) => state.traitState.traits);

  const dispatch = useAppDispatch();

  // const SlothBallData = useSlothBallData({
  //   accountAddress: account?.address,
  // });

  // console.log(SlothBallData.data);

  const TraitCard: React.FC<{
    traitTokenId?: string;
    traitName: string;
    id: number;
    revealAnimation: () => void;
  }> = ({ traitName, traitTokenId, id, revealAnimation }) => {
    const traitData = useTraitData({
      digitalAssetAddress: traitTokenId,
    });

    const revealedTraits = useAppSelector(
      (state) => state.traitState.revealedTraits,
    );
    const container = useRef(null);
    const { contextSafe } = useGSAP({ scope: container });
    const reveal = revealedTraits.includes(id);

    const onClickGood = contextSafe(() => {
      revealAnimation();
    });

    const revealTrait = () => {
    revealAnimation();
      setTimeout(() => {
        dispatch(revealTraits(id));
      }, 10000);
    };

    // useGSAP(
    //   () => {
    //     // gsap code here...
    //     //let split = new SplitText("#traitName", {type: "chars"});
    //     if(!traitData.data?.token_name){
    //       return
    //     }
    //     gsap.to(`#${removeSpaceAndHash(traitData.data?.token_name)}`, {
    //       opacity: 1,
    //       duration: 10,
    //       stagger: 0.2,
    //       ease: "back.out",
    //     });
    //     // <-- automatically reverted
    //   },
    //   { scope: container },
    // ); // <-- scope is for selector text (optional)

    return (
      <div>
        {!reveal ? (
          <div
            id={`${traitName}`}
            onClick={revealTrait}
            className="carousel-item mx-2 flex h-80 w-80 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED]"
          >
            <h1 className="text-4xl font-bold text-[#3F5679]">{traitName}</h1>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full mx-2 carousel-item"
            ref={container}
          >
            <div className="flex flex-col items-center justify-center mb-4 bg-white border-2 border-b-8 border-black h-80 w-80 rounded-3xl">
              <Image
                src={traitData.data?.token_uri ?? ""}
                width={500}
                height={500}
                style={{ objectFit: "contain" }}
                alt={traitName}
                priority
              />
            </div>
            <p className="text-2xl font-bold text-white opacity-1">
              {traitData.data?.token_name}
            </p>
          </div>
        )}
      </div>
    );
  };

  const traitDetails = [
    {
      traitName: "background",
      traitTokenId: traits?.backgrounds[0],
    },
    {
      traitName: "Mouth",
      traitTokenId: traits?.mouths[0],
    },
    {
      traitName: "Eyes",
      traitTokenId: traits?.eyes[0],
    },
    {
      traitName: "Hats",
      traitTokenId: traits?.hats[0],
    },
    {
      traitName: "Body",
      traitTokenId: traits?.cool_sloths[0],
    },
    {
      traitName: "Clothing",
      traitTokenId: traits?.clothings[0],
    },
    {
      traitName: "Badges",
      traitTokenId: traits?.badges[0],
    },
  ];


  return (
    <div className="flex items-center justify-center h-full px-5 overflow-x-scroll md:ml-60 md:mr-64">
      <div className="h-full space-x-8 carousel pr-60 rounded-box first:pl-60">
        {traitDetails.map((trait, index) => (
          <TraitCard
            key={index}
            traitName={trait.traitName}
            traitTokenId={trait.traitTokenId}
            id={index}
            revealAnimation={() => {
              revealAnimation(`${trait.traitName}`);
            }}
          />
        ))}
        <div className="carousel-item mx-2 flex h-80 w-80 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED]">
          <h1 className="text-4xl font-bold text-[#3F5679]">Bonus Trait</h1>
          <p className="mt-6 text-lg text-[#3F5679]">See it on </p>
          <p className="text-lg text-[#3F5679]">
            Town <span className="text-lg italic text-[#9264F8]">space</span>
          </p>
        </div>
      </div>
      {/* <button>Compose</button> */}
    </div>
  );
};
