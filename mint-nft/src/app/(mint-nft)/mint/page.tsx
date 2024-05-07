import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { Mint } from "./Mint";

const MintPage = () => {
  return (
    <>
      <CommonPageHeader className="z-10" closeIconColor="text-black" />
      <main className="min-h-[calc(100vh-5rem)] relative bg-bgorange pt-20">
        <Mint />
      </main>
    </>
  );
};
export default MintPage;
