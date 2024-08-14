import { SlothsData } from "./page";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useSlothBallData } from "@/src/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DAPP_ADDRESS, MODULE_NAME, APTOS } from "@/src/config/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UserTransactionResponse } from "@/src/types";
import { useDispatch } from "react-redux";
import { updateTrait } from "@/src/store/trait";
import { useRouter } from "next/navigation";



export const SlothCarousel = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();
  const [traits, setTraits] = useState<any>();
  const SlothBallData = useSlothBallData({
    accountAddress: account?.address,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(SlothBallData.data);
  // const evolve = async () => {
  //   const res = await signAndSubmitTransaction({
  //     sender: accountAddress,
  //     data: {
  //       function: `${DAPP_ADDRESS}::${MODULE_NAME}::unveil`,
  //       typeArguments: [],
  //       functionArguments: [tokens],
  //     },
  //   });
  // }

  const evolve = useMutation({
    mutationFn: async (token: string[]) => {
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
                (event) =>
                  event.type ==
                  `${DAPP_ADDRESS}::unveil::Unveiled`,
              )?.data,
            ),
          );
          router.push("/reveal");
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getSlothBallData", account?.address],
      });
    },
  });
  return (
    // <div className="flex-1 max-w-md px-8 py-2 space-x-4 bg-transparent carousel carousel-center">
    //   {sloths.map((sloth) => {
    //     if (sloth.composed) {
    //       return (
    //         <div
    //           key={sloth.id}
    //           className="flex flex-col items-center justify-between pt-6 pb-3 bg-white border-2 border-b-8 border-black carousel-item w-80 rounded-3xl"
    //         >
    //           <div className="flex flex-col items-center justify-center justify-self-start">
    //             <span className="text-3xl font-black">Your Sloth</span>
    //             <span className="mt-2 text-xl font-semibold">
    //               Sloth #{sloth.id}
    //             </span>
    //           </div>
    //           <div className="flex flex-col items-center justify-center mb-5 justify-self-center">
    //             <div className="relative w-64 h-72">
    //               <Image
    //                 src={sloth.slothImg}
    //                 fill
    //                 objectFit="contain"
    //                 alt="Sloth"
    //               />
    //             </div>
    //             <span className="font-semibold text-[#8869ee]">cNFT</span>
    //           </div>
    //           <div className="flex flex-col items-center justify-center mb-2 justify-self-end">
    //             <span>Edit your cNFT on</span>
    //             <span className="font-extrabold text-bggreen">
    //               townespase.xyz
    //             </span>
    //           </div>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div
    //           key={sloth.id}
    //           className="flex flex-col items-center justify-between pt-6 pb-3 bg-white border-2 border-b-8 border-black carousel-item w-80 rounded-3xl"
    //         >
    //           <div className="flex flex-col items-center justify-center justify-self-start">
    //             <span className="text-3xl font-black">Congratulations</span>
    //             <span className="mt-2 text-xl font-semibold">you minted</span>
    //           </div>
    //           <div className="relative flex flex-col items-center justify-center mb-5 justify-self-center">
    //             <div className="w-64 mb-5 h-72">
    //               <Image
    //                 src={sloth.slothImg}
    //                 fill
    //                 objectFit="contain"
    //                 alt="Sloth"
    //               />
    //             </div>
    //             <span className="text-lg font-semibold">
    //               Slothball #{sloth.id}
    //             </span>
    //             <span className="font-semibold text-[#8869ee]">cNFT</span>
    //           </div>
    //           <Button
    //             className="h-14 w-[92%] justify-self-end text-lg"
    //             variant="secondary"
    //           >
    //             <Link href={`/compose?slothID=${sloth.id}`}>EVOLVE</Link>
    //           </Button>
    //         </div>
    //       );
    //     }
    //   })}
    // </div>
    <div className="flex items-center justify-center overflow-x-scroll md:ml-60 md:mr-64">
      <div className="carousel rounded-box">
        {SlothBallData.data?.map((slothBall) => (
         
          <div
            key={slothBall.current_token_data?.token_name}
            className="flex flex-col items-center justify-between pt-6 pb-3 mx-2 bg-white border-2 border-b-8 border-black carousel-item w-80 rounded-3xl"
          >
            {/* <div className="flex flex-col items-center justify-center justify-self-start">
          <span className="text-3xl font-black">Congratulations</span>
          <span className="mt-2 text-xl font-semibold">you minted</span>
        </div> */}
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
              onClick={() => evolve.mutate([slothBall.token_data_id])}
            >
              EVOLVE
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
