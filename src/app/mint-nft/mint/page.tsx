import Image from "next/image";
import sothballs from "@/public/assets/home/sloth_left2.png";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { MintCard } from "./MintCard";
import { MintCarousel, MintData } from "./MIntCarousel";
import { MintPorgress } from "./MintProgress";
const MintPage = () => {
  const mintList: MintData[] = [
    { mintID: "666", mintImg: sothballs },
    { mintID: "667", mintImg: sothballs },
    { mintID: "668", mintImg: sothballs },
  ];
  return (
    <>
      <CommonPageHeader closeIconColor="text-black" />
      <main className="bg-bgorange pt-20">
        <div
          className="flex flex-col space-y-2 "
          style={{
            background:
              "radial-gradient(circle closest-side at 50% 70%,#f5f3ecff 20%, #f0eee4ff 80%, #e1dac4 175%)",
          }}
        >
          <div className="px-8">
            <h1 className="break-words text-2xl font-bold">
              Start Yuour Adventure,Mint a SlothBall!
            </h1>
            <p className="mt-3">
              Soon,your Slothball will grow and evolve,taking on a new form as a
              Sloth!
            </p>
            <h2 className="mt-5 pl-1 text-xl font-semibold">My Solthballs</h2>
          </div>
          <MintCarousel mintList={[]} />
          <MintCarousel mintList={mintList} />
        </div>
        <div className="space-y-3 px-4 pb-4">
          <MintPorgress total={6666} value={190} />

          <MintCard
            status={"start"}
            mintName="Cool List"
            mintTime={new Date("2024-5-19").getTime()}
          />

          <MintCard
            status={"in-progress"}
            mintName="Cool List"
            mintTime={new Date("2024-5-19").getTime()}
            mintPrice="6.9"
            mintable="-"
            minted="-"
          />

          <MintCard
            eligible={true}
            status={"in-progress"}
            mintName="Cool List"
            mintTime={new Date("2024-4-19").getTime()}
            mintPrice="6.9"
            mintable="-"
            minted="-"
          />
          <MintCard
            eligible={true}
            status={"in-progress"}
            maxMinted={true}
            mintName="Cool List"
            mintTime={new Date("2024-4-19").getTime()}
            mintPrice="6.9"
            mintable="-"
            minted="-"
          />
          <MintCard
            eligible={false}
            status={"in-progress"}
            mintName="Cool List"
            mintTime={new Date("2024-4-19").getTime()}
            mintPrice="6.9"
            mintable="-"
            minted="-"
          />
          <MintCard
            status={"completed"}
            mintName="Cool List"
            mintTime={new Date("2024-5-20").getTime()}
          />
          <MintCard
            status={"start"}
            mintName="Public Mint"
            mintTime={new Date("2024-5-20").getTime()}
          />
        </div>
      </main>
    </>
  );
};
export default MintPage;
