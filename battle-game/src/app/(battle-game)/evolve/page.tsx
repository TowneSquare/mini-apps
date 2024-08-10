"use client";
// import SlothRight2Img from "@/public/assets/home/sloth_right2.png";
import BgFallImg from "@/public/assets/battle-game/bg-fall.png";
import type { StaticImageData } from "next/image";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { SlothCarousel } from "./SlothCarousel";
import { APTOS_NODE_URL, DAPP_ADDRESS } from "../../../config/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Provider, Types } from "aptos";
import { useEffect, useState } from "react";
import { useSlothBallData } from "@/src/hooks";

export type SlothData = {
  slothImg: StaticImageData | string;
  id: string;
  composed?: true;
};
export type SlothsData = SlothData[];

export default function EvolvePage() {
  const { account } = useWallet();
  console.log("account:", account);
  const client = new Provider({ fullnodeUrl: APTOS_NODE_URL });
  const typeCoollistInfo = `${DAPP_ADDRESS}::pre_mint::CoolListInfo`;
  const typePublicInfo = `${DAPP_ADDRESS}::pre_mint::PublicInfo`;
  const [mintList, setMintList] = useState<SlothsData>([]); // State to store the list of IDs

  async function getMintDetails(objInfo: string) {
    const result = await client.getAccountResources(objInfo);
    console.log("resources:", result);
    const mintDetail: SlothData = { id: "", slothImg: "" };
    result.forEach((resource) => {
      if (resource.type === "0x4::token::TokenIdentifiers") {
        mintDetail.id = (
          resource as unknown as { data: { index: { value: string } } }
        ).data.index.value;
      }
      if (resource.type === "0x4::token::Token") {
        mintDetail.slothImg = (
          resource as unknown as { data: { uri: string } }
        ).data.uri;
      }
    });
    return mintDetail;
  }
  async function getBalance(addr: string) {
    console.log("addr", addr);
    const payload: Types.ViewRequest = {
      function: `${DAPP_ADDRESS}::pre_mint::minted_tokens`,
      type_arguments: [typeCoollistInfo],
      arguments: [addr],
    };

    const result = (await client.view(payload)) as Array<Array<string>>;
    console.log("balance of coollist:", result[0]);

    const payloadPublic: Types.ViewRequest = {
      function: `${DAPP_ADDRESS}::pre_mint::minted_tokens`,
      type_arguments: [typePublicInfo],
      arguments: [addr],
    };

    const resultPublic = (await client.view(payloadPublic)) as Array<
      Array<string>
    >;
    console.log("balance of public:", resultPublic[0]);
    // The result is obj id list.
    const combinedIds = [...result[0], ...resultPublic[0]];
    console.log("combinedIds:", combinedIds);
    // Fetch additional details for each ID and update the state.
    const idDetails = await Promise.all(
      combinedIds.map((id) => getMintDetails(id)),
    );
    setMintList(idDetails); // Update the state with the new list of IDs.
    console.log("idDetails:", idDetails);
    console.log("idList:", mintList);
  }
  useEffect(() => {
    if (account) {
      getBalance(account.address).catch(console.error);
    }
  }, [account]); // Depend on account to re-run when account changes

  // const mockMintList: SlothsData = [
  //   { slothImg: "", id: "3229" },
  //   { slothImg: "", id: "3230" },
  //   { slothImg: "", id: "3231" },
  //   { slothImg: "", id: "3232" },
  //   { slothImg: "", id: "3233" },
  // ];

  // console.log(SlothBallData.data, "snas")
  return (
    <>
      <main
        style={{
          background: `url(${BgFallImg.src}),radial-gradient(circle closest-side at 50% 40%,#5776b1 8%, #516aa2 60%, #3e4878 172%)`,
          backgroundSize: "contain",
        }}
        className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-cover pb-2"
      >
        <CommonPageHeader className="z-10" />
        <p className="px-8 mt-20 mb-3 text-3xl font-extrabold text-center text-white">
          Evolve your Slothballs!
        </p>
        <SlothCarousel />
      </main>
    </>
  );
}
