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
    console.log(SLOTHBALL_COLLECTION_ADDRESS_TESTNET,"ggg")
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
    staleTime: Infinity
  });
};

export const useTraitData = ({
  digitalAssetAddress,
}: {
  digitalAssetAddress?: string;
}) => {
  const getTraitData = async () => {
    console.log(SLOTHBALL_COLLECTION_ADDRESS_TESTNET,"ggg")
    if (!digitalAssetAddress) {
      return ;
    }
    const res = await APTOS.getDigitalAssetData({
      digitalAssetAddress
    });

    return res;
  };

  return useQuery({
    queryKey: ["getSlothBallData", digitalAssetAddress],
    queryFn: () => getTraitData(),
  });
};
