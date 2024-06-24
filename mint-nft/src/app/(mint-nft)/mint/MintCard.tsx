"use client";
import { CountDown } from "@/src/components/CountDown";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/src/config/constants";
import { fetcher } from "@/src/lib/utils";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import useSWR from "swr";

// <!-- smart contract

import { DAPP_ADDRESS, APTOS_NODE_URL } from "../../../config/constants";
import { Provider, Types, Network } from "aptos";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { MintProgressStatus } from "./Mint";
import { useWalletSelectorModelContext } from "@/src/provider/WalletModelProvider";
import { MintData } from "./MIntCarousel";
// --!>

type MintType = "cool-list" | "public-mint";
export interface MintCardProps {
  mintName: string;
  eligible?: boolean;
  mintTime: number;
  mintPrice?: number;
  minted?: number;
  mintable?: number;
  maxMinted?: boolean;
}
export interface MintInProgressCardProps extends MintCardProps {
  mintFinishHandler: (mintedData: {
    data: Array<MintData>;
    typeName: string;
  }) => void;
}
const CardLoading = () => {
  return (
    <div className="flex h-20 w-full items-center justify-center">
      <span className="loading loading-spinner loading-md" />
    </div>
  );
};
const CardLoadingError = () => {
  return (
    <div
      className="</div> flex h-20 w-full items-center
justify-center"
    >
      <span> Failed to load</span>
    </div>
  );
};
export const MintCard: React.FC<{
  mintCardType: MintType;
  mintFinishHandler: (mintedData: {
    data: Array<MintData>;
    typeName: string;
  }) => void;
  eligible: boolean;
  mintPrice: number;
  mintable: number;
  minted: number; // Add eligible to the props
  progressStatus: MintProgressStatus;
  mintTime: number;
}> = ({
  mintCardType,
  mintFinishHandler,
  eligible,
  mintPrice,
  mintable,
  minted,
  progressStatus,
  mintTime,
}) => {
  if (mintCardType === "cool-list") {
    // const mintInfoUrl = `${API_URL}?app_name=mint_app&key=cool_mint_time`;
    // const { data, error, isLoading } = useSWR(mintInfoUrl, fetcher);
    // if (isLoading) {
    //   return <CardLoading />;
    // }
    // if (error) {
    //   <CardLoadingError />;
    // }
    const propsData = {
      eligible, // Use the eligible passed from props
      mintName: "Cool List",
      mintPrice,
      mintable,
      minted,
      mintTime,
      mintFinishHandler,
    };
    if (progressStatus === MintProgressStatus.IN_PROGRESS) {
      return <MintInprogressCard {...propsData} />;
    } else if (progressStatus === MintProgressStatus.FINISHED) {
      return <MintCompletedCard {...propsData} />;
    } else if (progressStatus === MintProgressStatus.NOT_STARTED) {
      return <MintStartCard {...propsData} />;
    } else {
      return <MintStartCard {...propsData} />;
    }

    // return <MintCompletedCard {...propsData} />;
  } else if (mintCardType === "public-mint") {
    // const mintInfoUrl = `${API_URL}?app_name=mint_app&key=public_mint_time`;
    // const { data, error, isLoading } = useSWR(mintInfoUrl, fetcher);
    // if (isLoading) {
    //   return <CardLoading />;
    // }
    // if (error) {
    //   <CardLoadingError />;
    // }
    // console.log(data);
    const propsData = {
      eligible, // Use the eligible passed from props
      mintName: "Public Mint",
      mintPrice,
      mintable,
      minted,
      mintTime,
      mintFinishHandler,
    };
    if (progressStatus === MintProgressStatus.IN_PROGRESS) {
      return <MintInprogressCard {...propsData} />;
    } else if (progressStatus === MintProgressStatus.FINISHED) {
      return <MintCompletedCard {...propsData} />;
    } else if (progressStatus === MintProgressStatus.NOT_STARTED) {
      return <MintStartCard {...propsData} />;
    } else {
      return <MintStartCard {...propsData} />;
    }
  } else {
    return <CardLoadingError />;
  }
};

const MintInprogressCard: React.FC<MintInProgressCardProps> = ({
  mintName,
  eligible,
  mintTime,
  mintPrice,
  mintable,
  minted,
  maxMinted,
  mintFinishHandler,
}) => {
  const isStartMint = mintTime - Date.now() < 0;
  const mintActionHandler = (mintedData: {
    data: Array<MintData>;
    typeName: string;
  }) => {
    console.log(mintedData);
    mintFinishHandler(mintedData);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center rounded-t-xl  border-2 border-b-0 border-black bg-bgpink px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-white">{mintName}</span>
          <span
            className={
              `rounded-full border-2 px-4 text-sm font-medium` +
              ` ${
                eligible
                  ? maxMinted
                    ? "border-bggreen bg-bggreen text-white"
                    : "border-bggreen text-bggreen"
                  : "border-orange-500 text-orange-500"
              }`
            }
          >
            {eligible
              ? maxMinted
                ? "Max Minted"
                : "You're eligible"
              : "Not eligible!"}
          </span>
        </div>
        {isStartMint ? (
          eligible ? (
            maxMinted ? (
              <>
                <span className="mt-8 text-2xl font-semibold text-white">
                  WELL DONE!
                </span>
                <p className="mb-5 mt-3 px-5 text-center text-base font-light text-white">
                  You've successfully minted all available Slothsballs. Prepare
                  for the upcoming evolution phase.You'll be notified when it's
                  time to proceed.
                </p>
              </>
            ) : (
              <MintButtonCard
                onMintHandle={(mintedData) => mintActionHandler(mintedData)}
                mintName={mintName}
              />
            )
          ) : (
            <span className="mb-5 mt-7 text-2xl font-semibold text-white">
              Minting is LIVE
            </span>
          )
        ) : (
          <CountDownCard cardName="Mint date" startTime={mintTime} />
        )}
      </div>
      <div className="rounded-b-xl border-2 border-b-4 border-t-0 border-black bg-white px-4 py-5 text-slate-600">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Mint price</span>
          <span className="font-black">{mintPrice || "-"} APT</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">You can mint</span>
          <span className="font-black">
            {mintable || mintable == 0 ? mintable : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">You minted</span>
          <span className="font-black">
            {minted || minted === 0 ? minted : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

const MintStartCard: React.FC<MintCardProps> = ({ mintName, mintTime }) => {
  const mintTimeFormat = getStartTime(mintTime);

  return (
    <div className="mt-3 flex h-20 items-center justify-between rounded-xl border-2 border-b-4 border-black bg-bgpink px-4 py-2 text-fgpink">
      <span className="text-lg font-bold">{mintName}</span>
      <span>{mintTimeFormat}</span>
    </div>
  );
};

const MintCompletedCard: React.FC<MintCardProps> = ({ mintName }) => {
  return (
    <div className="mt-3 flex h-20 items-center justify-between rounded-xl border-2 border-b-4 border-black bg-bgpink px-4 py-2 text-white">
      <span className="text-lg font-bold">{mintName}</span>
      <span>MINTING IS OVER</span>
    </div>
  );
};
export const CountDownCard: React.FC<{
  startTime: number;
  cardName: string;
  bgcolor?: string;
}> = ({ bgcolor = "bg-black", startTime, cardName }) => {
  const startTimeFormat = getStartTime(startTime);
  return (
    <div className="mb-5 flex w-full flex-col items-center justify-center">
      <h1 className="text-lg font-bold text-white">{cardName}</h1>
      <span className="mb-7 text-lg font-light text-white">
        {startTimeFormat}
      </span>
      <CountDown deadlineTime={startTime} bgcolor={bgcolor} />
    </div>
  );
};

const MintButtonCard: React.FC<{
  onMintHandle: (minteData: {
    data: Array<MintData>;
    typeName: string;
  }) => void;
  mintName: string;
}> = ({ onMintHandle, mintName }) => {
  const [mintAmount, setMintAmount] = useState(1);
  console.log("mintName", mintName);
  let typeArg = "";
  if (mintName === "Cool List") {
    typeArg = DAPP_ADDRESS + "::pre_mint::CoolListInfo";
  } else {
    typeArg = DAPP_ADDRESS + "::pre_mint::PublicInfo";
  }
  // <!-- smart contract
  const { signAndSubmitTransaction, account } = useWallet();
  const { isModalOpen, setModalOpen } = useWalletSelectorModelContext();
  const client = new Provider({ fullnodeUrl: APTOS_NODE_URL });
  async function getMintDetails(objInfo: string) {
    const result = await client.getAccountResources(objInfo);
    console.log("resources:", result);
    const mintDetail: MintData = { mintID: "", mintImg: "" };
    result.forEach((resource) => {
      if (resource.type === "0x4::token::TokenIdentifiers") {
        mintDetail.mintID = (
          resource as unknown as { data: { index: { value: string } } }
        ).data.index.value;
      }
      if (resource.type === "0x4::token::Token") {
        mintDetail.mintImg = (
          resource as unknown as { data: { uri: string } }
        ).data.uri;
      }
    });
    return mintDetail;
  }
  async function mintNFT(amount: number) {
    if (account) {
      const eventTypeInfo = DAPP_ADDRESS + `::pre_mint::TokenMinted`;

      const transaction: InputTransactionData = {
        data: {
          function: `${DAPP_ADDRESS}::pre_mint::mint_sloth_ball`,
          typeArguments: [typeArg],
          functionArguments: [amount],
        },
      };

      const response = await signAndSubmitTransaction(transaction);
      console.log(response);
      const tx = (await client.getTransactionByHash(response.hash)) as {
        events: Array<{ type: string; data: { token: string[] } }>;
      };

      // for test
      // "0x4ce548a927683c1bcedeebd21464451c940d24c37cea89abc88549aa34c18f17"
      // "0xa622c59596fab424732118bc29db90a3751da255ca86d03ed652ada828713b9f"
      // const tx = (await client.getTransactionByHash(
      //   "0x4ce548a927683c1bcedeebd21464451c940d24c37cea89abc88549aa34c18f17",
      // )) as { events: Array<{ type: string; data: { token: string[]} }> };
      console.log(tx);
      const events = tx.events;
      const mintedData: Array<MintData> = [];
      if (events && events.length > 0) {
        await Promise.all(
          events.map(async (event) => {
            if (event.type === eventTypeInfo) {
              const mintIDs = event.data.token;
              await Promise.all(
                mintIDs.map(async (mintID) => {
                  const mintDetail = await getMintDetails(mintID);
                  mintedData.push(mintDetail);
                }),
              );
            }
          }),
        );
      }
      console.log("mintedData", mintedData);
      onMintHandle({ data: mintedData, typeName: mintName });
    } else {
      if (isModalOpen === false) {
        setModalOpen && setModalOpen(true);
      }
    }
  }
  return (
    <>
      <div className="mt-3 flex w-full items-center justify-center">
        <Button
          onClick={() => {
            setMintAmount(mintAmount - 1);
          }}
          disabled={mintAmount <= 1}
          variant="primary"
          className="text-black"
        >
          <MinusOutlined />
        </Button>
        <span className="mx-8 inline-block font-bold text-white">
          {mintAmount}
        </span>
        <Button
          onClick={() => {
            setMintAmount(mintAmount + 1);
          }}
          variant="primary"
          className="text-black"
        >
          <PlusOutlined />
        </Button>
      </div>
      <Button
        onClick={() => mintNFT(mintAmount)}
        className="my-8 w-full"
        variant="secondary"
      >
        Mint
      </Button>
    </>
  );
};
export const getStartTime = (startTime: number) => {
  console.log("starttime", startTime);
  // Convert seconds to milliseconds if the timestamp is not in the correct time range
  const date = new Date(startTime * 1000);
  const utcString = date.toUTCString();
  const parts = utcString.split(" ");
  const timeParts = parts[4].split(":");
  return `${parts[1]} ${parts[2]}⋅${timeParts[0]}:${timeParts[1]} GMT`;
};
