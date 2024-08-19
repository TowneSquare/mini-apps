import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { Mint } from "./Mint";
import BgMintImg from "@/public/assets/bottom-bg.png";
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
          className="pt-20 bg-bgorange"
          style={{
            backgroundImage: `url(${BgMintImg.src})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"bottom"
          }}
        >
          <Mint />
        </main>
      </CommonPageBannerProvider>
      </>
  );
};
export default MintPage;
