import bg from "../../../public/assets/hooray/bg.png";
import centerImage from "../../../public/assets/hooray/ball-brown.png";


export default function Page() {
    return (
        <div
            className="relative flex flex-col justify-center items-center h-screen overflow-hidden"
            style={{
                backgroundImage: `url(${bg.src})`,
                backgroundSize: "cover",
                backgroundColor: "#4A4071",
            }}
        >

            <div
                className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white text-center font-bold">
                Hooray!
            </div>

            <img
                src={centerImage.src}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto"
                alt=""
            />

            <div
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-2xl  text-center font-bold text-[#62C2C4]" >
                Skip
            </div>
        </div>
    );
}
