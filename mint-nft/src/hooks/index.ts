import { DAPP_ADDRESS } from "../config/constants";
import { APTOS } from "../config/constants";
import { useQuery } from "@tanstack/react-query";

export * from "./useOffers";
export * from "./useTokens";

export const useMintStartTime = ({ type }: { type?: string }) => {
  const getMintStartTime = async () => {
    if (!type) {
      return;
    }
    const mintStartTime = await APTOS.view({
      payload: {
        function: `${DAPP_ADDRESS}::pre_mint::mint_start_time`,
        typeArguments: [type],
        functionArguments: [],
      },
    });
    return mintStartTime;
  };

  return useQuery({
    queryKey: ["getUserAccumulatedStakeTime", type],
    queryFn: () => getMintStartTime(),
    staleTime: 86400 * 1000,
  });
};

export const useMintEndTime = ({ type }: { type?: string }) => {
  const getMintEndTime = async () => {
    if (!type) {
      return;
    }
    const mintEndTime = await APTOS.view({
      payload: {
        function: `${DAPP_ADDRESS}::pre_mint::mint_start_time`,
        typeArguments: [type],
        functionArguments: [],
      },
    });
    return mintEndTime;
  };

  return useQuery({
    queryKey: ["getUserAccumulatedStakeTime", type],
    queryFn: () => getMintEndTime(),
    staleTime: 86400 * 1000,
  });
};

export const useUserMintThreshold = ({
  type,
  userAddress,
}: {
  type?: string;
  userAddress?: string;
}) => {
  const getUserMintThreshold = async () => {
    if (!type) {
      return;
    }
    if (!userAddress) {
      return;
    }
    const userMintThreshold = (await APTOS.view({
      payload: {
        function: `${DAPP_ADDRESS}::pre_mint::mint_threshold`,
        typeArguments: [type],
        functionArguments: [userAddress],
      },
    })) as Array<number>;
    return userMintThreshold[0];
  };

  return useQuery({
    queryKey: ["getUserMintThreshold", type, userAddress],
    queryFn: () => getUserMintThreshold(),
    staleTime: 86400 * 1000,
  });
};

export const useAllocatedTokenCount = () => {
  const getAllocatedTokenCount = async () => {
    const allocatedTokenCount = (await APTOS.view({
      payload: {
        function: `${DAPP_ADDRESS}::pre_mint::allocated_tokens_count`,
        typeArguments: [],
        functionArguments: [],
      },
    })) as Array<number>;
    return allocatedTokenCount;
  };

  return useQuery({
    queryKey: ["getAllocatedTokenCount"],
    queryFn: () => getAllocatedTokenCount(),
    staleTime: 86400 * 1000,
  });
};
