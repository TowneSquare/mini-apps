"use client";
export const CountDown: React.FC<{
  bgcolor?: string;
}> = ({ bgcolor = "bg-black" }) => {
  return (
    <div
      className={
        "grid grid-cols-4 divide-x divide-slate-400/25 overflow-hidden rounded-xl text-slate-300" +
        " " +
        bgcolor
      }
    >
      <div className="flex flex-col items-center justify-center px-3 py-2">
        <span className="text-xl">02</span>
        <span>Days</span>
      </div>
      <div className="flex flex-col items-center justify-center px-3 py-2">
        <span className="text-xl">23</span>
        <span>Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center px-3 py-2">
        <span className="text-xl">56</span>
        <span>Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center px-3 py-2">
        <span className="text-xl">12</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};
