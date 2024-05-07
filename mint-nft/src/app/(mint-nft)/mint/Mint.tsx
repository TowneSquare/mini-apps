"use client";
import { useState } from "react";
import { MintCard } from "./MintCard";
import { MintCarousel } from "./MIntCarousel";
import { MintPorgress } from "./MintProgress";
import { Hooray } from "./Hooray";
import { MintDoneDialog } from "./DoneDialog";
export const Mint = () => {
  const [hooray, setHooray] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const skipHandler = () => {
    setHooray(false);
    setOpenDialog(true);
  };
  const mintFinishHandler = () => {
    setHooray(true);
  };
  return (
    <>
      <div className={hooray ? "hidden" : "block"}>
        <div
          className="flex flex-col space-y-2 "
          style={{
            background:
              "radial-gradient(circle closest-side at 50% 70%,#f5f3ecff 20%, #f0eee4ff 80%, #e1dac4 175%)",
          }}
        >
          <div className="px-8">
            <h1 className="break-words text-2xl font-bold">
              Start Your Adventure,Mint a SlothBall!
            </h1>
            <p className="mt-3">
              Soon,your Slothball will grow and evolve,taking on a new form as a
              Sloth!
            </p>
            <h2 className="mt-5 pl-1 text-xl font-semibold">My Solthballs</h2>
          </div>
          {/* <MintCarousel mintList={[]} /> */}
          <MintCarousel />
        </div>
        <div className="space-y-3 px-4 pb-4">
          <MintPorgress />
          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="cool-list"
          />
          <MintCard
            mintFinishHandler={mintFinishHandler}
            mintCardType="public-mint"
          />
        </div>
        <MintDoneDialog
          setOpen={(open) => {
            setOpenDialog(open);
          }}
          open={openDialog}
        />
      </div>
      <div className={hooray ? "block" : "hidden"}>
        <Hooray skipHandler={skipHandler} />
      </div>
    </>
  );
};
