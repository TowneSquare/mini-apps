import { CountDown } from "@/src/components/CountDown";

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
