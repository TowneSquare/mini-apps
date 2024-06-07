"use client";
import { useState, useEffect } from "react";
import { MintCard } from "./MintCard";
import { MintCarousel } from "./MIntCarousel";
import { MintPorgress } from "./MintProgress";
import { Hooray } from "./Hooray";
import { MintDoneDialog } from "./DoneDialog";
// Import the new utility functions
// import { isWhitelisted, getBalance, mintStartTime, mintEndTime} from './utils/contractUtils';
// * abstract the contract viewer functions to a single file.

// <!-- smart contract 

import {  APTOS_NODE_URL, DAPP_ADDRESS} from '../../../config/constants';
import { Provider, Types } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// --!>

export const Mint = () => {
  const [eligible, setEligible] = useState(false);  // State to store eligibility status
  const [minted, setMinted] = useState(0);  // State to store minted count
  const [mintStartTime, setMintStartTime] = useState(0);  // State to store mint start time with timestamp.
  const [mintEndTime, setMintEndTime] = useState(0);  // State to store mint start time with timestamp.
  const [isInProgressCoollist, setIsInProgressCoollist] = useState(false);  // State to store minting progress status.
  const [isInProgressPublic, setIsInProgressPublic] = useState(false);  // State to store minting progress status.

  // <!-- smart contract
  const {account } = useWallet();
  console.log("account:", account);
  // const provider = new Provider(Network.TESTNET); 
  // TODO update the network
    const client = new Provider({ fullnodeUrl: APTOS_NODE_URL});
  // const client = new Provider({ fullnodeUrl: APTOS_NODE_URL, indexerUrl: NODE_URL /* not used */ });
  // const client = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);

  const typeCoollistInfo = DAPP_ADDRESS + `::pre_mint::CoolListInfo`;
  const typePublicInfo = DAPP_ADDRESS + `::pre_mint::PublicInfo`;

  // in testnet is: 0x541dee79b366288d5c2313377941d3bb6f58f6436b0f943bb7fb0689ca60d641::pre_mint::CoolListInfo
  async function getMintTime(objInfo: string, ): Promise<number> {
    const payloadStart: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_start_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultStart = await client.view(payloadStart);
    console.log("minstarttime:", resultStart);
    setMintStartTime(resultStart[0]);

    const payloadEnd: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::mint_end_time`,
      type_arguments: [objInfo],
      arguments: [],
    };
    const resultEnd = await client.view(payloadEnd);
    console.log("mintendtime:", resultEnd);
    setMintEndTime(resultEnd[0]);

    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    if (objInfo === typeCoollistInfo) {
      if (now >= mintStartTime && now <= mintEndTime) {
        setIsInProgressCoollist(true);
      } else {
        setIsInProgressCoollist(false);
      }
    } else if (objInfo === typePublicInfo) {
      if (now >= mintStartTime && now <= mintEndTime) {
        setIsInProgressPublic(true);
      } else {
        setIsInProgressPublic(false);
      }
    }
  }

  async function isWhitelisted(addr: any) {
    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::is_whitelisted`,
      type_arguments: [],
      arguments: [addr],
    };

    const result = await client.view(payload);
    setEligible(result[0]);
  }

  async function getBalance(addr: any) {
    const payload: Types.ViewRequest = {
      function: DAPP_ADDRESS + `::pre_mint::minted_tokens`,
      type_arguments: [],
      arguments: [addr],
    };

    const result = await client.view(payload);
    console.log("balance:", result);
    // The result is obj id list.
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
  }, [account]);  // Depend on account to re-run when account changes

  useEffect(() => {
    if (account) {
      getBalance(account.address).catch(console.error);
    }
  }, [account]);  // Depend on account to re-run when account changes

  // TODO: set the mint start time & mint end time dynamic from the contract.
  useEffect(() => {
    getMintTime(typeCoollistInfo);
  }, []); 

  useEffect(() => {
    getMintTime(typePublicInfo);
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
          <MintCarousel />
        </div>
        <div className="space-y-3 px-4 pb-4">
          <MintPorgress />
          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="cool-list"
            minted={minted}  // Pass minted count to MintCard
            eligible={eligible}  // Pass eligibility to MintCard
          />
          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="public-mint"
            minted={minted}  // Pass minted count to MintCard
            // TODO: judge if MintStartCard or MintInprogressCard by the isInProgressCoollist/isInProgressPublic.
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
