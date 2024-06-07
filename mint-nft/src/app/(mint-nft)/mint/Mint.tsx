"use client";
import { useState, useEffect } from "react";
import { MintCard } from "./MintCard";
import { MintCarousel } from "./MIntCarousel";
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
  const [minted, setMinted] = useState(0); // State to store minted count
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
  const [idList, setIdList] = useState([]); // State to store the list of IDs

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
  async function getId(objInfo: string) {
    // const result = await client.getAccountResources(objInfo);
    // console.log("resources:", result);
    const resultResource = await client.getAccountResource(
      objInfo,
      "0x4::token::Token",
    );
    console.log("resource:", resultResource.data.index);
    return resultResource.data.index;
  }
  // in testnet is: 0x541dee79b366288d5c2313377941d3bb6f58f6436b0f943bb7fb0689ca60d641::pre_mint::CoolListInfo
  async function getMintTime(objInfo: string) {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_start_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultStart = (await client.view(payloadStart)) as Array<number>;
    console.log("minstarttime:", resultStart);

    const payloadEnd: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_end_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultEnd = (await client.view(payloadEnd)) as Array<number>;
    console.log("mintendtime:", resultEnd);

    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    if (objInfo === typeCoollistInfo) {
      setMintCoolEndTime(resultEnd[0]);
      setMintCoolStartTime(resultStart[0]);
      if (now >= mintCoolStartTime && now <= mintCoolEndTime) {
        setProgressStatusCoollist(MintProgressStatus.IN_PROGRESS);
      } else if (now > mintCoolEndTime) {
        setProgressStatusCoollist(MintProgressStatus.FINISHED);
      } else {
        setProgressStatusCoollist(MintProgressStatus.NOT_STARTED);
      }
    } else if (objInfo === typePublicInfo) {
      setMintPublicEndTime(resultEnd[0]);
      setMintPublicStartTime(resultStart[0]);
      if (now >= mintPublicStartTime && now <= mintPublicEndTime) {
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
    const canMintAmount = await client.view(payloadStart);
    console.log("canMintAmount:", canMintAmount);
    const canMintAmountNumber = Number(canMintAmount[1]);
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

    const result = await client.view(payload);
    setEligible(result[0]);
  }

  async function getBalance(objInfo: string, addr: any) {
    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::minted_tokens`,
      type_arguments: [objInfo],
      arguments: [addr],
    };

    const result = await client.view(payload);
    console.log("balance:", result);
    // The result is obj id list.
    for (let i = 0; i < result.length; i++) {
      const id = await getId(result[i]);
      setIdList([...idList, id]);
    }
    console.log("idList:", idList);
    // TODO: prop id list to MintCarousel.
    setMinted(result.length);
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
      getBalance(typeCoollistInfo, account.address).catch(console.error);
      getBalance(typePublicInfo, account.address).catch(console.error);
    }
  }, [account]); // Depend on account to re-run when account changes

  // TODO: set the mint start time & mint end time dynamic from the contract.
  useEffect(() => {
    getTotalListCanMinted(typeCoollistInfo);
    getTotalListCanMinted(typePublicInfo);
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
    }
  }, [account]);

  useEffect(() => {
    getId("0x14ddb5c6bc5b1ee4ab8b3984c65e5faac1f3d5cc9a28735a75869323cdb75ac0");
  }, []);

  // --!>

  const [hooray, setHooray] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const skipHandler = () => {
    setHooray(false);
    setOpenDialog(true);
  };
  const mintFinishHandler = () => {
    setHooray(true);
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
          <MintCarousel mintIDs={idList} />
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
            mintPrice={4.2}
            mintable={canCoolMint}
            minted={minted} // Pass minted count to MintCard
            eligible={eligible} // Pass eligibility to MintCard
            mintTime={mintCoolStartTime}
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
            mintPrice={4.2}
            mintable={canPublicMint}
            minted={minted} // Pass minted count to MintCard
            eligible={true}
            mintTime={mintPublicStartTime}
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
