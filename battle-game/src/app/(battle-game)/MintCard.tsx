"use client";
import { CountDown } from "@/src/components/CountDown";
import { Button } from "@/src/components/ui/button";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export interface MintInProgressCardProps {
  mintName: string;
  eligible?: boolean;
  mintTime: number;
  mintPrice?: string;
  minted?: string;
  mintable?: string;
  maxMinted?: boolean;
}
export interface MintCardProps extends MintInProgressCardProps {
  status: "start" | "in-progress" | "completed";
}


// export const MintCard = (props: MintCardProps) => {
//   switch (props.status) {
//     case "start":
//       return <MintStartCard {...props} />;
//     case "in-progress":
//       return <MintInprogressCard {...props} />;
//     case "completed":
//       return <MintCompletedCard {...props} />;
//     default:
//       return null;
//   }
// };

// const MintInprogressCard: React.FC<MintCardProps> = ({
//   mintName,
//   eligible,
//   mintTime,
//   mintPrice,
//   mintable,
//   minted,
//   maxMinted,
// }) => {
//   const isStartMint = mintTime - Date.now() < 0;
//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center px-4 py-2 border-2 border-b-0 border-black rounded-t-xl bg-bgpink">
//         <div className="flex items-center justify-between w-full">
//           <span className="font-bold text-white">{mintName}</span>
//           <span
//             className={
//               `rounded-full border-2 px-4 text-sm font-medium` +
//               ` ${ 
//               eligible
//                 ? maxMinted
//                   ? "border-bggreen bg-bggreen text-white"
//                   : "border-bggreen text-bggreen"
//                 : "border-orange-500 text-orange-500"}`
//             }
//           >
//             {eligible
//               ? maxMinted
//                 ? "Max Minted"
//                 : "You're eligible"
//               : "Not eligible!"}
//           </span>
//         </div>
//         {isStartMint ? (
//           eligible ? (
//             maxMinted ? (
//               <>
//                 <span className="mt-8 text-2xl font-semibold text-white">
//                   WELL DONE!
//                 </span>
//                 <p className="px-5 mt-3 mb-5 text-base font-light text-center text-white">
//                   You've successfully minted all available Slothsballs. Prepare
//                   for the upcoming evolution phase.You'll be notified when it's
//                   time to proceed.
//                 </p>
//               </>
//             ) : (
//               <MintButtonCard
//                 onMintHandle={(mintAmount) => console.log(mintAmount)}
//               />
//             )
//           ) : (
//             <span className="mb-5 text-2xl font-semibold text-white mt-7">
//               Minting is LIVE
//             </span>
//           )
//         ) : (
//           <CountDownCard cardName="Mint date" startTime={mintTime} />
//         )}
//       </div>
//       <div className="px-4 py-5 bg-white border-2 border-t-0 border-b-4 border-black rounded-b-xl text-slate-600">
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">Mint price</span>
//           <span className="font-black">{mintPrice || "-"} APT</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">You can mint</span>
//           <span className="font-black">{mintable || "-"}</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">You minted</span>
//           <span className="font-black">{minted || "-"}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MintStartCard: React.FC<MintCardProps> = ({ mintName, mintTime }) => {
//   const mintTimeFormat = ""

//   return (
//     <div className="flex items-center justify-between h-20 px-4 py-2 mt-3 border-2 border-b-4 border-black rounded-xl bg-bgpink text-fgpink">
//       <span className="text-lg font-bold">{mintName}</span>
//       <span>{mintTimeFormat}</span>
//     </div>
//   );
// };

// const MintCompletedCard: React.FC<MintCardProps> = ({ mintName }) => {
//   return (
//     <div className="flex items-center justify-between h-20 px-4 py-2 mt-3 text-white border-2 border-b-4 border-black rounded-xl bg-bgpink">
//       <span className="text-lg font-bold">{mintName}</span>
//       <span>MINTING IS OVER</span>
//     </div>
//   );
// };
export const CountDownCard: React.FC<{
  startTime: number;
  cardName: string;
  bgcolor?: string;
}> = ({ bgcolor = "bg-black", startTime, cardName }) => {
  const startDate = new Date(startTime).toUTCString().split(" ");
  const startTimeArray = startDate[4].split(":");
  return (
    <div className="flex flex-col items-center justify-center w-full mb-5">
      <h1 className="text-lg font-bold text-white">{cardName}</h1>
      <span className="text-lg font-light text-white mb-7">
        {`${startDate[1]} ${startDate[2]}⋅${startTimeArray[0]}:${startTimeArray[1]} GMT`}
      </span>
      <CountDown deadlineTime={startTime} bgcolor={bgcolor} />
    </div>
  );
};



