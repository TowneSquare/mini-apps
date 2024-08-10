"use client";
import gsap from "gsap";
import bearStartImg from "@/public/assets/game/bearStartImg.png";
import bearStartImgMobile from "@/public/assets/game/sloth-mobile.png";
import madeItImg from "@/public/assets/game/ball.png";
import frontImg from "@/public/assets/game/front.png";
import hitBearImg from "@/public/assets/game/hitBear.png";
import blinkBearImg from "@/public/assets/game/blinkBear.png";
import boomImgA from "@/public/assets/game/boomA.png";
import boomImgB from "@/public/assets/game/boomB.png";
import boomImgC from "@/public/assets/game/boomC.png";
import { useRouter } from "next/navigation";

import bgImg from "@/public/assets/game/bg.svg";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBattleEvil } from "@/src/hooks/battleEvilProvider";

const HitBear = () => {
  const bearRef = useRef(null);
  const countdownRefs = [...Array(30)].map((_, i) => useRef(null));
  const [loaded, setLoaded] = useState(false);

  const hitHimRef = useRef(null);
  const hitBearRef = useRef<any>(null);
  const healthRef = useRef(null);
  const blinkBearRef = useRef(null);
  const madeItRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (bearRef.current) {
      //   gsap.set(bearRef.current, {
      //     y: "29vh",
      //   });
      // }
      // if (loaded && bearRef.current) {
      //   gsap.to(bearRef.current, {
      //     duration: 2,
      //     scale: 1.41,
      //     y: "16vh",
      //     ease: "power1.out",
      //   });
      const tl = gsap.timeline();
      //   tl.delay(1);

      //   tl.to(countdownRefs[countdownRefs.length - 1].current, {
      //     opacity: 0,
      //     duration: 1,
      //   });
      //   // tl.delay(1);
      //   for (let index = 0; index < countdownRefs.length - 1; index++) {
      //     const ref = countdownRefs[countdownRefs.length - 2 - index].current;
      //     tl.to(ref, { opacity: 1, duration: 1 }).set(ref, { opacity: 0 });
      //   }

      //   tl.to(hitHimRef.current, { opacity: 1, duration: 1 }).set(
      //     hitHimRef.current,
      //     { opacity: 0 },
      //   );

      //   tl.to(bearRef.current, { opacity: 0, duration: 0 });
      tl.to(blinkBearRef.current, {
        opacity: 1,
        repeat: 1,
        pointerEvents: "auto",
      }).set(blinkBearRef.current, { opacity: 0, pointerEvents: "auto" });

      tl.to(hitBearRef.current, {
        opacity: 1,
        duration: 0,
        pointerEvents: "auto",
      });
    }
  }, [loaded]);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container
  const hitMarkerRefA = useRef<HTMLDivElement>(null);
  const hitMarkerRefB = useRef<HTMLDivElement>(null);
  const hitMarkerRefC = useRef<HTMLDivElement>(null);
  const hitMarkerRefs = [hitMarkerRefA, hitMarkerRefB, hitMarkerRefC];

  // const [clickCount, setClickCount] = useState(0);
  const { evilBlood, battleClickHandler } = useBattleEvil();
  // const totalClicks = 5; // 总共点击次数，到达这个次数视为满
  const handleClick = (event: { clientX: number; clientY: number }) => {
    const marker = hitMarkerRefs[Math.floor(Math.random() * 3)].current;
    const container = containerRef.current;
    // setClickCount((prev) => prev + 1);
    battleClickHandler();
    if (container && marker) {
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left; // Adjust for container's left boundary
      const offsetY = event.clientY - rect.top; // Adjust for container's top boundary

      marker.style.left = `${offsetX - 50}px`; // Assume marker width and height is 30px
      marker.style.top = `${offsetY - 50}px`;
      marker.style.display = "block";

      // GSAP animation
      gsap.fromTo(
        marker,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1.5,
          opacity: 1,
          duration: 0.3,
          ease: "elastic.out",
          onComplete: () => {
            gsap.to(marker, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                marker.style.display = "none";
              },
            });
          },
        },
      );
      const tl = gsap.timeline();
      tl.to(blinkBearRef.current, {
        opacity: 1,
        repeat: 1,
        pointerEvents: "auto",
      }).set(blinkBearRef.current, { opacity: 0, pointerEvents: "auto" });
    }
    const tl = gsap.timeline();
    tl.to(blinkBearRef.current, { display: 1, duration: 0.1 }).set(
      blinkBearRef.current,
      { opacity: 0 },
    );

    // if (clickCount >= totalClicks - 1) {
    if (evilBlood <= 0) {
      console.log("area");
      const tl = gsap.timeline();
      tl.to(hitBearRef.current, {
        duration: 0.1,
        onComplete: () => {
          router.push("/youMadeIt");
        },
      }).set(blinkBearRef.current, { display: "none" });
      // tl.to(bearRef.current, {
      //   opacity: 1,
      //   duration: 1,
      //   onComplete: () => {
      //     console.log("Hittter2");
      //   },
      // }).to(bearRef.current, {
      //   duration: 1,
      //   scale: 1,
      //   y: "100vh",
      //   ease: "power1.in",
      // });
      // tl.to(healthRef.current, {
      //   opacity: 0,
      //   duration: 0.1,
      //   onComplete: () => {
      //     console.log("Hittter3");
      //   },
      // }).set(healthRef.current, { display: "none" });
      // tl.to(madeItRef.current,{duration: 2,opacity:1,display:'block',
      //     y: '-82vh',
      //     ease: 'power1.out',})
      tl.to(madeItRef.current, { y: "10%", duration: 0.5 });
    }
  };
  const handleImageLoad = () => {
    console.log("handleImage ", loaded);
    setLoaded(true);
  };
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const figureOut = (e: any) => {
    if (!hitBearRef.current) return;
    const slider = hitBearRef.current.children[0];
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsMouseDown(true);
    document.body.style.cursor = "grabbing";
    const marker = hitMarkerRefs[Math.floor(Math.random() * 3)].current;
    if (marker) {
      marker.style.left = `${scrollLeft}`;
      marker.style.top = `${scrollTop}`;
      marker.style.display = "block";
      console.log("redddd")
    }
  };

  useEffect(() => {
    if (loaded) {
      const tll = gsap.timeline();
      gsap.to("#bearstart", {
        bottom: "30%",
        duration: 30,
        display: "none",
        onComplete: () => {
          gsap.to("#bearstart2", {
            opacity: 1,
          });
        },
      });
      gsap.to("#bearstartMobile", {
        bottom: "170px",
        duration: 30,
        display: "none",
        onComplete: () => {
          gsap.to("#bearstart2", {
            opacity: 1,
          });
        },
      });
      tll.to(countdownRefs[countdownRefs.length - 1].current, {
        opacity: 0,
        duration: 1,
      });
      // tl.delay(1);
      for (let index = 0; index < countdownRefs.length - 1; index++) {
        const ref = countdownRefs[countdownRefs.length - 2 - index].current;
        tll.to(ref, { opacity: 1, duration: 1 }).set(ref, { opacity: 0 });
      }
      tll
        .to(hitHimRef.current, { opacity: 1, duration: 2 })
        .set(hitHimRef.current, { opacity: 0 });
    }
  }, [loaded]);

  return (
    <>
      <main
        ref={containerRef}
        className="relative flex h-full min-h-[calc(100vh-5rem)] justify-center overflow-hidden bg-cover pt-20 md:min-h-screen"
        style={{
          backgroundImage: `url(${bgImg.src})`,
          backgroundColor: "#384273",
        }}
      >
        <div
          ref={healthRef}
          className="absolute flex flex-col items-center justify-center w-full top-1"
        >
          <span className="mb-1 text-2xl text-center text-white ">
            HP:{evilBlood}
          </span>
          <div className="relative mx-auto h-10 w-72 skew-x-[-38deg] rounded-lg border-4 border-black bg-[#9ba3b9]">
            <div
              className="relative h-full overflow-hidden rounded-sm bg-[#9a000c]"
              style={{
                width: `${Number((evilBlood / 10000).toFixed(2)) * 100}` + "%",
              }}
            >
              <div className=" -bottom-[85%] h-full w-full bg-red-400/80" />
              <div className="w-full h-full rounded-sm left-2 top-2 bg-red-500/50" />
            </div>
          </div>
        </div>
        <img
          className="absolute bottom-0 z-50 h-[30%] w-full md:hidden"
          src={frontImg.src}
          alt=""
        />
        <img
          src="/assets/game/desktop-footer.png"
          alt="desktop"
          className="absolute bottom-0 z-50 hidden object-contain w-full md:block"
        />
        {/* 开始图片 */}
        <Image
          className={`absolute bottom-0 z-20 hidden w-full object-contain md:-bottom-32 md:block md:h-[500px] md:w-[50%]`}
          alt="Bear"
          src={bearStartImg.src}
          width={300}
          height={100}
          onLoad={handleImageLoad}
          id="bearstart"
        />
        <Image
          className={`absolute bottom-0 z-20 w-full object-contain md:-bottom-32 md:hidden md:h-[500px] md:w-[50%]`}
          alt="Bear"
          src={bearStartImgMobile.src}
          width={300}
          height={100}
          onLoad={handleImageLoad}
          id="bearstartMobile"
        />
        <Image
          className={`absolute bottom-1/2 z-20 hidden w-full object-contain md:bottom-[30%] md:block md:h-[500px] md:w-[50%] md:opacity-0`}
          src="/assets/game/evil-sloth.svg"
          alt="Bear"
          width={300}
          height={100}
          id="bearstart2"
          ref={hitBearRef}
          onClick={handleClick}
        />
        <Image
          className={`absolute bottom-[170px] z-20 block w-full object-contain opacity-0 md:hidden md:h-[500px] md:w-[50%] lg:hidden`}
          src={blinkBearImg.src}
          alt="Bear"
          width={300}
          height={100}
          id="bearstart2"
          ref={hitBearRef}
          onClick={handleClick}
        />

        {countdownRefs.map((ref, i) => {
          return (
            <div
              key={i}
              ref={ref}
              className={
                `absolute top-52 z-20 w-3/4 text-center text-[15rem] text-white` +
                ` ${i === countdownRefs.length - 1 ? " opacity-100" : " opacity-0"}`
              }
              style={{
                textShadow:
                  "10px 10px 0 #000, 10px -10px 0 #000, -10px 10px 0 #000, -10px -10px 0 #000, 0 10px 0 #000, 0 -10px 0 #000, 10px 0 #000, -10px 0 #000",
              }}
            >
              {i + 1}
            </div>
          );
        })}

        {/* <div
          ref={num30Ref}
          className="absolute top-52 z-20 w-3/4 text-center text-[15rem] text-white"
          style={{
            textShadow:
              "10px 10px 0 #000, 10px -10px 0 #000, -10px 10px 0 #000, -10px -10px 0 #000, 0 10px 0 #000, 0 -10px 0 #000, 10px 0 #000, -10px 0 #000",
          }}
        >
          30
        </div>
        <div
          ref={num01Ref}
          className={`absolute top-52 z-20 w-3/4 text-center text-[15rem] text-white opacity-0 `}
          style={{
            textShadow:
              "10px 10px 0 #000, 10px -10px 0 #000, -10px 10px 0 #000, -10px -10px 0 #000, 0 10px 0 #000, 0 -10px 0 #000, 10px 0 #000, -10px 0 #000",
          }}
        >
          01
        </div> */}
        <div
          ref={hitHimRef}
          className="absolute top-[15rem] z-20 w-full text-center text-[9rem] font-bold leading-[8rem] text-white opacity-0"
          style={{
            textShadow:
              "8px 8px 0 #000, 8px -8px 0 #000, -8px 8px 0 #000, -8px -8px 0 #000, 0 8px 0 #000, 0 -8px 0 #000, 8px 0 #000, -8px 0 #000",
          }}
        >
          <h1 className="font-bold">Hit</h1>
          <h1>him</h1>
        </div>
        {/* <Image
          ref={bearRef}
          src={bearStartImg.src}
          alt="Description"
          onLoad={handleImageLoad}
          width={500}
          height={300}
          loading="eager"
          className={`h-full w-full md:w-1/2 object-contain ${loaded ? "" : "hidden"}`}
        /> */}
        {/* <img
          ref={blinkBearRef}
          src={blinkBearImg.src}
          alt="blinkBear"
          className={`pointer-events-none absolute top-56 z-50 w-full object-cover  opacity-0 `}
          onClick={handleClick}
        /> */}

        {/* <img
          ref={hitBearRef}
          src={hitBearImg.src}
          alt="hitBear"
          className={`pointer-events-none absolute top-56 z-20 w-full object-cover  opacity-0 `}
          onClick={handleClick}
        /> */}
        {/* <div
          ref={madeItRef}
          id="slide-up-panel"
          className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center w-full h-screen overflow-hidden transform translate-y-full shadow-lg"
        >
          <img
            src={madeItImg.src}
            alt="Description"
            className="object-cover w-full "
          />
          <div className="flex h-full w-full flex-col items-center overflow-hidden  bg-[#242552] object-cover">
            
            <div className="absolute mb-12 text-3xl font-semibold text-center text-white top-1/2 md:mb-24 md:text-5xl">
              <p>Hooraaay!</p> You've made it!
            </div>
            <button className=" absolute top-1/2 mt-32 h-14 w-10/12 rounded-xl  border border-b-4 border-black bg-[#62C5C6] px-3 py-1 text-xl font-bold text-white ">
              <Link href="/evolve">CONTINUE</Link>
            </button>
          </div>
        </div> */}

        <img
          ref={hitMarkerRefA as React.RefObject<HTMLImageElement>}
          src={boomImgA.src}
          className="absolute z-50 hidden w-20 "
          alt="Hit Marker"
        />
        <img
          ref={hitMarkerRefB as React.RefObject<HTMLImageElement>}
          src={boomImgB.src}
          className="absolute z-50 hidden w-20 "
          alt="Hit Marker"
        />
        <img
          ref={hitMarkerRefC as React.RefObject<HTMLImageElement>}
          src={boomImgC.src}
          className="absolute z-50 hidden w-20 "
          alt="Hit Marker"
        />
      </main>
    </>
  );
};

export default HitBear;
