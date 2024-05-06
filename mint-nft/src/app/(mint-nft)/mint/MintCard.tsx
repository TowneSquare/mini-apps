"use client";
import { CountDown } from "@/src/components/CountDown";
import { Button } from "@/src/components/ui/button";
import { API_URL } from "@/src/config/constants";
import { fetcher } from "@/src/lib/utils";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
type MintType = "cool-list" | "public-mint";
export interface MintCardProps {
  mintName: string;
  eligible?: boolean;
  mintTime: number;
  mintPrice?: string;
  minted?: string;
  mintable?: string;
  maxMinted?: boolean;
}
const CardLoading = () => {
  return (
    <div className="flex h-20 w-full items-center justify-center">
      <span className="loading loading-spinner loading-md"></span>
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
}> = ({ mintCardType }) => {
  if (mintCardType == "cool-list") {
    const mintInfoUrl = API_URL + "?app_name=mint_app&key=cool_mint_time";
    const { data, error, isLoading } = useSWR(mintInfoUrl, fetcher);
    if (isLoading) {
      return <CardLoading />;
    }
    if (error) {
      <CardLoadingError />;
    }
    console.log(data);
    const propsData = {
      eligible: true,
      mintName: "Cool List",
      mintPrice: "6.9",
      mintable: "-",
      minted: "-",
      mintTime: Number(data.value),
    };

    return <MintInprogressCard {...propsData} />;

    // return <MintCompletedCard {...propsData} />;
  } else if (mintCardType == "public-mint") {
    const mintInfoUrl = API_URL + "?app_name=mint_app&key=public_mint_time";
    const { data, error, isLoading } = useSWR(mintInfoUrl, fetcher);
    if (isLoading) {
      return <CardLoading />;
    }
    if (error) {
      <CardLoadingError />;
    }
    console.log(data);
    const propsData = {
      mintName: "Public Mint",
      mintTime: Number(data.value),
    };
    return <MintStartCard {...propsData} />;
  } else {
    return <CardLoadingError />;
  }
};

const MintInprogressCard: React.FC<MintCardProps> = ({
  mintName,
  eligible,
  mintTime,
  mintPrice,
  mintable,
  minted,
  maxMinted,
}) => {
  const isStartMint = mintTime - Date.now() < 0;
  const router = useRouter();
  const mintActionHandler = (mintAmount:number) => {
    console.log(mintAmount);
    router.push("/hooray");
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center rounded-t-xl  border-2 border-b-0 border-black bg-bgpink px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-white">{mintName}</span>
          <span
            className={
              "rounded-full border-2 px-4 text-sm font-medium" +
              " " +
              (eligible
                ? maxMinted
                  ? "border-bggreen bg-bggreen text-white"
                  : "border-bggreen text-bggreen"
                : "border-orange-500 text-orange-500")
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
                onMintHandle={(mintAmount) => mintActionHandler(mintAmount)}
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
      <div className="rounded-b-xl border-2 border-t-0 border-b-4 border-black bg-white px-4 py-5 text-slate-600">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Mint price</span>
          <span className="font-black">{mintPrice ? mintPrice : "-"} APT</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">You can mint</span>
          <span className="font-black">{mintable ? mintable : "-"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold">You minted</span>
          <span className="font-black">{minted ? minted : "-"}</span>
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
  onMintHandle: (mintAmount: number) => void;
}> = ({ onMintHandle }) => {
  const [mintAmount, setMintAmount] = useState(0);
  return (
    <>
      <div className="mt-3 flex w-full items-center justify-center">
        <Button
          onClick={() => {
            setMintAmount(mintAmount - 1);
          }}
          disabled={mintAmount <= 0}
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
        onClick={() => onMintHandle(mintAmount)}
        className="my-8 w-full"
        variant="secondary"
      >
        Mint
      </Button>
    </>
  );
};
export const getStartTime = (startTime: number) => {
  const startDate = new Date(startTime).toUTCString().split(" ");
  const startTimeArray = startDate[4].split(":");
  return `${startDate[1]} ${startDate[2]}⋅${startTimeArray[0]}:${startTimeArray[1]} GMT`;
};
