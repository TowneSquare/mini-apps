'use client'
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import bearImg from "../../../public/assets/game/Component 44.png"
import React from "react"
const HitBear =()=>{
    useGSAP(()=>{
    //     gsap.to(".box",{y:250})
    // },[])
    // 创建滑动动画
    gsap.from('.box', { y: '100%', duration: 1, ease: 'power4.out' });
}, [])
    return (
        <div className="flex justify-center h-screen overflow-hidden">

            {/*<div className="box w-20 h-20 bg-red-300" />*/}
            <img className=" box items-center" src={bearImg.src} alt="" />

        </div>

    )
}

export default HitBear
