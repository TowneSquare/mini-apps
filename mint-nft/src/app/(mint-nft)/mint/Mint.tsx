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

  // <!-- smart contract
  const { account } = useWallet();
  console.log("account:", account);
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
    // const resultIDResource = await client.getAccountResource(
    //   objInfo,
    //   "0x4::token::TokenIdentifiers",
    // );
    // console.log("resource:", resultResource.data.index.value);

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

  async function getMintThreshold(objInfo: string) {
    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_threshold`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const res = (await client.view(payload)) as Array<number>;
    console.log("mintthres:", res[0]);
    if (objInfo === typeCoollistInfo) {
      setMintThresholdCoolMint(res[0]);
    } else {
      console.log("mintthrespub:", res[0]);
      setMintThresholdPublicMint(res[0]);
    }
  }
  // in testnet is: 0x3f6cb4c8c47c5100c1f365e7ea14ea15f491d92dba82d5f9ce3363d650a99dc8::pre_mint::CoolListInfo
  async function getMintTime(objInfo: string) {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_start_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultStart = (await client.view(payloadStart)) as Array<number>;
    console.log("mint start time of ", objInfo + ": " + resultStart);

    const payloadEnd: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_end_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultEnd = (await client.view(payloadEnd)) as Array<number>;
    console.log("mint end time of ", objInfo + ": " + resultEnd);

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    if (objInfo === typeCoollistInfo) {
      // setMintCoolEndTime(1717759093);
      // setMintCoolStartTime(1717759093);
      setMintCoolEndTime(resultEnd[0]);
      setMintCoolStartTime(resultStart[0]);
      console.log("now:", now);
      console.log("mintCoolEndTime:", resultEnd[0]);
      if (now >= resultStart[0] && now <= resultEnd[0]) {
        setProgressStatusCoollist(MintProgressStatus.IN_PROGRESS);
      } else if (now > mintCoolEndTime) {
        setProgressStatusCoollist(MintProgressStatus.FINISHED);
      } else {
        setProgressStatusCoollist(MintProgressStatus.NOT_STARTED);
      }
    } else if (objInfo === typePublicInfo) {
      // setMintPublicEndTime(1717759093);
      // setMintPublicStartTime(1717759093);
      setMintPublicEndTime(resultEnd[0]);
      setMintPublicStartTime(resultStart[0]);
      if (now >= resultStart[0] && now <= resultEnd[0]) {
        setProgressStatusPublic(MintProgressStatus.IN_PROGRESS);
      } else if (now > mintPublicEndTime) {
        setProgressStatusPublic(MintProgressStatus.FINISHED);
      } else {
        setProgressStatusPublic(MintProgressStatus.NOT_STARTED);
      }
    }
  }
  const getMintProgress = async (objInfo: string) => {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::available_tokens_for_mint`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const availableForMint = await client.view(payloadStart);
    console.log("availableForMint:", availableForMint);
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
      function: DAPP_ADDRESS + `::pre_mint::total_tokens_for_mint`,
      type_arguments: [objInfo],
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
  const getMintable = async (objInfo: string, addr: string) => {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::can_mint`,
      type_arguments: [objInfo],
      arguments: [addr],
    };
    const [requestSuccess, canMintAmount] = await client.view(payloadStart);
    console.log(
      "requestSuccess",
      requestSuccess,
      "canMintAmount:",
      canMintAmount,
    );
    const canMintAmountNumber = Number(canMintAmount);
    if (!isNaN(canMintAmountNumber)) {
      if (objInfo === typeCoollistInfo) {
        setCanCoolMint(canMintAmountNumber);
      } else if (objInfo === typePublicInfo) {
        setCanPublicMint(canMintAmountNumber);
      }
    }
  };
  async function isWhitelisted(addr: any) {
    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::is_whitelisted`,
      type_arguments: [],
      arguments: [addr],
    };

    const result = (await client.view(payload)) as Array<boolean>;
    setEligible(result[0]);
  }

  async function getBalance(addr: string) {
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
  }

  // useEffect(() => {
  //   if (account) {
  //     isWhitelisted(account.address)
  //       .then(isEligible => {
  //         setEligible(isEligible);
  //         console.log("isEligible:", isEligible);
  //   })
  //       .catch(console.error);
  //   }
  // }, [account]);

  // useEffect(() => {
  //   if (account) {
  //     getBalance(account.address)
  //       .then(mintCount => setMinted(mintCount))
  //       .catch(console.error);
  //   }
  // }, [account]);
  useEffect(() => {
    if (account) {
      isWhitelisted(account.address).catch(console.error);
    }
  }, [account]); // Depend on account to re-run when account changes

  useEffect(() => {
    if (account) {
      getBalance(account.address);
      // getBalance(typePublicInfo, account.address).catch(console.error);
    }
  }, [account]); // Depend on account to re-run when account changes

  // Done: set the mint start time & mint end time dynamic from the contract.
  useEffect(() => {
    getTotalListCanMinted(typeCoollistInfo);
    getTotalListCanMinted(typePublicInfo);
  }, []);

  useEffect(() => {
    getMintThreshold(typeCoollistInfo);
    getMintThreshold(typePublicInfo);
  }, []);

  useEffect(() => {
    getMintTime(typeCoollistInfo);
    getMintTime(typePublicInfo);
  }, []);

  useEffect(() => {
    setCoolListMinted(totalCoolListCanMinted - availableForCoolMint);
    setPublicListMinted(totalPublicListCanMinted - availableForPublicMint);
  }, [
    totalCoolListCanMinted,
    totalPublicListCanMinted,
    availableForCoolMint,
    availableForPublicMint,
  ]);

  useEffect(() => {
    getMintProgress(typeCoollistInfo);
    getMintProgress(typePublicInfo);
  }, []);

  useEffect(() => {
    if (account) {
      getMintable(typeCoollistInfo, account.address);
      getMintable(typePublicInfo, account.address);
    }
  }, [account]);

  // useEffect(() => {
  //   getMintDetails("0x14ddb5c6bc5b1ee4ab8b3984c65e5faac1f3d5cc9a28735a75869323cdb75ac0");
  // }, []);

  // --!>

  const [hooray, setHooray] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const skipHandler = () => {
    setHooray(false);
    setOpenDialog(true);
  };
  const mintFinishHandler = () => {
    setHooray(true);
    if (account) {
      getBalance(account.address);
    }
  };
  return (
    <>
      <div className={hooray ? "hidden" : "block"}>
        <div
          className="flex flex-col space-y-2 "
          style={{
            background:
              "radial-gradient(circle closest-side at 50% 70%,#f5f3ecff 20%, #f0eee4ff 80%, #e1dac4 175%)",
          }}
        >
          <div className="px-8">
            <h1 className="break-words text-2xl font-bold">
              Start Your Adventure,Mint a SlothBall!
            </h1>
            <p className="mt-3">
              Soon,your Slothball will grow and evolve,taking on a new form as a
              Sloth!
            </p>
            <h2 className="mt-5 pl-1 text-xl font-semibold">My Solthballs</h2>
          </div>
          {/* <MintCarousel mintList={[]} /> */}
          <MintCarousel mintList={mintList} />
          {/*  */}
        </div>
        <div className="space-y-3 px-4 pb-4">
          {progressStatusCoollist === MintProgressStatus.IN_PROGRESS && (
            <MintPorgress
              value={coolListMinted}
              total={totalCoolListCanMinted}
            />
          )}

          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="cool-list"
            progressStatus={progressStatusCoollist} // Pass minting progress status to MintCard
            // progressStatus={MintProgressStatus.IN_PROGRESS} // for test.
            // TODO: set the mint price dynamic from the contract.
            // mintPrice={mintThresholdCoolMint}
            mintPrice={4.2}
            mintable={canCoolMint}
            minted={mintedCoollist} // Pass minted count to MintCard
            eligible={eligible} // Pass eligibility to MintCard
            mintTime={mintCoolStartTime}
            // mintTime={1717759093}
          />

          {progressStatusPublic === MintProgressStatus.IN_PROGRESS && (
            <MintPorgress
              value={publicListMinted}
              total={totalPublicListCanMinted}
            />
          )}

          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="public-mint"
            progressStatus={progressStatusPublic} // Pass minting progress status to MintCard
            // progressStatus={MintProgressStatus.IN_PROGRESS} // for test.
            // TODO: set the mint price dynamic from the contract.
            // mintPrice={mintThresholdPublicMint}
            mintPrice={6.9}
            mintable={canPublicMint}
            minted={mintedPublic} // Pass minted count to MintCard
            eligible={true}
            // change this line if need eligible in public mint * 2.
            mintTime={mintPublicStartTime}
            // mintTime={1717759093}
          />
        </div>
        <MintDoneDialog
          setOpen={(open) => {
            setOpenDialog(open);
          }}
          open={openDialog}
        />
      </div>
      <div className={hooray ? "block" : "hidden"}>
        <Hooray skipHandler={skipHandler} />
      </div>
    </>
  );
};
