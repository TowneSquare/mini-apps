"use client";

import { CloseOutlined } from "@ant-design/icons";
import { WalletSelector } from "./AptosWalletSelector";
import "@/src/styles/wallet-selector.css";
import NavLogoSVG from "@/public/assets/nav-logo.svg";
import { useRouter } from "next/navigation";
import { CommonPageHeader } from "./CommonPageHeader";
import Link from "next/link";
import { useAppSelector } from "../store/hooks";

export default function Header() {
  const router = useRouter();
   const headerState = useAppSelector(
    (state) => state.appState.headerState,
  );

  console.log(headerState, "hhh")
  const handleGoBack = () => {
    router.push("/");
  };
  return (
    <div
      className={`${headerState ? "hidden" : "block"} top-0 z-20 flex h-16 w-full md:flex items-center justify-between bg-black px-3 text-white`}
    >
      <Link className="flex" href="/">
        {/* <CloseOutlined onClick={handleGoBack} className="mr-2" /> */}
        <img src={NavLogoSVG.src} alt="TowneSquare Logo" />
      </Link>
      <WalletSelector />
    </div>
  );
}
