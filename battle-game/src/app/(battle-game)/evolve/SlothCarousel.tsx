import { SlothsData } from "./page";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useSlothBallData } from "@/src/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRef, useEffect } from "react";
import { DAPP_ADDRESS, MODULE_NAME, APTOS } from "@/src/config/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UserTransactionResponse } from "@/src/types";
import { useDispatch } from "react-redux";
import { updateTrait } from "@/src/store/trait";
import { useRouter } from "next/navigation";
import towneSqaureWhiteLogo from "@/public/assets/townespace_logo_white.png";
import { Draggable } from "@/src/components/Draggable";

export const SlothCarousel = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  const [traits, setTraits] = useState<any>();
  const SlothBallData = useSlothBallData({
    accountAddress: account?.address,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEvolving, setIsEvolving] = useState<string>("");
   const Ref = useRef(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);

  

  const evolve = useMutation({
    mutationFn: async ({ token, id }: { token: string[]; id: string }) => {
      setIsEvolving(id);
      const res = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${DAPP_ADDRESS}::${MODULE_NAME}::unveil`,
          typeArguments: [],
          functionArguments: [token],
        },
      });

      if (res.hash) {
        const result = (await APTOS.waitForTransaction({
          transactionHash: res.hash,
        })) as UserTransactionResponse;
        if (result.success) {
          dispatch(
            updateTrait(
              result.events.find(
                (event) => event.type == `${DAPP_ADDRESS}::unveil::Unveiled`,
              )?.data,
            ),
          );
          router.push("/reveal");
        }
      }
    },
    onSettled: () => {},
    onError: () => {
      setIsEvolving("");
    },
    onSuccess: () => {
      setIsEvolving("");
      queryClient.invalidateQueries({
        queryKey: ["getSlothBallData", account?.address],
      });
    },
  });

  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (carousel) {
        event.preventDefault(); // Prevent default vertical scroll
        carousel.scrollLeft += event.deltaY; // Scroll horizontally by deltaY
      }
    };

    if (carousel) {
      carousel.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  return (
    <section>
      {SlothBallData.data && SlothBallData.data?.length > 0 ? (
        <div>
          <p className="px-8 mb-16 text-3xl font-extrabold text-center text-white mt-14">
            Evolve your Slothballs!
          </p>
          <div className="flex items-center justify-center overflow-x-scroll md:ml-60 md:mr-64">
            <Draggable innerRef={Ref} rootClass="drag">
            <div  ref={carouselRef} className="flex w-screen overflow-x-scroll no-scrollbar rounded-box">
              {SlothBallData.data?.map((slothBall, index) => (
                <div
                  key={slothBall.current_token_data?.token_name}
                  className="flex flex-col items-center justify-between pt-6 pb-3 mx-2 bg-white border-2 border-b-8 border-black carousel-item w-80 rounded-3xl"
                >
                  <div className="relative flex flex-col items-center justify-center mb-5 justify-self-center">
                    <div className="w-64 mb-5 h-72">
                      <img
                        src={slothBall.current_token_data?.token_uri}
                        alt="Sloth"
                      />
                    </div>
                    <span className="text-lg font-semibold">
                      {slothBall.current_token_data?.token_name}
                    </span>
                    <span className="font-semibold text-[#8869ee]">cNFT</span>
                  </div>
                  <Button
                    className="h-14 w-[92%] justify-self-end text-lg"
                    variant="secondary"
                    onClick={() =>
                      evolve.mutate({
                        token: [slothBall.token_data_id],
                        id: String(index),
                      })
                    }
                  >
                    {isEvolving == String(index) ? "Evolving" : "Evolve"}
                  </Button>
                </div>
              ))}
            </div>
            </Draggable>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="px-8 mb-20 text-3xl font-extrabold text-center text-white mt-14">
            Congratulations on evolving all of your Slothballs!
          </p>
          <div className="md:w-[700px] w-[90%] rounded-3xl border-2 border-b-8 border-black bg-black/40 px-6 py-9 md:px-20 md:py-10">
            <p className="mb-5 text-xl font-normal text-center text-white">
              Now, visit{" "}
              <span className="font-bold text-[#6BCDCB]">Townespace</span> to
              reveal the exciting bonus trait you've unlocked.{" "}
            </p>
            <p className="text-xl font-normal text-center text-white">
              Once there, you can compose this bonus trait onto your Sloth and
              make it even more unique!
            </p>
            <div className="flex justify-center mt-12">
              <Image
                src={towneSqaureWhiteLogo}
                width={197}
                height={34}
                alt="Townesquare_logo"
              />
            </div>
            <div className="flex items-center justify-center mt-10 mb-4">
              <Link
              className="h-14 w-[328px] font-bold rounded-lg content-center text-center text-lg border-2 bg-bggreen text-primary-foreground border-black border-b-4 active:border-b-0"
              href="https://townespace.xyz/"
              target="_blank"
            >
              GO TO TOWNESPACE
            </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
