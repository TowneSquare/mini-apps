import "../styles/globals.css";
import "../styles/loading.css";
import "../styles/select-input.css";
import '../styles/markdown.css';

import { Footer } from "../components/Footer";
import Header from "../components/Header";
import type { AppProps } from "next/app";
// import Content from "./components/Content";

// wallet adapter
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

import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";

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




function WalletSelector({ Component, pageProps }: AppProps) {

  return (
    <div>
      {/* <WalletConnector /> */}
      {/* <WalletProvider wallets={wallets} autoConnect={false}> */}
      <AptosWalletAdapterProvider
        plugins={theWallets}
        autoConnect={false}
        onError={(error) => {
          console.log("Custom error handling", error);
        }}
      >
        <Header />
        <br></br>
        <div className="px-8">
        <Component {...pageProps} className="bg-base-300" />
        </div>
      </AptosWalletAdapterProvider>
    {/* <Footer /> */}
    </div>
    
  );
}

export default WalletSelector;
