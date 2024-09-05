import { TRAIT_NAME } from "../app/(battle-game)/reveal/RevealCarousel";
import {
  APTOS,
  SLOTHBALL_COLLECTION_ADDRESS_TESTNET,
} from "../config/constants";
import { useQuery } from "@tanstack/react-query";

export const useSlothBallData = ({
  accountAddress,
}: {
  accountAddress?: string;
}) => {
  const getSlothballData = async () => {
    console.log(SLOTHBALL_COLLECTION_ADDRESS_TESTNET, "ggg");
    if (!accountAddress) {
      return [];
    }
    const res = await APTOS.getAccountOwnedTokensFromCollectionAddress({
      accountAddress: accountAddress,
      collectionAddress: SLOTHBALL_COLLECTION_ADDRESS_TESTNET,
    });

    return res;
  };

  return useQuery({
    queryKey: ["getSlothBallData", accountAddress],
    queryFn: () => getSlothballData(),
    staleTime: Infinity,
  });
};

export const useTraitData = ({
  digitalAssetAddress,
}: {
  digitalAssetAddress?: string;
}) => {
  const getTraitData = async () => {
    if (!digitalAssetAddress) {
      return;
    }
    const res = await APTOS.getDigitalAssetData({
      digitalAssetAddress,
    });

    return res;
  };

  return useQuery({
    queryKey: ["getTraitDetail", digitalAssetAddress],
    queryFn: () => getTraitData(),
  });
};

export const useTraitsDetails = ({
  digitalAssetAddresses,
}: {
  digitalAssetAddresses: Array<{
    traitName: TRAIT_NAME;
    traitTokenId?: string;
  }>;
}) => {
  const getTraitData = async () => {
    if (digitalAssetAddresses.length < 0) {
      return;
    }

    let traitsDetails = [];
    for (let i = 0; i < digitalAssetAddresses.length; i++) {
      let res = await APTOS.getDigitalAssetData({
        digitalAssetAddress: digitalAssetAddresses[i].traitTokenId ?? "",
      });
      traitsDetails.push({
        traitName: digitalAssetAddresses[i].traitName,
        traitUri: res.token_uri,
        tokenName: res.token_name,
      });
    }
    return traitsDetails;
  };

  return useQuery({
    queryKey: ["getTraitsDetails", digitalAssetAddresses],
    queryFn: () => getTraitData(),
  });
};
