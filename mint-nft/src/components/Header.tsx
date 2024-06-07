import { CloseOutlined } from "@ant-design/icons";
import { WalletSelector } from "./AptosWalletSelector";
import "@/src/styles/Wallet-selector.css";
import NavTitlePNG from "@/public/assets/nav-title.png";

export default function Header() {
  return (
    <div className="fixed top-0 z-20 flex h-16 w-full items-center justify-between bg-black px-3 text-white">
      <div className="flex">
        <CloseOutlined />
        <img src={NavTitlePNG.src} alt="" />
      </div>
      <WalletSelector />
    </div>
  );
}
