import Image from "next/image";
import unknownSothballs from "@/public/assets/unknown_sothballs.png";
import { Button } from "@/src/components/ui/button";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { CommonPageHeader } from "@/src/components/CommonPageHeader";
import { CountDown } from "@/src/components/CountDown";
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
        <div className="space-y-3 px-4 pb-4">
          <div className="bg-bgbutton mx-auto flex h-16 items-center justify-center rounded-xl border-2 border-t-4 border-black px-4 py-2 text-lg font-bold text-slate-600">
            Minted 0/6,666
          </div>
          <div className="mx-auto">
            <div className="bg-bgpink flex flex-col items-center justify-center  rounded-t-xl border-2 border-b-0 border-black px-4 py-2">
              <div className="flex w-full items-center justify-between">
                <span className="font-bold text-white">CoolList</span>
                <span className="rounded-full border-2 border-orange-500 px-4 text-sm font-medium text-orange-500">
                  Not eligible!
                </span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="font-bold text-white">CoolList</span>
                <span className="border-bggreen text-bggreen rounded-full border-2 px-4 text-sm font-medium">
                  You're eligible
                </span>
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <h1 className="font-bold text-white">Mint date</h1>
                <span className="mb-7 text-white">19 April⋅00:00 GMT</span>
                <CountDown />
              </div>

              <div className="mt-3 flex w-full items-center justify-center">
                <Button
                  disabled={true}
                  variant="primary"
                  className="text-black"
                >
                  <MinusOutlined />
                </Button>
                <span className="mx-8 inline-block font-bold text-white">
                  1
                </span>
                <Button variant="primary" className="text-black">
                  <PlusOutlined />
                </Button>
              </div>
              <Button className="my-8 w-full" variant="secondary">
                Mint
              </Button>
            </div>
            <div className="rounded-b-xl border-2 border-t-0 border-b-4 border-black bg-white px-4 py-5 text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Mint price</span>
                <span className="font-black">6.9 APT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">You can mint</span>
                <span className="font-black">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">You minted</span>
                <span className="font-black">-</span>
              </div>
            </div>
          </div>

          <div className="bg-bgpink text-fgpink mx-auto flex h-20 items-center justify-between rounded-xl border-2 border-b-4 border-black px-4 py-2">
            <span className="text-lg font-bold">Publicj mint</span>
            <span>20 April 00:00 GMT</span>
          </div>
        </div>
      </main>
    </>
  );
};
export default MintPage;
