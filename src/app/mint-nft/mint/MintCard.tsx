import { CountDown } from "@/src/components/CountDown";
import { Button } from "@/src/components/ui/button";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

export const MintCard: React.FC<{}> = ({}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-t-xl  border-2 border-b-0 border-black bg-bgpink px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-white">CoolList</span>
          <span className="rounded-full border-2 border-orange-500 px-4 text-sm font-medium text-orange-500">
            Not eligible!
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-white">CoolList</span>
          <span className="rounded-full border-2 border-bggreen px-4 text-sm font-medium text-bggreen">
            You're eligible
          </span>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="font-bold text-white">Mint date</h1>
          <span className="mb-7 text-white">19 April⋅00:00 GMT</span>
          <CountDown deadlineTime={new Date("2024-5-19").getTime()} />
        </div>

        <div className="mt-3 flex w-full items-center justify-center">
          <Button disabled={true} variant="primary" className="text-black">
            <MinusOutlined />
          </Button>
          <span className="mx-8 inline-block font-bold text-white">1</span>
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
    </>
  );
};