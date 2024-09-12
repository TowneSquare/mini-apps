"use client";
import { useCountdown } from "@/src/hooks/useCountdown";

export const CountDown: React.FC<{
  deadlineTime: number;
  bgcolor?: string;
}> = ({ bgcolor = "bg-black",deadlineTime }) => {

  const timeInfo = useCountdown({deadlineTime})
  return (
    <div
      className={
        "grid grid-cols-4 divide-x divide-slate-400/25 overflow-hidden rounded-xl text-slate-300" +
        " " +
        bgcolor
      }
    >
      <div className="flex flex-col items-center justify-center px-6 py-2 font-normal">
        <span className="text-xl">{timeInfo.day}</span>
        <span>Days</span>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-2">
        <span className="text-xl">{timeInfo.hoursStr}</span>
        <span>Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-2">
        <span className="text-xl">{timeInfo.minutesStr}</span>
        <span>Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-2">
        <span className="text-xl">{timeInfo.secondsStr}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};
