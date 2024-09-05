"use client";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { revealAnimation } from "@/src/utils";
import { Button } from "@/src/components/ui/button";
import { TraitCard } from "@/src/components/TraitCard";
import { useState } from "react";
import {
  COMPOSABLE_TOKEN_ENTRY,
  COMPOSABLE_TOKEN_ENTRY_MODULE_ADDRESS_TESTNET,
  EQUIP_TRAITS,
  PINATA_GATEWAY,
  PINATA_JWT,
} from "@/src/config/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearRevealedTraits, revealTraits } from "@/src/store/trait";
import { useTraitData, useTraitsDetails } from "@/src/hooks";

export interface TraitsProps {
  traitName: string;
  traitImage: string;
}

export enum TRAIT_NAME {
  BACKGROUND = "BACKGROUND",
  BODY = "BODY",
  MOUTH = "MOUTH",
  EYES = "EYES",
  HATS = "HATS",
  CLOTHING = "CLOTHING",
  BADGES = "BADGES",
}
gsap.registerPlugin(useGSAP);

export const RevealCarousel = () => {
  const traits = useAppSelector((state) => state.traitState.traits);
  const { account, signAndSubmitTransaction } = useWallet();
  const revealedTraits = useAppSelector(
    (state) => state.traitState.revealedTraits,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [composed, setComposed] = useState<boolean>(false);
  const [uri, setUri] = useState<string>("");
  const [isComposing, setIsComposing] = useState(false);

  // const SlothBallData = useSlothBallData({
  //   accountAddress: account?.address,
  // });

  // console.log(SlothBallData.data);

  /// The order of which the traits are arrange are important for composing it, The background first, then the body
  /// and all order traits can follow
  const traitDetails = [
    {
      traitName: TRAIT_NAME.BACKGROUND,
      traitTokenId: traits?.backgrounds[0],
    },
    {
      traitName: TRAIT_NAME.BODY,
      traitTokenId: traits?.cool_sloths[0],
    },
    {
      traitName: TRAIT_NAME.MOUTH,
      traitTokenId: traits?.mouths[0],
    },
    {
      traitName: TRAIT_NAME.EYES,
      traitTokenId: traits?.eyes[0],
    },
    {
      traitName: TRAIT_NAME.HATS,
      traitTokenId: traits?.hats[0],
    },

    {
      traitName: TRAIT_NAME.CLOTHING,
      traitTokenId: traits?.clothings[0],
    },
    {
      traitName: TRAIT_NAME.BADGES,
      traitTokenId: traits?.badges[0],
    },
  ];

  const trait = traitDetails.map((traits) => {
    return useTraitData({ digitalAssetAddress: traits.traitTokenId }).data;
  });

  const TRAITS_DETAILS = useTraitsDetails({
    digitalAssetAddresses: traitDetails,
  }).data;

  const showComposeButton = revealedTraits.length == 7;
  /// NOTE: It is important to sort the array to make sure they are in order for composing
  const sortedRevealedTraits = [...revealedTraits].sort(
    (a, b) => a.traitIndex - b.traitIndex,
  );

  const traitsUri = sortedRevealedTraits.map((traitUri) => {
    return traitUri.traitUri;
  });

  const composableObject = trait
    .map((traitDetails) => {
      return traitDetails;
    })
    .splice(1, 1)[0];

  //    const layers = [
  //   "https://bafybeiafcvv5u3lntqbuuiu35kf6vzktkatprtsqlxwcyjjtl57bijlp7q.ipfs.w3s.link/Zombie.png",
  //   "https://bafybeiafcvv5u3lntqbuuiu35kf6vzktkatprtsqlxwcyjjtl57bijlp7q.ipfs.w3s.link/Ripped%20shirt.png",
  //   "https://bafybeiafcvv5u3lntqbuuiu35kf6vzktkatprtsqlxwcyjjtl57bijlp7q.ipfs.w3s.link/Mingos%20crown.png",
  // ];

  //console.log(, "garri")
  const traitObject = traitDetails
    .filter((traitDetail) => traitDetail.traitName !== TRAIT_NAME.BODY)
    .map((traitId) => {
      return traitId.traitTokenId;
    });

  const composeCoolSloth = async () => {
    setIsComposing(true);
    try {
      const res = await fetch("/api/sharp", {
        method: "POST",
        body: JSON.stringify({
          traitsUri,
          coolSlothName: composableObject?.token_name,
        }),
      });
      console.log(traitsUri);
      const { ipfsHash, message } = await res.json();
      const URI = `${PINATA_GATEWAY}/${ipfsHash}`;
      setUri(URI);
      console.log(ipfsHash, message, URI, "genie");
      const tx = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${COMPOSABLE_TOKEN_ENTRY_MODULE_ADDRESS_TESTNET}::${COMPOSABLE_TOKEN_ENTRY}::${EQUIP_TRAITS}`,
          typeArguments: [],
          functionArguments: [
            composableObject?.token_data_id,
            traitObject,
            URI,
          ],
        },
      });
      setUri(URI);
      setIsComposing(false);
      setComposed(true);
    } catch (error) {
      console.log(error, "compose error");
      setIsComposing(false);
    }
  };

  return (
    <>
      {!composed ? (
        <div className="relative flex flex-col content-center justify-center h-screen my-auto">
          <div>
            <p className="px-8 mt-2 mb-3 text-3xl font-extrabold text-center text-white">
              Reveal and compose your Sloth!
            </p>

            <div className="flex items-center justify-center h-full px-5 overflow-x-scroll md:ml-60 md:mr-64">
              <div className="h-full space-x-8 carousel rounded-box pr-60 first:pl-60">
                {TRAITS_DETAILS?.map((trait, index) => (
                  <TraitCard
                    key={index}
                    traitName={trait.traitName}
                    tokenName={trait.tokenName}
                    traitUri={trait.traitUri}
                    id={index}
                    revealAnimation={() => {
                      revealAnimation(`${trait.traitName}`);
                    }}
                  />
                ))}
                <div className="flex flex-col items-center">
                  <div className="carousel-item mx-2 flex h-80 w-80 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED]">
                    <h1 className="text-4xl font-bold text-[#3F5679]">
                      Bonus Trait
                    </h1>
                    <p className="mt-6 text-lg text-[#3F5679]">See it on </p>
                    <p className="text-lg text-[#3F5679]">
                      Town{" "}
                      <span className="text-lg italic text-[#9264F8]">
                        space
                      </span>
                    </p>
                  </div>
                  {showComposeButton && (
                    <Button
                      variant="secondary"
                      className="mt-10 h-16 w-[92%] animate-fade rounded-xl border-2 border-b-8 border-black bg-[#6BCDCB] text-xl font-bold text-white animate-duration-[2000ms]"
                      onClick={() => {
                        composeCoolSloth();
                      }}
                    >
                      {isComposing ? "COMPOSING" : "COMPOSE COOLSLOTH"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center h-full py-5 justify-evenly">
          <p className="px-8 mt-5 text-3xl font-extrabold text-center text-white bg-center">
            Here is your Sloth! Cool right?
          </p>
          <div className="flex justify-center mt-10 rounded-3xl">
            <Image
              src={uri}
              priority
              width={500}
              height={500}
              alt="CoolSloth"
              style={{
                objectFit: "cover",
              }}
              className="rounded-3xl"
            />
          </div>
          <Button
            variant="secondary"
            className="mt-10 h-16 w-[92%] animate-fade rounded-xl border-2 border-b-8 border-black bg-[#6BCDCB] text-xl font-bold text-white animate-duration-[2000ms] md:w-[50%]"
            onClick={() => {
              router.push("/evolve");
              setTimeout(() => {
                setComposed(false);
                dispatch(clearRevealedTraits());
              }, 5000);
            }}
          >
            CONTINUE
          </Button>
        </div>
      )}
    </>
  );
};
