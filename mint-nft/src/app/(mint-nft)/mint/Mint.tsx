"use client";
import { useState, useEffect } from "react";
import { MintCard } from "./MintCard";
import { MintCarousel, MintData } from "./MIntCarousel";
import { MintPorgress } from "./MintProgress";
import { Hooray } from "./Hooray";
import { MintDoneDialog } from "./DoneDialog";
// Import the new utility functions
// import { isWhitelisted, getBalance, mintStartTime, mintEndTime} from './utils/contractUtils';
// TODO:
// * abstract the contract viewer functions to a single file.
// * get my sloth balls
// * impl can mint.
// * impl mint_threshold.
// <!-- smart contract

import { APTOS_NODE_URL, DAPP_ADDRESS } from "../../../config/constants";
import { Provider, Types } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  useAllocatedTokenCount,
  useMintStartTime,
  useUserMintThreshold,
} from "@/src/hooks";
// --!>
export const enum MintProgressStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED,
}
export const Mint = () => {
  const [eligible, setEligible] = useState(false); // State to store eligibility status
  const [mintedCoollist, setMintedCoollist] = useState(0); // State to store minted count
  const [mintedPublic, setMintedPublic] = useState(0); // State to store minted count
  const [mintPublicStartTime, setMintPublicStartTime] = useState(0); // State to store mint start time with timestamp.
  const [mintPublicEndTime, setMintPublicEndTime] = useState(0); // State to store mint start time with timestamp.
  const [mintCoolStartTime, setMintCoolStartTime] = useState(0); // State to store mint start time with timestamp.
  const [mintCoolEndTime, setMintCoolEndTime] = useState(0); // State to store mint start time with timestamp.
  const [progressStatusCoollist, setProgressStatusCoollist] =
    useState<MintProgressStatus>(MintProgressStatus.NOT_STARTED); // State to store minting progress status.
  const [progressStatusPublic, setProgressStatusPublic] =
    useState<MintProgressStatus>(MintProgressStatus.NOT_STARTED); // State to store minting progress status.
  const [coolListMinted, setCoolListMinted] = useState(0);
  const [publicListMinted, setPublicListMinted] = useState(0);
  const [totalCoolListCanMinted, setTotalCoolListCanMinted] = useState(0);
  const [totalPublicListCanMinted, setTotalPublicListCanMinted] = useState(0);
  const [availableForCoolMint, setAvailableForCoolMint] = useState(0);
  const [availableForPublicMint, setAvailableForPublicMint] = useState(0);
  const [canCoolMint, setCanCoolMint] = useState(0);
  const [canPublicMint, setCanPublicMint] = useState(0);
  const [mintList, setMintList] = useState<MintData[]>([]); // State to store the list of IDs

  const [mintThresholdCoolMint, setMintThresholdCoolMint] = useState(0); // State to store mint threshold
  const [mintThresholdPublicMint, setMintThresholdPublicMint] = useState(0); // State to store mint threshold
  const [coolListMaxMinted, setCoolListMaxMinted] = useState(false);
  const [publicListMaxMinted, setPublicListMaxMinted] = useState(false);
  // <!-- smart contract
  const { account } = useWallet();
  // const provider = new Provider(Network.TESTNET);
  // TODO update the network
  const client = new Provider({ fullnodeUrl: APTOS_NODE_URL });
  // const client = new Provider({ fullnodeUrl: APTOS_NODE_URL, indexerUrl: NODE_URL /* not used */ });
  // const client = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
  const typeCoollistInfo = DAPP_ADDRESS + `::pre_mint::CoolListInfo`;
  const typePublicInfo = DAPP_ADDRESS + `::pre_mint::PublicInfo`;
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

  const mintTokenCount = async () => {
    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::minted_tokens_count`,
      type_arguments: [],
      arguments: [],
    };
    const res = (await client.view(payload)) as Array<number>;
    setCoolListMinted(res[0]);
    setPublicListMinted(res[1]);
  };
  // in testnet is: 0x3f6cb4c8c47c5100c1f365e7ea14ea15f491d92dba82d5f9ce3363d650a99dc8::pre_mint::CoolListInfo
  async function getMintTime(objInfo: string) {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_start_time`,
      type_arguments: [objInfo],
      arguments: [],
    };

    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::minted_tokens_count`,
      type_arguments: [],
      arguments: [],
    };
    const minted_tokens_count = (await client.view(payload)) as Array<number>;

    const resultStart = (await client.view(payloadStart)) as Array<number>;

    const payloadEnd: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_end_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultEnd = (await client.view(payloadEnd)) as Array<number>;

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    if (objInfo === typeCoollistInfo) {
      // setMintCoolEndTime(1717759093);
      // setMintCoolStartTime(1717759093);
      setMintCoolEndTime(resultEnd[0]);
      setMintCoolStartTime(resultStart[0]);
      if (
        now >= resultStart[0] &&
        now <= resultEnd[0] &&
        minted_tokens_count[0] < 6000
      ) {
        setProgressStatusCoollist(MintProgressStatus.IN_PROGRESS);
      } else if (now > resultEnd[0] || minted_tokens_count[0] >= 6000) {
        setProgressStatusCoollist(MintProgressStatus.FINISHED);
      } else {
        setProgressStatusCoollist(MintProgressStatus.NOT_STARTED);
      }
    } else if (objInfo === typePublicInfo) {
      // setMintPublicEndTime(1717759093);
      // setMintPublicStartTime(1717759093);
      setMintPublicEndTime(resultEnd[0]);
      setMintPublicStartTime(resultStart[0]);
      console.log(
        now >= resultStart[0],
        now <= resultEnd[0],
        minted_tokens_count[0],
        publicListMinted,
        "status",
      );
      if (
        (now >= resultStart[0] &&
          now <= resultEnd[0] &&
          minted_tokens_count[1] < 1000) ||
        progressStatusCoollist == MintProgressStatus.FINISHED
      ) {
        setProgressStatusPublic(MintProgressStatus.IN_PROGRESS);
      } else if (now > resultEnd[0] || minted_tokens_count[1] >= 1000) {
        setProgressStatusPublic(MintProgressStatus.FINISHED);
      } else {
        setProgressStatusPublic(MintProgressStatus.NOT_STARTED);
      }
    }
  }

  const getMintProgress = async (objInfo: string) => {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::available_tokens_for_mint`,
      type_arguments: [],
      arguments: [],
    };
    const availableForMint = await client.view(payloadStart);
    const availableForMintNumber = Number(availableForMint[0]);
    if (!isNaN(availableForMintNumber)) {
      if (objInfo === typeCoollistInfo) {
        setAvailableForCoolMint(availableForMintNumber);
      } else if (objInfo === typePublicInfo) {
        setAvailableForPublicMint(availableForMintNumber);
      }
    }
  };
  const getTotalListCanMinted = async (objInfo: string) => {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::initial_token_count`,
      type_arguments: [],
      arguments: [],
    };
    const totalCanMint = await client.view(payloadStart);
    console.log("totalCanMint:", totalCanMint);
    const totalCanMintNumber = Number(totalCanMint[0]);
    if (!isNaN(totalCanMintNumber)) {
      if (objInfo === typeCoollistInfo) {
        setTotalCoolListCanMinted(totalCanMintNumber);
      } else if (objInfo === typePublicInfo) {
        setTotalPublicListCanMinted(totalCanMintNumber);
      }
    }
  };
  const getMintable = async (objInfo: string, addr?: string) => {
    if (addr) {
      const payloadStart: Types.ViewRequest = {
        function: DAPP_ADDRESS + `::pre_mint::can_mint`,
        type_arguments: [objInfo],
        arguments: [addr],
      };
      const [requestSuccess, canMintAmount] = await client.view(payloadStart);
      const canMintAmountNumber = Number(canMintAmount);
      if (!isNaN(canMintAmountNumber)) {
        if (objInfo === typeCoollistInfo) {
          setCanCoolMint(canMintAmountNumber);
        } else if (objInfo === typePublicInfo) {
          setCanPublicMint(canMintAmountNumber);
        }
      }
    } else {
      if (objInfo === typeCoollistInfo) {
        setCanCoolMint(0);
      } else if (objInfo === typePublicInfo) {
        setCanPublicMint(0);
      }
    }
  };
  async function isWhitelisted(addr?: string) {
    if (addr) {
      const payload: Types.ViewRequest = {
        function: DAPP_ADDRESS + `::pre_mint::is_whitelisted`,
        type_arguments: [],
        arguments: [addr],
      };

      const result = (await client.view(payload)) as Array<boolean>;
      setEligible(result[0]);
    } else {
      setEligible(false);
    }
  }

  async function getBalance(addr?: string) {
    if (addr) {
      console.log("addr", addr);
      const payloadCoollist: Types.ViewRequest = {
        function: DAPP_ADDRESS + `::pre_mint::minted_tokens`,
        type_arguments: [typeCoollistInfo],
        arguments: [addr],
      };

      const resultCoollist = (await client
        .view(payloadCoollist)
        .catch(console.log)) as Array<Array<string>> | undefined;

      console.log("balance of coollist:", resultCoollist && resultCoollist[0]);

      const payloadPublic: Types.ViewRequest = {
        function: DAPP_ADDRESS + `::pre_mint::minted_tokens`,
        type_arguments: [typePublicInfo],
        arguments: [addr],
      };

      const resultPublic = (await client
        .view(payloadPublic)
        .catch(console.log)) as Array<Array<string>> | undefined;
      console.log("balance of public:", resultPublic && resultPublic[0]);
      // The result is obj id list.
      const coollistIds = resultCoollist ? resultCoollist[0] : [];
      const publicIds = resultPublic ? resultPublic[0] : [];
      const combinedIds = [...coollistIds, ...publicIds];
      console.log("combinedIds:", combinedIds);
      // Fetch additional details for each ID and update the state.
      const mintDetails = await Promise.all(
        combinedIds.map((id) => getMintDetails(id)),
      );
      setMintList(mintDetails); // Update the state with the new list of IDs.
      console.log("mintDetails:", mintDetails);
      console.log("mintList:", mintList);
      setMintedCoollist(coollistIds.length);
      setMintedPublic(publicIds.length);
    } else {
      setMintedCoollist(0);
      setMintedPublic(0);
      setMintList([]);
    }
  }

  const publicStartTime = useMintStartTime({
    type: typePublicInfo,
  });

  const userCoolistThreshold = useUserMintThreshold({
    type: typeCoollistInfo,
    userAddress: account?.address,
  });
  const userPublicThreshold = useUserMintThreshold({
    type: typePublicInfo,
    userAddress: account?.address,
  });

  const allocatedTokenCount = useAllocatedTokenCount();

  useEffect(() => {
    if (userPublicThreshold.data == canPublicMint) {
      setPublicListMaxMinted(true);
    } else {
      setPublicListMaxMinted(false);
    }
    if (userCoolistThreshold.data == canCoolMint) {
      setCoolListMaxMinted(true);
    } else {
      setCoolListMaxMinted(false);
    }
  }, [canPublicMint, canCoolMint]);

  console.log(
    coolListMaxMinted,
    userCoolistThreshold.data,
    canCoolMint,
    "coolist maxminted",
  );

  useEffect(() => {
    isWhitelisted(account?.address).catch(console.error);
  }, [account]); // Depend on account to re-run when account changes

  useEffect(() => {
    getBalance(account?.address);
  }, [account]); // Depend on account to re-run when account changes

  // Done: set the mint start time & mint end time dynamic from the contract.
  useEffect(() => {
    getTotalListCanMinted(typeCoollistInfo);
    getTotalListCanMinted(typePublicInfo);
  }, []);

  useEffect(() => {
    mintTokenCount();
  }, [account]);

  useEffect(() => {
    getMintTime(typeCoollistInfo);
    getMintTime(typePublicInfo);
  }, []);

  useEffect(() => {
    getMintProgress(typeCoollistInfo);
    getMintProgress(typePublicInfo);
  }, []);

  useEffect(() => {
    getMintable(typeCoollistInfo, account?.address);
    getMintable(typePublicInfo, account?.address);
  }, [account]);

  const refreshPageInfo = () => {
    getTotalListCanMinted(typeCoollistInfo);
    getTotalListCanMinted(typePublicInfo);
    getMintProgress(typeCoollistInfo);
    getMintProgress(typePublicInfo);
    getMintable(typeCoollistInfo, account?.address);
    getMintable(typePublicInfo, account?.address);
    getBalance(account?.address);
    mintTokenCount();
  };
  const [hooray, setHooray] = useState(false);
  const [mintedData, setMintedData] = useState<MintData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const skipHandler = () => {
    setHooray(false);
    setOpenDialog(true);
  };
  const mintFinishHandler = (mintedData: {
    data: Array<MintData>;
    typeName: string;
  }) => {
    setMintedData(mintedData.data);
    setMintList((prev) => [...prev, ...mintedData.data]);
    if (mintedData.typeName === "Cool List") {
      setCoolListMinted((prev) =>
        prev + mintedData.data.length > totalCoolListCanMinted
          ? totalCoolListCanMinted
          : prev + mintedData.data.length,
      );
    } else {
      setPublicListMinted((prev) =>
        prev + mintedData.data.length > totalPublicListCanMinted
          ? totalPublicListCanMinted
          : prev + mintedData.data.length,
      );
    }
    setHooray(true);
    refreshPageInfo();
  };

  console.log(progressStatusPublic, "progressPublic");

  return (
    <>
      <div
        className={
          hooray
            ? "hidden"
            : "m-auto block min-h-[calc(100vh-4rem)] max-w-[500px]"
        }
      >
        {/* <header
          className={`flex h-20 w-full flex-row items-center justify-center px-4 backdrop-blur-sm`}
        >
          <Image src={HeaderBg} width={126} height={80} alt="Header" />
        </header> */}
        <div className="flex flex-col space-y-2 ">
          <div className="px-8">
            <h1 className="text-2xl font-bold break-words">
              Start Your Adventure, Mint a SlothBall!
            </h1>
            <p className="mt-3">
              Soon,your Slothball will grow and evolve, taking on a new form as
              a Sloth!
            </p>
            <h2 className="pl-1 mt-5 text-xl font-semibold">My Slothballs</h2>
          </div>
          {/* <MintCarousel mintList={[]} /> */}
          <MintCarousel mintList={mintList} />
          {/*  */}
        </div>
        <div className="px-4 pb-4 space-y-3">
          
            <MintPorgress
              value={Number(coolListMinted) + Number(publicListMinted)}
              total={
                allocatedTokenCount.data
                  ? Number(allocatedTokenCount.data[0])
                  : 0
              }
            />
          

          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="cool-list"
            progressStatus={progressStatusCoollist} // Pass minting progress status to MintCard
            // progressStatus={MintProgressStatus.IN_PROGRESS} // for test.
            // TODO: set the mint price dynamic from the contract.
            // mintPrice={mintThresholdCoolMint}
            mintPrice={5.4}
            mintable={userCoolistThreshold.data}
            minted={mintedCoollist} // Pass minted count to MintCard
            eligible={eligible} // Pass eligibility to MintCard
            mintStartTime={mintCoolStartTime * 1000}
            mintEndTime={mintCoolEndTime}
            maxMinted={userCoolistThreshold.data == canCoolMint}
            account={account}
          />

          {/* {progressStatusPublic === MintProgressStatus.IN_PROGRESS && (
            <MintPorgress
              value={publicListMinted}
              total={allocatedTokenCount.data ? allocatedTokenCount.data[1] : 0}
            />
          )} */}

          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="public-mint"
            progressStatus={progressStatusPublic} // Pass minting progress status to MintCard
            //progressStatus={MintProgressStatus.IN_PROGRESS} // for test.
            // TODO: set the mint price dynamic from the contract.
            // mintPrice={mintThresholdPublicMint}
            mintPrice={6.9}
            mintable={userPublicThreshold.data}
            minted={mintedPublic} // Pass minted count to MintCard
            eligible={true}
            // change this line if need eligible in public mint * 2.
            mintStartTime={mintPublicStartTime * 1000}
            mintEndTime={mintPublicEndTime}
            maxMinted={userPublicThreshold.data == canPublicMint}
            account={account}
          />
        </div>
        <MintDoneDialog
          setOpen={(open) => {
            setOpenDialog(open);
          }}
          open={openDialog}
          mintedData={mintedData}
        />
      </div>
      {hooray && (
        <div className="m-auto block h-[calc(100vh-9rem)]">
          <Hooray skipHandler={skipHandler} mintedData={mintedData} />
        </div>
      )}
    </>
  );
};
