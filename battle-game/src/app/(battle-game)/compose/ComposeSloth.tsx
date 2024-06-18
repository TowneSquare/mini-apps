"use client";
import { Button } from "@/src/components/ui/button";
import { ComposeList } from "./ComposeList";
import { SlothItem } from "./page";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import ComposedImg from "@/public/assets/compose/composed.png";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { APTOS_NODE_URL, DAPP_ADDRESS } from "@/src/config/constants";
import { Provider } from "aptos";

export const ComposeSloth = ({ slothItems }: { slothItems: SlothItem[] }) => {
  const [composed, setcomposed] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();
  const client = new Provider({ fullnodeUrl: APTOS_NODE_URL });

  const router = useRouter();
  const params = useParams();
  const composeSloth = async () => {
    if (!account) return [];

    const transaction: InputTransactionData = {
      data: {
        function: `${DAPP_ADDRESS}::todolist::create_list`,
        functionArguments: [params.slothID],
      },
    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await client.waitForTransaction(response.hash);
      setcomposed(true);
    } catch (error: any) {
      console.log("composeSloth error", error);
      setcomposed(false);
    }
  };
  return (
    <>
      <div
        style={{ opacity: composed ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[calc(100vw-2rem)] w-[calc(100vw-2.5rem)] overflow-hidden rounded-xl border border-black opacity-0 transition-opacity duration-500"
      >
        <Image src={ComposedImg} fill objectFit="cover" alt="sloth" />
      </div>
      <div
        style={{
          display: composed ? "none" : "block",
          height: composed ? "0" : "auto",
        }}
      >
        <ComposeList slothItems={slothItems} />
      </div>

      <Button
        style={{ opacity: composed ? 0 : 1 }}
        className="fixed bottom-0 left-0 right-0 mx-auto mb-8 h-14 w-[calc(100%-4rem)] text-lg transition-opacity duration-500"
        variant="secondary"
        onClick={composeSloth}
      >
        COMPOSE cNFT
      </Button>

      <Button
        disabled={!composed}
        style={{ opacity: composed ? 1 : 0 }}
        className="fixed bottom-0 left-0 right-0 mx-auto mb-8 h-14 w-[calc(100%-4rem)] text-lg transition-opacity duration-500"
        variant="secondary"
        onClick={() => router.push("/evolve")}
      >
        CONTINUE
      </Button>
    </>
  );
};
