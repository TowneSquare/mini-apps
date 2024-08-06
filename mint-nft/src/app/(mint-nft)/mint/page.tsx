import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { Mint } from "./Mint";
import BgMintImg from "@/public/assets/mint_bg.png";
import { CommonPageBannerProvider } from "@/src/provider/CommonPageBannerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/src/components/Header";


const MintPage = () => {
  return (
    <>
      <Header/>
      <CommonPageBannerProvider>
        <CommonPageHeader className="z-10" closeIconColor="text-black" />
        <main
          className="relative pt-20 bg-bgorange"
          style={{
            backgroundImage: `url(${BgMintImg.src})`,
            backgroundSize: "cover",
            backgroundColor: "#e1dac4",
          }}
        >
          <Mint />
        </main>
      </CommonPageBannerProvider>
      </>
  );
};
export default MintPage;
