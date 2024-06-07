import bg from "@/public/assets/hooray/bg.png";
import centerImage from "@/public/assets/hooray/ball-brown2.png";

export const Hooray: React.FC<{ skipHandler: () => void }> = ({
  skipHandler,
}) => {
  return (
    <div
      className="absolute top-0 flex h-full w-full flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundColor: "#4A4071",
      }}
    >
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transform text-center text-5xl font-bold text-white">
        Hooray!
      </div>

      <img
        src={centerImage.src}
        className="absolute left-1/2 top-1/2 h-auto w-auto -translate-x-1/2 -translate-y-1/2 transform"
        alt=""
      />

      <div
        onClick={skipHandler}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 transform text-center  text-2xl font-bold text-[#62C2C4]"
      >
        CONTINUE
      </div>
    </div>
  );
};
