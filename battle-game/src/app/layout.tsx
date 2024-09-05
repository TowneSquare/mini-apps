/* eslint-disable camelcase */
import "../styles/globals.css";
import "../styles/loading.css";
import "../styles/select-input.css";
import "../styles/markdown.css";
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
// import { Footer } from "../components/Footer";
import Header from "../components/Header";
// import Content from "./components/Content";
// WalletProvider
import { WalletProvider } from "../provider/WalletAdapterProvider";
import { BattleEvilProvider } from "../hooks/battleEvilProvider";
import type React from "react";
import { WalletSelectorModelProvider } from "../provider/WalletModelProvider";
import QueryProvider from "../provider/QueryProvider";
import ReduxProvider from "../provider/ReduxProvider";

const exo_2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini apps",
  description: "Generated by Mini apps",
};

function WalletSelector({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo_2.className}>
        <ReduxProvider>
          <WalletProvider>
            <WalletSelectorModelProvider>
              <QueryProvider>
                <BattleEvilProvider>
                  <main className="h-full bg-[#4c6299]">
                    <Header />
                    {children}
                  </main>
                </BattleEvilProvider>
              </QueryProvider>
            </WalletSelectorModelProvider>
          </WalletProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default WalletSelector;
