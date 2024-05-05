import "../styles/globals.css";
import "../styles/loading.css";
import "../styles/select-input.css";
import "../styles/markdown.css";
import type { Metadata } from "next";
// import { Footer } from "../components/Footer";
import Header from "../components/Header";
// import Content from "./components/Content";

// WalletProvider
import { WalletProvider } from "../provider/WalletAdapterProvider";
import { BattleEvilProvider } from "../hooks/battleEvilProvider";

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
      <body>
        <WalletProvider>
          <BattleEvilProvider>
            <Header />
            <main className="min-h-screen h-full w-full pt-20">{children}</main>
          </BattleEvilProvider>
        </WalletProvider>
      </body>
    </html>
  );
}

export default WalletSelector;
