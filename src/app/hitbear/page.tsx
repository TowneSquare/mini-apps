'use client'
import gsap from "gsap"
import bearStartImg from "../../../public/assets/game/Untitled_Artwork 14 1.png"
import num30Img from "../../../public/assets/game/30.png"
import num01Img from "../../../public/assets/game/01.png"
import hitImg from "../../../public/assets/game/hithim.png"

import frontImg from "../../../public/assets/game/Frame 48096887-1.png"
import bgImg from "../../../public/assets/game/bg.svg"
import React, {useEffect, useRef, useState} from "react"
import Image from "next/image";

const HitBear = () => {

    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const num30Ref = useRef(null);
    const num01Ref = useRef(null);
    const hitRef = useRef(null);

    useEffect(() => {
        if (imgRef.current) {
            gsap.set(imgRef.current, {
                y: '29vh',
            });
        }
        if (loaded && imgRef.current) {
            console.log("触发图片")
            gsap.to(imgRef.current, {
                duration: 2,
                scale: 1.41,
                y: '2vh',
                ease: 'power1.out',
            });
            const tl = gsap.timeline()

            tl.to(num30Ref.current,
                {opacity: 0, duration: 1})
            tl.delay(1)
            tl.to(num01Ref.current,
                {opacity: 1, duration: 1})
            tl.to(num01Ref.current, {opacity: 0})
            tl.to(hitRef.current, {opacity: 1, duration: 1})
            tl.to(hitRef.current, {opacity: 0})
        }
    }, [loaded]);


    const handleImageLoad = () => {
        console.log("handleImage ", loaded)
        setLoaded(true);
    };
    const handleImageError = (event: any) => {
        console.error('Image load error:', event);
    };

    return (
        <div className="flex justify-center h-screen overflow-hidden" style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundColor: "#384273",
        }}>

            {/* <div className="box w-20 h-20 bg-red-300" /> */}
            <img className="absolute bottom-0 z-50 w-full object-cover" src={frontImg.src} alt=""/>
            {/* 开始图片 */}
            <img className={`absolute bottom-0 z-20 w-full object-cover ${loaded ? 'hidden' : ''}`}
                 src={bearStartImg.src} alt=""/>
            <img ref={num30Ref} className={`absolute top-52 z-20 w-full object-cover w-2/3 `}
                 src={num30Img.src} alt=""/>
            <img ref={num01Ref} className={`absolute top-52 z-20 w-full object-cover w-2/3 opacity-0 `}
                 src={num01Img.src} alt=""/>
            <img ref={hitRef} className={`absolute top-52 z-20 w-full object-cover w-2/3 opacity-0 `}
                 src={hitImg.src} alt=""/>
            {/* <img ref={imgRef} */}
            {/*        src={bearImg.src} */}
            {/*        alt="Description" */}
            {/*        onLoad={handleImageLoad} */}
            {/*        onError={handleImageError} */}
            {/*        className={`w-full h-full object-contain ${loaded ? '' : 'hidden'}`} /> */}
            {/* 移动图片 */}
            <Image ref={imgRef}
                   src={bearStartImg.src}
                   alt="Description"
                   onLoad={handleImageLoad}
                   onError={handleImageError}
                   width={500}
                   height={300}
                   loading="eager"
                   className={`w-full h-full object-contain ${loaded ? '' : 'hidden'}`}/>

        </div>

    )
}

export default HitBear
