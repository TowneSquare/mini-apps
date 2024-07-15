import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { Mint } from "./Mint";
import BgMintImg from "@/public/assets/mint_bg.png";
import { CommonPageBannerProvider } from "@/src/provider/CommonPageBannerProvider";

const MintPage = () => {
  return (
    <CommonPageBannerProvider>
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
    </CommonPageBannerProvider>
  );
};
export default MintPage;
