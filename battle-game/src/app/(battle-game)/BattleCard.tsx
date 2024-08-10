import { CountDownCard } from "./MintCard";

export const BattleCard: React.FC<{
  eligible?: boolean;
  gameStartTime: number;
  evolveNumber?: number;
}> = ({ eligible, gameStartTime, evolveNumber }) => {
  const isStartGame = gameStartTime - Date.now() < 0;
 
  return (
    <div className="z-[2] mx-auto w-11/12 md:w-[40%] mb-5 rounded-xl">
      <div className="rounded-t-xl bg-[#29294f] px-4 pt-2">
        <div className="flex items-center justify-between w-full h-12">
          <span className="text-lg font-bold text-white">Battle</span>
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
        </div>
        <div className="flex flex-col items-center justify-center w-full px-3 h-60">
          {isStartGame ? (
            <span className="text-2xl font-bold text-white">GOOD LUCK!</span>
          ) : (
            <>
              <CountDownCard
                cardName="Battle starts"
                startTime={gameStartTime}
                bgcolor="bg-[#555372]"
              />
            </>
          )}
        </div>
      </div>
      <div className="px-4 py-5 bg-white rounded-b-xl">
        <span className="font-semibold text-[#424242]">After the battle</span>

        <div className="flex items-center justify-between mt-2 text-lg">
          <span className="font-black">Evolve</span>
          <span className="font-black">{evolveNumber ? evolveNumber : "-"} Slothballs</span>
        </div>
      </div>
    </div>
  );
};
