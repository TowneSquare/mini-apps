export const MintPorgress: React.FC = () => {
  const value = 190;
  const total = 6666;
  return (
    <div className="relative mb-3 h-16 items-center overflow-hidden rounded-xl border-2 border-t-4 border-black bg-bgbutton">
      <div
        className="h-full bg-bggreen"
        style={{ width: `${Number((value / total).toFixed(2)) * 100}` + "%" }}
      />
      <div className="absolute top-0 flex h-full w-full items-center justify-center text-lg font-bold text-slate-600">
        Minted{" "}
        {`${Number(value).toLocaleString()}/${Number(total).toLocaleString()}`}
      </div>
    </div>
  );
};
