import { CountDownCard } from "./MintCard";

export const BattleCard: React.FC<{
  eligible?: boolean;
  gameStartTime: number;
  evolveNumber: number;
}> = ({ eligible, gameStartTime, evolveNumber }) => {
  const isStartGame = gameStartTime - Date.now() < 0;
  return (
    <div className="relative z-[2] mx-auto w-11/12 rounded-xl">
      <div className="rounded-t-xl bg-[#29294f] px-4 pt-2">
        <div className="flex h-12 w-full items-center justify-between">
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
        <div className="flex  h-60 w-full flex-col items-center justify-center px-3">
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
      <div className="rounded-b-xl bg-white px-4 py-5">
        <span className="font-semibold text-[#424242]">After the battle</span>

        <div className="mt-2 flex items-center justify-between text-lg">
          <span className="font-black">Evolve</span>
          <span className="font-black">{evolveNumber} Slothballs</span>
        </div>
      </div>
    </div>
  );
};
