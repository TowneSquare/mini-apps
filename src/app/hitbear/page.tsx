'use client'
import gsap from "gsap"
import bearStartImg from "../../../public/assets/game/Untitled_Artwork 14 1.png"
import num30Img from "../../../public/assets/game/30.png"
import num01Img from "../../../public/assets/game/01.png"
import hitImg from "../../../public/assets/game/hithim.png"
import healthImg from "../../../public/assets/game/Component 20-1.png"
import logoImg from "../../../public/assets/game/Frame 48096883-2.png"
import hitBearImg from "../../../public/assets/game/Component 44.png"
import blinkBearImg from "../../../public/assets/game/Component 44-1.png"

import frontImg from "../../../public/assets/game/Frame 48096887-1.png"
import bgImg from "../../../public/assets/game/bg.svg"
import React, {useEffect, useRef, useState} from "react"
import Image from "next/image";

const HitBear = () => {

    const bearRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const num30Ref = useRef(null);
    const num01Ref = useRef(null);
    const hitRef = useRef(null);
    const hitBearRef = useRef(null);
    const healthRef = useRef(null);
    const blinkBearRef = useRef(null);

    useEffect(() => {
        if (bearRef.current) {
            gsap.set(bearRef.current, {
                y: '29vh',
            });
        }
        if (loaded && bearRef.current) {
            console.log("触发图片")
            gsap.to(bearRef.current, {
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
            tl.to(bearRef.current, {opacity: 0,duration: 0})
            tl.to(blinkBearRef.current, {opacity: 1,duration: 0})
            tl.to(blinkBearRef.current, {opacity: 0,duration: 0})
            tl.to(hitBearRef.current, {opacity: 1,duration: 0})

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
            <img ref={healthRef} className={`absolute top-0 z-20 w-full object-cover  `}
                 src={logoImg.src} alt=""/>
            <img ref={healthRef} className={`absolute top-20 z-20 w-3/4 object-cover  `}
                 src={healthImg.src} alt=""/>
            <img ref={num30Ref} className={`absolute top-52 z-20 w-3/4 object-cover  `}
                 src={num30Img.src} alt=""/>
            <img ref={num01Ref} className={`absolute top-52 z-20 w-3/4 object-cover  opacity-0 `}
                 src={num01Img.src} alt=""/>
            <img ref={hitRef} className={`absolute top-52 z-20 w-3/4 object-cover  opacity-0 `}
                 src={hitImg.src} alt=""/>
            {/* <img ref={bearRef} */}
            {/*        src={bearImg.src} */}
            {/*        alt="Description" */}
            {/*        onLoad={handleImageLoad} */}
            {/*        onError={handleImageError} */}
            {/*        className={`w-full h-full object-contain ${loaded ? '' : 'hidden'}`} /> */}
            {/* 移动图片 */}
            <Image ref={bearRef}
                   src={bearStartImg.src}
                   alt="Description"
                   onLoad={handleImageLoad}
                   onError={handleImageError}
                   width={500}
                   height={300}
                   loading="eager"
                   className={`w-full h-full object-contain ${loaded ? '' : 'hidden'}`}/>
            <img ref={blinkBearRef}
                 src={blinkBearImg.src}
                 alt="Description"
                 className={`absolute top-52 z-20 w-full object-cover  opacity-0 `}/>

            <img ref={hitBearRef}
                 src={hitBearImg.src}
                 alt="Description"
                 className={`absolute top-52 z-20 w-full object-cover  opacity-0 `}/>


        </div>

    )
}

export default HitBear
