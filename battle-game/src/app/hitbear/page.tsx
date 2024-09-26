// "use client";
// import gsap from "gsap";
// import mobileSloth from "@/public/assets/game/mobile-sloth.png";
// import boomImgA from "@/public/assets/game/boomA.png";
// import boomImgB from "@/public/assets/game/boomB.png";
// import boomImgC from "@/public/assets/game/boomC.png";
// import { useRouter } from "next/navigation";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import { useBattleEvil } from "@/src/hooks/battleEvilProvider";
// import { GAME_START_TIME } from "@/src/config/constants";
// import { useAppDispatch } from "@/src/store/hooks";
// import { updateHeaderState } from "@/src/store/app";

// const HitBear = () => {
//   const { evilBlood, battleClickHandler } = useBattleEvil();
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const [isClickable, setIsClickable] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(15);
//   const [loaded, setLoaded] = useState(false);
//   // const [countDown, setCountDown] = useState(
//   //   10
//   // );
//   const [countDown, setCountDown] = useState(
//     Math.floor((GAME_START_TIME - Math.floor(Date.now())) / 1000),
//   );

//   const bearRef = useRef(null);
//   const countdownRefs = [...Array(countDown > 0 ? countDown : 0)].map((_, i) =>
//     useRef(null),
//   );

//   const hitHimRef = useRef(null);
//   const hitBearRef = useRef<HTMLImageElement>(null);
//   const healthRef = useRef(null);
//   const blinkBearRef = useRef(null);

//   // useEffect(() => {
//   //   if (bearRef.current) {
//   //     const tl = gsap.timeline();

//   //     tl.to(blinkBearRef.current, {
//   //       opacity: 1,
//   //       repeat: 1,
//   //       pointerEvents: "auto",
//   //     }).set(blinkBearRef.current, { opacity: 0, pointerEvents: "auto" });

//   //     tl.to(hitBearRef.current, {
//   //       opacity: 1,
//   //       duration: 0,
//   //       pointerEvents: "auto",
//   //     });
//   //   }
//   // }, [loaded]);

//   const hitMarkerRefA = useRef<HTMLDivElement>(null);
//   const hitMarkerRefB = useRef<HTMLDivElement>(null);
//   const hitMarkerRefC = useRef<HTMLDivElement>(null);
//   const hitMarkerRefs = [hitMarkerRefA, hitMarkerRefB, hitMarkerRefC];

//   // const [clickCount, setClickCount] = useState(0);

//   // const totalClicks = 5; // 总共点击次数，到达这个次数视为满

//   const handleImageLoad = () => {
//     console.log("handleImage ", loaded);
//     setLoaded(true);
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       if (evilBlood > 0 && countDown > 0) {
//         if (loaded) {
//           const tll = gsap.timeline();
//           gsap.to("#hitBear", {
//             marginBottom: "-100px",
//             duration: countDown / 2,
//             filter: "brightness(0.2)",
//             onComplete: () => {
//               gsap.to("#hitBear", {
//                 marginBottom: "-50px",
//                 duration: countDown / 2,
//                 filter: "brightness(0.8)",
//                 width: 800,
//               });
//               // dispatch(updateHeaderState(true))
//             },
//           });
//           gsap.to("#hitBearMobile", {
//             marginBottom: "0px",
//             duration: countDown,
//             filter: "brightness(1)",
//             width: 600,
//           });
//           if (countdownRefs) {
//             tll.to(countdownRefs[countdownRefs?.length - 1].current, {
//               opacity: 0,
//               duration: 1,
//               display: "none",
//             });
//             // tl.delay(1);
//             for (let index = 0; index < countdownRefs?.length - 1; index++) {
//               const ref =
//                 countdownRefs[countdownRefs?.length - 2 - index].current;
//               tll
//                 .to(ref, { opacity: 1, duration: 1, display: "block" })
//                 .set(ref, { opacity: 0, display: "none" });
//             }
//           }
//           tll
//             .to(hitHimRef.current, {
//               opacity: 1,
//               duration: 2,
//               display: "block",
//             })
//             .set(hitHimRef.current, { opacity: 0, display: "none" });
//         }
//       } else {
//         //router.push("/youMadeIt");
//       }
//     });
//   }, [loaded]);

//   useMemo(() => {
//     setIsClickable(true);
//     // Enable the button when the component mounts

//     if (evilBlood <= 0) {
//       const countdownInterval = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev > 1) return prev - 1;
//           clearInterval(countdownInterval);
//           setIsClickable(false);
//           //dispatch(updateHeaderState(false))
//           gsap.to("#hitBear", {
//             marginBottom: "-300px",
//             duration: 10,
//             filter: "brightness(.09)",
//             onComplete: () => {
//               router.push("/youMadeIt");
//             },
//           });
//           gsap.to("#hitBearMobile", {
//             marginBottom: "-300px",
//             duration: 10,
//             filter: "brightness(0.09)",
//             onComplete: () => {
//               router.push("/youMadeIt");
//             },
//           });
//           return 0;
//         });
//       });
//       // Cleanup interval when the component unmounts
//       return () => clearInterval(countdownInterval);
//     }
//   }, [evilBlood]);

//   useEffect(() => {
//     //  if(countDown < 0){
//     //   dispatch(updateHeaderState(true))
//     //  }
//   }, [countDown]);

//   const handleClick = (event: any) => {
//     if (isClickable) {
//       const { clientX, clientY } = event;

//       // Get the click position relative to the image
//       const rect = event.target.getBoundingClientRect();
//       const x = clientX - rect.left;
//       const y = clientY - rect.top;
//       const marker = hitMarkerRefs[Math.floor(Math.random() * 3)].current;

//       if (marker) {
//         marker.style.left = `${x}px`; // Assume marker width and height is 30px
//         marker.style.top = `${y}px`;
//         marker.style.display = "block";
//         gsap.fromTo(
//           marker,
//           { scale: 0.5, opacity: 0 },
//           {
//             scale: 1.5,
//             opacity: 1,
//             duration: 0.001,
//             ease: "elastic.out",
//             onComplete: () => {
//               gsap.to(marker, {
//                 opacity: 0,
//                 duration: 0.2,
//                 onComplete: () => {
//                   marker.style.display = "none";
//                 },
//               });
//             },
//           },
//         );
//         battleClickHandler();
//       }
//     }
//   };



//   return (
//     <main className="relative flex items-center justify-center w-screen min-h-screen">
//       <div
//         ref={healthRef}
//         className="absolute z-50 flex flex-col items-center justify-center w-full top-1"
//       >
//         <span className="mb-1 text-2xl text-center text-white ">
//           HP:{evilBlood <= 0 ? 0 : evilBlood}
//         </span>
//         <div className="relative mx-auto h-10 w-72 skew-x-[-38deg] rounded-lg border-4 border-black bg-[#9ba3b9]">
//           <div
//             className="relative h-full overflow-hidden rounded-sm bg-[#9a000c]"
//             style={{
//               width: `${Number((evilBlood / 10000).toFixed(2)) * 100}` + "%",
//             }}
//           >
//             <div className=" -bottom-[85%] h-full w-full bg-red-400/80" />
//             <div className="w-full h-full rounded-sm left-2 top-2 bg-red-500/50" />
//           </div>
//         </div>
//       </div>
//       <div className="absolute w-full bottom-[30px] md:bottom-[30vh] md:w-fit">
//         {countDown > 0 && (
//           <>
//             <Image
//               className="hidden -mb-[250px] content-center items-center justify-center brightness-[.2] md:block"
//               src="/assets/game/evil-sloth.png"
//               alt="Bear"
//               width={600}
//               height={600}
//               onClick={handleClick}
//               onLoad={handleImageLoad}
//               id="hitBear"
//               priority
//             />
//             <Image
//               className="-mb-[300px] brightness-[.1] md:hidden"
//               src={mobileSloth.src}
//               alt="Bear"
//               id="hitBearMobile"
//               width={500}
//               height={500}
//               //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               onClick={handleClick}
//               onLoad={handleImageLoad}
//               priority
//             />
//           </>
//         )}
//         {countDown < 0 && (
//           <>
//             <Image
//               className="items-center content-center justify-center hidden md:block"
//               src="/assets/game/evil-sloth.png"
//               alt="Bear"
//               width={700}
//               height={750}
//               style={{
//                 objectFit: "cover",
//               }}
//               onClick={handleClick}
//               onLoad={handleImageLoad}
//               id="hitBear"
//               priority
//             />
//             <Image
//               className={`z-40 md:hidden`}
//               src={mobileSloth.src}
//               alt="Bear"
//               style={{
//                 width: "100%",
//                 objectFit:"cover"
//               }}
//               width={800}
//               height={600}
//               onClick={handleClick}
//               onLoad={handleImageLoad}
//               id="hitBearMobile"
//               priority
//             />
//           </>
//         )}
//         <img
//           ref={hitMarkerRefB as React.RefObject<HTMLImageElement>}
//           src={boomImgB.src}
//           className="absolute z-40 hidden w-40 "
//           alt="Hit Marker"
//           style={{
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//         <img
//           ref={hitMarkerRefC as React.RefObject<HTMLImageElement>}
//           src={boomImgC.src}
//           className="absolute z-40 hidden w-40 "
//           alt="Hit Marker"
//           style={{
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//         <img
//           ref={hitMarkerRefA as React.RefObject<HTMLImageElement>}
//           src={boomImgA.src}
//           className="absolute z-40 hidden w-40 "
//           alt="Hit Marker"
//           style={{
//             transform: "translate(-50%, -50%)",
//           }}
//         />
//       </div>
//       {countdownRefs.map((ref, i) => {
//         return (
//           <div
//             key={i}
//             ref={ref}
//             className={
//               `absolute top-[10rem] md:top-[15rem] z-50 hidden w-3/4 text-center text-[15rem] text-white` +
//               ` ${i === countdownRefs.length - 1 ? "hidden opacity-100" : "opacity-0"}`
//             }
//             style={{
//               textShadow:
//                 "10px 10px 0 #000, 10px -10px 0 #000, -10px 10px 0 #000, -10px -10px 0 #000, 0 10px 0 #000, 0 -10px 0 #000, 10px 0 #000, -10px 0 #000",
//               display: "none",
//             }}
//           >
//             {i + 1}
//           </div>
//         );
//       })}
//       <div
//         ref={hitHimRef}
//         className="absolute  top-[10rem] md:top-[15rem] z-50 w-full text-center text-[9rem] font-bold leading-[8rem] text-white opacity-0"
//         style={{
//           textShadow:
//             "8px 8px 0 #000, 8px -8px 0 #000, -8px 8px 0 #000, -8px -8px 0 #000, 0 8px 0 #000, 0 -8px 0 #000, 8px 0 #000, -8px 0 #000",
//           display: "none",
//         }}
//       >
//         <h1 className="font-bold">Hit</h1>
//         <h1>him</h1>
//       </div>
//       <img
//         className="absolute bottom-0 z-20 h-[150px] w-full object-cover md:hidden"
//         src="/assets/game/mobile-footer.png"
//         alt="mobile-footer"
//       />
//       <img
//         src="/assets/game/desktop-footer.png"
//         alt="desktop"
//         className="absolute bottom-0 z-20 hidden h-[40vh] w-full object-cover md:block"
//       />
//     </main>
//   );
// };

// export default HitBear;
