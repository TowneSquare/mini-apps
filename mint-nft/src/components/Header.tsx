"use client";

import { CloseOutlined } from "@ant-design/icons";
import { WalletSelector } from "./AptosWalletSelector";
import "@/src/styles/wallet-selector.css";
import NavLogoSVG from "@/public/assets/nav-logo.svg";
import { useRouter } from "next/navigation";
import { useWalletSelectorModelContext } from "../provider/WalletModelProvider";

export default function Header() {
  const router = useRouter();
  const { isModalOpen, setModalOpen } = useWalletSelectorModelContext();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="fixed top-0 z-20 flex items-center justify-between w-full h-16 px-3 text-white bg-black">
      <div className="flex">
        {/* <CloseOutlined onClick={handleGoBack} className="mr-2"/> */}
        <button onClick={handleGoBack} >
          <img src={NavLogoSVG.src} alt="" />
        </button>
      </div>
      <WalletSelector isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
