import { useEffect, useState } from "react";
import { CountDownCard } from "./MintCard";

export const BattleCard: React.FC<{
  eligible?: boolean;
  gameStartTime: number;
  evolveNumber?: number;
  connected: boolean;
}> = ({ eligible, gameStartTime, evolveNumber, connected }) => {
  const [isStartTime, setIsStarttime] = useState<boolean>(true);
  useEffect(() => {
    const isStartGame = gameStartTime > Math.floor(Date.now());
    setIsStarttime(isStartGame);
  }, [Math.floor(Date.now())]);

  return (
    <>
      {isStartTime ? (
        <div className="z-[2] mx-auto mb-5 w-11/12 rounded-xl md:w-[40%]">
          <div className="rounded-t-xl bg-[#29294f] px-4 pt-2">
            <div className="flex items-center justify-between w-full h-12">
              <span className="text-lg font-bold text-white">Battle</span>
              {connected && (
                <span
                  className={
                    "rounded-full border-2  px-4 text-base font-medium " +
                    " " +
                    (eligible
                      ? "border-bggreen text-bggreen"
                      : "border-orange-500 text-orange-500")
                  }
                >
                  {eligible ? "You're eligible" : "Not eligible!"}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center justify-center w-full px-3 h-60">
              <CountDownCard
                cardName="Battle starts"
                startTime={gameStartTime}
                bgcolor="bg-[#555372]"
              />
            </div>
          </div>
          <div className="px-4 py-5 bg-white rounded-b-xl">
            <span className="font-semibold text-[#424242]">
              After the battle
            </span>

            <div className="flex items-center justify-between mt-2 text-lg">
              <span className="font-black">Evolve</span>
              <span className="font-black">
                {evolveNumber ? evolveNumber : "-"} Slothballs
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-[2] mx-auto mb-5 w-11/12 rounded-xl md:w-[40%]">
          <div className="rounded-t-xl bg-[#29294f] px-4 pt-2">
            <div className="flex items-center justify-between w-full h-12">
              <span className="text-lg font-bold text-white">Battle</span>
              {connected && (
                <span
                  className={
                    "rounded-full border-2  px-4 text-base font-medium " +
                    " " +
                    (eligible
                      ? "border-bggreen text-bggreen"
                      : "border-orange-500 text-orange-500")
                  }
                >
                  {eligible ? "You're eligible" : "Not eligible!"}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center justify-center w-full px-3 h-60">
              <p className="text-[29px] font-bold text-white">Goodluck</p>
            </div>
          </div>
          <div className="px-4 py-5 bg-white rounded-b-xl">
            <span className="font-semibold text-[#424242]">
              After the battle
            </span>

            <div className="flex items-center justify-between mt-2 text-lg">
              <span className="font-black">Evolve</span>
              <span className="font-black">
                {evolveNumber ? evolveNumber : "-"} Slothballs
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
