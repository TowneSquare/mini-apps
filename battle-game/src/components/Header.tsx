"use client";

import { CloseOutlined } from "@ant-design/icons";
import { WalletSelector } from "./AptosWalletSelector";
import "@/src/styles/wallet-selector.css";
import NavLogoSVG from "@/public/assets/nav-logo.svg";
import { useRouter } from "next/navigation";
import { CommonPageHeader } from "./CommonPageHeader";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="top-0 z-20 flex items-center justify-between w-full h-16 px-3 text-white bg-black">
      <Link
        href="https://www.townesquare.xyz/"
        target="_blank"
        className="flex"
      >
        {/* <CloseOutlined onClick={handleGoBack} className="mr-2" /> */}
        <img src={NavLogoSVG.src} alt="TowneSquare Logo" />
      </Link>
      <WalletSelector />
    </div>
  );
}
