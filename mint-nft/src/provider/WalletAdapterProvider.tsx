"use client";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// wallets
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";


// import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
// define the wallets
const theWallets = [new PetraWallet(), new PontemWallet(),new OKXWallet(), new MartianWallet(),];
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AptosWalletAdapterProvider
      plugins={theWallets}
      optInWallets={["Petra", "Pontem Wallet"]}
      autoConnect={false}
      onError={(error) => {
        console.log("Custom error handling", error);
      }}
    >
      {/* <WalletConnector />
  <WalletProvider wallets={wallets} autoConnect={false}> */}
      {children}
    </AptosWalletAdapterProvider>
  );
};
