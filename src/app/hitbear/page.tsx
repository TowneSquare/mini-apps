'use client'
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import bearImg from "../../../public/assets/game/Component 44.png"
const HitBear =()=>{
    useGSAP(()=>{
        gsap.to(".box",{x:250})
    },[])

    return (
        <div className="">
            <div className="box w-20 h-20 bg-red-300"></div>
            <img className="items-center" src={bearImg.src} alt=""/>

        </div>
    )
}

export default HitBear
