"use client";
import { useTraitData } from "@/src/hooks";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import { revealTraits } from "@/src/store/trait";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { revealAnimation } from "@/src/utils";

export interface TraitsProps {
  traitName: string;
  traitImage: string;
}
gsap.registerPlugin(useGSAP);
export const RevealCarousel = () => {
  const traits = useAppSelector((state) => state.traitState.traits);

  const dispatch = useAppDispatch();
  const [animate, setAnimate] = useState<boolean>();

  // const SlothBallData = useSlothBallData({
  //   accountAddress: account?.address,
  // });

  // console.log(SlothBallData.data);

  const TraitCard: React.FC<{
    traitTokenId?: string;
    traitName: string;
    id: number;
    revealAnimation: () => void
  }> = ({ traitName, traitTokenId, id, revealAnimation }) => {
    const container = useRef();
    const traitData = useTraitData({
      digitalAssetAddress: traitTokenId,
    });
    const { contextSafe } = useGSAP({ scope: container });
    const onClickGood = contextSafe(() => {
      gsap.to("#ImgBg", {
        rotation: 360,
        transformOrigin: "center",
        ease: "none",
        duration: 10,
        repeat: 1,
      });
      gsap.to("#revealCard", {
        rotateY: 360,
        ease: "none",
        duration: 10,
        repeat: 1,
      });
    });

    const revealedTraits = useAppSelector(
      (state) => state.traitState.revealedTraits,
    );

    
    
     const reveal = revealedTraits.includes(id);
    const revealTrait = () => {
      revealAnimation()
      dispatch(revealTraits(id));
    };

   

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
          <div className="flex flex-col items-center justify-center carousel-item">
            <div className="flex flex-col items-center justify-center mb-4 bg-white border-2 border-b-8 border-black h-80 w-80 rounded-3xl">
              <img
                src={traitData.data?.token_uri ?? ""}
                width={500}
                height={500}
                style={{ objectFit: "contain" }}
                alt={traitName}
              />
            </div>
            <p className="text-2xl font-bold text-white">
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
      <div className="h-full space-x-8 carousel rounded-box">
        {traitDetails.map((trait, index) => (
          <TraitCard
            key={index}
            traitName={trait.traitName}
            traitTokenId={trait.traitTokenId}
            id={index}
            revealAnimation={() => {
              revealAnimation(`${trait.traitName}`)
            }}
          />
        ))}
        <div className="carousel-item mx-2 flex h-80 w-80 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED]">
          <h1 className="text-4xl font-bold text-[#3F5679]">Bonus Trait</h1>
          <p>See it on </p>
          <p>
            Town <span>space</span>
          </p>
        </div>
      </div>
      {/* <button>Compose</button> */}
    </div>
  );
};
