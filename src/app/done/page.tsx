import bg from "../../../public/assets/hooray/bg.png";
import centerImage from "../../../public/assets/hooray/ball-brown.png";


export default function Page() {
    return (
        <div className="relative h-screen bg-cover bg-center" style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundColor: "#4A4071",
        }}>
            {/* 创建一个半透明的背景层 */}
            <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md">
                {/* 圆角矩形框 */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-4/5 bg-white rounded-3xl border-2 border-black border-b-8 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-semibold mb-6">Well down!!!</h2>
                    {/* 图片 */}
                    <img src={centerImage.src} alt="Center Image" className="w-52 h-52 mb-2"/>

                    {/* 文字 */}
                    <h2 className="text-xl font-semibold mb-2">Slothball #648</h2>
                    <div className="p-5 text-center">
                        <p className="mb-2 indent-2 font-medium">Your Slothball's transformation into a
                            Sloth is on the horizon. The evolution is coming – be prepared!</p>

                    </div>

                    {/* 继续按钮 */}
                    <button className=" bg-[#62C5C6] text-white text-xl font-bold py-1 px-3 rounded-xl w-10/12 h-14 border border-black border-b-4 mb-2" >CONTINUE</button>


                    {/* 分享按钮 */}
                    <a href="#" className=" flex items-center py-3 px-3  text-xl font-black text-[#6C5BA4]">
                        {/*<img src={shareImage.src} className="w-5 fill-blue-500 mr-2"  alt=""/>*/}

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                        </svg>

                        SHARE</a>
                </div>
            </div>

        </div>
    );
}
