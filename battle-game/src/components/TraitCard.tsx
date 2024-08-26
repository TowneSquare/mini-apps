"use client";
import Image from "next/image";
import { useTraitData } from "../hooks";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealTraits } from "@/src/store/trait";

export const TraitCard: React.FC<{
    traitTokenId?: string;
    traitName: string;
    id: number;
    revealAnimation: () => void;
  }> = ({ traitName, traitTokenId, id, revealAnimation }) => {
    const traitData = useTraitData({
      digitalAssetAddress: traitTokenId,
    });
    const dispatch = useAppDispatch();

    const revealedTraits = useAppSelector(
      (state) => state.traitState.revealedTraits,
    );
    const container = useRef(null);
     
    const { contextSafe } = useGSAP({ scope: container });
    const reveal = revealedTraits.map((revealTraitId) => {
      return revealTraitId.traitIndex
    }).includes(id);

    const onClickGood = contextSafe(() => {
      revealAnimation();
    });

    const revealTrait = () => {
      const ImgBg = document.getElementById("ImgBg");
      ImgBg?.classList.add("animate-spin");
      ImgBg?.classList.add("animate-once");
      revealAnimation();
      setTimeout(() => {
        dispatch(revealTraits({
          traitIndex: id,
          traitUri: traitData.data?.token_uri,
        }));
        ImgBg?.classList.remove("animate-spin");
        ImgBg?.classList.remove("animate-once");
      }, 2000);
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

