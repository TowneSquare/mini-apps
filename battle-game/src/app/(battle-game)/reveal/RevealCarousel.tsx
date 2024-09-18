"use client";
import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { revealAnimation } from "@/src/utils";
import { Button } from "@/src/components/ui/button";
import { TraitCard } from "@/src/components/TraitCard";
import { useState, useEffect, useRef, useMemo } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { Draggable } from "@/src/components/Draggable";
import towneSqaureLogo from "@/public/assets/townespace_logo.png";
import bonusTrait from "@/public/assets/bonus_trait.svg";
import { useEvent, useMouseWheel } from "react-use";

export interface TraitsProps {
  traitName: string;
  traitImage: string;
}

export enum TRAIT_NAME {
  BACKGROUND = "Background",
  BODY = "Body",
  MOUTH = "Mouth",
  EYES = "Eyes",
  HATS = "Hats",
  CLOTHING = "Clothing",
  BADGES = "Badge",
}
gsap.registerPlugin(ScrollTrigger);

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
  const [flipped, setFlipped] = useState<Array<boolean>>(Array(8).fill(false));
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const mouseWheel = useMouseWheel();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update the scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollLeft = scrollPosition; // Move horizontally based on vertical scroll
  //   }
  // }, [scrollPosition]);

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
      traitName: TRAIT_NAME.CLOTHING,
      traitTokenId: traits?.clothings[0],
    },
    {
      traitName: TRAIT_NAME.HATS,
      traitTokenId: traits?.hats[0],
    },
    {
      traitName: TRAIT_NAME.EYES,
      traitTokenId: traits?.eyes[0],
    },
    {
      traitName: TRAIT_NAME.MOUTH,
      traitTokenId: traits?.mouths[0],
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

  // const TRAITS_DETAILS = [
  //   {
  //     traitName: "BACKGROUND",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Pink.png",
  //     tokenName: "Pink #26",
  //   },
  //   {
  //     traitName: "BODY",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Wheat.png",
  //     tokenName: "Cool Sloth #748",
  //   },
  //   {
  //     traitName: "MOUTH",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Band%20aid.png",
  //     tokenName: "Band aid #31",
  //   },
  //   {
  //     traitName: "EYES",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Checkered%20sunglasses.png",
  //     tokenName: "Checkered sunglasses #23",
  //   },
  //   {
  //     traitName: "Hats",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Laurel%20crown.png",
  //     tokenName: "Laurel crown #32",
  //   },
  //   {
  //     traitName: "CLOTHING",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Aligator%20suit.png",
  //     tokenName: "Aligator suit #30",
  //   },
  //   {
  //     traitName: "BADGES",
  //     traitUri:
  //       "https://bafybeidczv6obpjiky2iircpdpqa4jqn3flzjfbf454in6abmjrnlyekdm.ipfs.w3s.link/Diamond%20hands%20badge.png",
  //     tokenName: "Diamond hands badge #24",
  //   },
  // ];

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
      console.log(traitsUri, account?.address);
      const { ipfsHash, message } = await res.json();
      const URI = `${PINATA_GATEWAY}/${ipfsHash}`;
      // console.log(
      //   traitsUri,
      //   account?.address,
      //   composableObject?.token_data_id,
      //   traitObject,
      //   URI,
      //   "payload",
      // );
      setUri(URI);
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
      setIsComposing(false);
      setComposed(true);
    } catch (error) {
      console.log(error, "compose error");
      setIsComposing(false);
    }
  };
  // console.log(mouseWheel, "mmmm")
  //   useEffect(() => {

  //     ScrollTrigger.create({
  //       trigger: "#carouScroll",
  //       start: "top top",
  //       pin: "#pinned",
  //       end: "+=3500",
  //       onUpdate: () => {
  //         if (carouselRef.current) {
  //           carouselRef.current.scrollLeft = mouseWheel; // Move horizontally based on vertical scroll
  //         }
  //       },
  //     });

  //     // gsap.to("#carouScroll", {
  //     //   xPercent: -100,
  //     //   ease: "none",
  //     //   scrollTrigger: {
  //     //     trigger: "#start",
  //     //     pin: true,
  //     //     scrub: 1,
  //     //     //snap: 1 / (sections.length - 1),
  //     //     // base vertical scrolling on how wide the container is so it feels more natural.
  //     //     end: "+=3500",
  //     //   },
  //     // });

  //     //ScrollTrigger.refresh();
  //   }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (carousel) {
        event.preventDefault(); // Prevent default vertical scroll
        carousel.scrollLeft += event.deltaY; // Scroll horizontally by deltaY
      }
    };

    if (carousel) {
      carousel.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const Ref = useRef(null);

  return (
    <>
      {!composed ? (
        <div
          id="carouScroll"
          className="relative grid h-screen grid-rows-[20vh,80vh]"
        >
          <p className="px-8 mt-5 text-xl font-extrabold text-center text-white md:mt-28 md:text-3xl">
            Reveal and compose your Sloth!
          </p>
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:mt-10">
              <Draggable innerRef={Ref} rootClass="drag">
                <div
                  ref={carouselRef}
                  id="piinned"
                  className="no-scrollbar pl-30 pr-30 flex w-[350px] items-center justify-center overflow-x-scroll md:ml-60 md:mr-64 md:w-[700px] md:px-5"
                >
                  {TRAITS_DETAILS?.length && (
                    <div className="flex w-full h-full space-x-2 overscroll-none rounded-box pr-60 first:pl-24 md:space-x-8 md:first:pl-60">
                      {TRAITS_DETAILS?.map((trait, index) => (
                        <TraitCard
                          key={index}
                          traitName={trait.traitName}
                          tokenName={trait.tokenName}
                          traitUri={trait.traitUri}
                          id={index}
                          revealAnimation={() => {
                            revealAnimation(`${trait.traitName}`);
                            8;
                          }}
                        />
                      ))}
                      <div className="flex flex-col items-center mr-5">
                        <div className="carousel-item mx-1 flex h-60 w-60 flex-col items-center justify-center rounded-3xl border-2 border-b-8 border-black bg-[#C7D6ED] md:h-80 md:w-80">
                          <div className="relative flex items-center  h-56 w-56 flex-col justify-center rounded-3xl border-2 border-[#536A8D]/50 md:h-72 md:w-72">
                            <Image
                              src={bonusTrait}
                              width={113}
                              height={83}
                              alt="Townesquare_logo"
                            />
                            <h1 className="text-2xl font-bold text-[#3F5679] md:text-4xl">
                              Bonus Trait
                            </h1>
                            <p className="mt-6 text-lg font-bold text-[#3F5679]">
                              Coming soon on
                            </p>
                            <Image
                              src={towneSqaureLogo}
                              width={197}
                              height={34}
                              alt="Townesquare_logo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Draggable>
            </div>
            {showComposeButton && (
              <Button
                variant="secondary"
                className="mx-auto mt-5 h-16 w-[328px] animate-fade rounded-xl border-2 border-b-8 border-black bg-[#6BCDCB] text-center text-xl font-bold text-white animate-duration-[2000ms] md:mt-10"
                onClick={() => {
                  composeCoolSloth();
                }}
              >
                {isComposing ? "COMPOSING" : "COMPOSE COOL SLOTH"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative grid h-screen grid-rows-[10vh,75vh]">
          <p className="px-8 mt-10 text-xl font-extrabold text-center text-white md:text-3xl">
            Here is your Sloth! Cool right?
          </p>
          <div className="flex flex-col items-center justify-evenly">
            <div className="flex flex-col items-center justify-center rounded-3xl">
              <Image
                src={uri}
                priority
                width={450}
                height={500}
                alt="CoolSloth"
                style={{
                  objectFit: "contain",
                }}
                className="w-[300px] rounded-3xl md:w-[450px]"
              />
              <p className="mt-2 text-3xl font-extrabold text-center text-white ">
                {composableObject?.token_name}
              </p>
            </div>

            <Button
              variant="secondary"
              className="h-16 w-[348px] animate-fade rounded-xl border-2 border-b-8 border-black bg-[#6BCDCB] text-xl font-bold text-white animate-duration-[2000ms]"
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
        </div>
      )}
    </>
  );
};
