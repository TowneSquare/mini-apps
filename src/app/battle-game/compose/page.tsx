import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.png";

export default function ComposePage() {
  return (
    <>
      <header className="fixed z-10 flex h-20 w-full flex-row items-center justify-between px-4 backdrop-blur-sm">
        <Image src={HeaderBg} width={126} height={80} alt="Header" />
        <CloseOutlined className="text-2xl text-white" />
      </header>
      <main
        style={{
          background:
            "radial-gradient(circle closest-side at 50% 40%,#5776b1 8%, #516aa2 60%, #3e4878 172%)",
        }}
        className="relative min-h-screen pt-20 pb-32"
      ></main>
    </>
  );
}
