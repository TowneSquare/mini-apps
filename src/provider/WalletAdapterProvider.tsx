"use client";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
// wallets
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MSafeWalletAdapter } from "msafe-plugin-wallet-adapter";
import { NightlyWallet } from "@nightlylabs/aptos-wallet-adapter-plugin";
import { OpenBlockWallet } from "@openblockhq/aptos-wallet-adapter";
import { TokenPocketWallet } from "@tp-lab/aptos-wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { WelldoneWallet } from "@welldone-studio/aptos-wallet-adapter";
// import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
// define the wallets
const theWallets = [
  new PetraWallet(),
  new PontemWallet(),
  new RiseWallet(),
  new FewchaWallet(),
  new MartianWallet(),
  new MSafeWalletAdapter(),
  new NightlyWallet(),
  new OpenBlockWallet(),
  new TokenPocketWallet(),
  new TrustWallet(),
  new WelldoneWallet(),
];
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AptosWalletAdapterProvider
      plugins={theWallets}
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
