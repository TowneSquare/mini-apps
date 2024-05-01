import Image from "next/image";
import unknownSothballs from "@/public/assets/unknown_sothballs.png";
import { Button } from "@/src/components/ui/button";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { CountDown } from "@/src/components/CountDown";
import { MintCardComponent } from "./MintCard";
const MintPage = () => {
  return (
    <>
      <CommonPageHeader closeIconColor="text-black" />
      <main className="bg-bgorange pt-20">
        <div
          className="flex flex-col space-y-2 px-8 pb-8"
          style={{
            background:
              "radial-gradient(circle closest-side at 50% 70%,#f5f3ecff 20%, #f0eee4ff 80%, #e1dac4 175%)",
          }}
        >
          <h1 className="break-words text-2xl font-bold">
            Start Yuour Adventure,Mint a SlothBall!
          </h1>
          <p>
            Soon,your Slothball will grow and evolve,taking on a new form as a
            Sloth!
          </p>
          <h2 className="text-xl font-semibold">My Solthballs</h2>

          <Image
            className="mx-auto"
            src={unknownSothballs}
            width={205}
            height={219}
            alt="unknown_sothballs"
          />
        </div>
        <div className="px-4 pb-4">
          <div className="mb-3 flex h-16 items-center justify-center rounded-xl border-2 border-t-4 border-black bg-bgbutton px-4 py-2 text-lg font-bold text-slate-600">
            Minted 0/6,666
          </div>

          <MintCardComponent />

          <div className="mt-3 flex h-20 items-center justify-between rounded-xl border-2 border-b-4 border-black bg-bgpink px-4 py-2 text-fgpink">
            <span className="text-lg font-bold">Public mint</span>
            <span>20 April 00:00 GMT</span>
          </div>
        </div>
      </main>
    </>
  );
};
export default MintPage;
