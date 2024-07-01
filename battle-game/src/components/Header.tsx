"use client";

import { CloseOutlined } from "@ant-design/icons";
import { WalletSelector } from "./AptosWalletSelector";
import "@/src/styles/wallet-selector.css";
import NavLogoSVG from "@/public/assets/nav-logo.svg";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-black px-3 text-white">
      <div className="flex">
        <CloseOutlined onClick={handleGoBack} className="mr-2" />
        <img src={NavLogoSVG.src} alt="" />
      </div>
      <WalletSelector />
    </div>
  );
}
