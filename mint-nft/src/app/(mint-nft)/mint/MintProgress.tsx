export const MintPorgress: React.FC<{ value: number; total?: number }> = ({
  value,
  total = 0,
}) => {
  return (
    <div className="relative items-center h-16 mb-3 overflow-hidden border-2 border-t-4 border-black rounded-xl bg-bgbutton">
      <div
        className="h-full bg-bggreen"
        style={{ width: `${Number((value / total).toFixed(2)) * 100}` + "%" }}
      />
      <div className="absolute top-0 flex items-center justify-center w-full h-full text-lg font-bold text-slate-600">
        Minted{" "}
        {`${Number(value).toLocaleString()}/${Number(total).toLocaleString()}`}
      </div>
    </div>
  );
};
