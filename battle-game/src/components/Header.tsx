import { WalletSelector } from "./WalletSelector";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export default function Header() {
  return (
    <div className="bg-white z-20 w-full fixed top-0 flex h-20 items-center justify-between px-5">
      <h1>Minter</h1>
      <WalletSelector />
    </div>
  );
}
