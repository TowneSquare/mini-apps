import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { Mint } from "./Mint";
import BgMintImg from "@/public/assets/mint_bg.png";

const MintPage = () => {
  return (
    <>
      <CommonPageHeader className="z-10" closeIconColor="text-black" />
      <main
        className="relative bg-bgorange pt-20"
        style={{
          backgroundImage: `url(${BgMintImg.src})`,
          backgroundSize: "cover",
          backgroundColor: "#e1dac4",
        }}
      >
        <Mint />
      </main>
    </>
  );
};
export default MintPage;
