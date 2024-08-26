"use client";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { revealAnimation } from "@/src/utils";
import { Button } from "@/src/components/ui/button";
import { TraitCard } from "@/src/components/TraitCard";
import axios from "axios";
import sharp from "sharp";
import { PinataSDK } from "pinata";
import {
  COMPOSABLE_TOKEN_ENTRY,
  COMPOSABLE_TOKEN_ENTRY_MODULE_ADDRESS_TESTNET,
  EQUIP_TRAITS,
  PINATA_GATEWAY,
  PINATA_JWT,
} from "@/src/config/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export interface TraitsProps {
  traitName: string;
  traitImage: string;
}
gsap.registerPlugin(useGSAP);
const pinata = new PinataSDK({
  pinataJwt: `${PINATA_JWT}`,
  pinataGateway: `${PINATA_GATEWAY}`,
});
export const RevealCarousel = () => {
  const traits = useAppSelector((state) => state.traitState.traits);
  const { account, signAndSubmitTransaction } = useWallet();
  const revealedTraits = useAppSelector(
    (state) => state.traitState.revealedTraits,
  );

  const dispatch = useAppDispatch();

  // const SlothBallData = useSlothBallData({
  //   accountAddress: account?.address,
  // });

  // console.log(SlothBallData.data);

  /// The order of which the traits are arrange are important for composing it, The background first, then the body 
  /// and all order traits can follow
  const traitDetails = [
    {
      traitName: "background",
      traitTokenId: traits?.backgrounds[0],
    },
    {
      traitName: "Body",
      traitTokenId: traits?.cool_sloths[0],
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
      traitName: "Clothing",
      traitTokenId: traits?.clothings[0],
    },
    {
      traitName: "Badges",
      traitTokenId: traits?.badges[0],
    },
  ];

  const showComposeButton = revealedTraits.length == 7;
  const sortedRevealedTraits = revealedTraits.sort((a, b) => a.traitIndex - b.traitIndex)
  const composeCoolSloth = async (traitsUrl: Array<string>) => {
    const downloadPromises = traitsUrl.map(async (traitUrl: string) => {
      try {
        return (await axios({ url: traitUrl, responseType: "arraybuffer" }))
          .data as Buffer;
      } catch (error) {
        console.log(error);
        return Buffer.from("empty.png");
      }
    }) as any as Array<string>;

    const layer = await Promise.all(downloadPromises);
    // const output = await sharp(layer[0])
    //   .composite(layer.map((file) => ({ input: file })))
    //   .png()
    //   .toBuffer();

    // const file = new File([new Blob([output])], "coolsloth");
    // const upload = await pinata.upload.file(file);
    // const URI = `${PINATA_GATEWAY}/${upload.IpfsHash}`;
    // const res = await signAndSubmitTransaction({
    //   sender: account?.address,
    //   data: {
    //     function: `${COMPOSABLE_TOKEN_ENTRY_MODULE_ADDRESS_TESTNET}::${COMPOSABLE_TOKEN_ENTRY}::${EQUIP_TRAITS}`,
    //     typeArguments: [],
    //     functionArguments: [, [], URI],
    //   },
    // });
  };

  return (
    <div className="flex items-center justify-center h-full px-5 overflow-x-scroll md:ml-60 md:mr-64">
      <div className="h-full space-x-8 carousel rounded-box pr-60 first:pl-60">
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
        <div className="flex flex-col items-center">
          <div className="carousel-item mx-2 flex h-80 w-80 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED]">
            <h1 className="text-4xl font-bold text-[#3F5679]">Bonus Trait</h1>
            <p className="mt-6 text-lg text-[#3F5679]">See it on </p>
            <p className="text-lg text-[#3F5679]">
              Town <span className="text-lg italic text-[#9264F8]">space</span>
            </p>
          </div>
          {showComposeButton && (
            <Button
              variant="secondary"
              className="mt-10 h-16 w-[92%] animate-fade rounded-xl border-2 border-b-8 border-black bg-[#6BCDCB] text-xl font-bold text-white animate-duration-[2000ms]"
            >
              COMPOSE COOLSLOTH
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
