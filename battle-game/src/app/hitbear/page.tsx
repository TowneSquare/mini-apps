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

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useBattleEvil } from "@/src/hooks/battleEvilProvider";

const HitBear = () => {
  const bearRef = useRef(null);
  const countdownRefs = [...Array(30)].map((_, i) => useRef(null));
  const [loaded, setLoaded] = useState(false);

  const hitHimRef = useRef(null);
  const hitBearRef = useRef<HTMLImageElement>(null);
  const healthRef = useRef(null);
  const blinkBearRef = useRef(null);
  const madeItRef = useRef(null);
  const router = useRouter();
  const [showOuch, setShowOuch] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  

  useEffect(() => {
    if (bearRef.current) {
      const tl = gsap.timeline();

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
  
  const hitMarkerRefA = useRef<HTMLDivElement>(null);
  const hitMarkerRefB = useRef<HTMLDivElement>(null);
  const hitMarkerRefC = useRef<HTMLDivElement>(null);
  const hitMarkerRefs = [hitMarkerRefA, hitMarkerRefB, hitMarkerRefC];

  // const [clickCount, setClickCount] = useState(0);
  const { evilBlood, battleClickHandler } = useBattleEvil();
  // const totalClicks = 5; // 总共点击次数，到达这个次数视为满

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

  useEffect(() => {
    setTimeout(() => {
      if (evilBlood > 0) {
        if (loaded) {
          const tll = gsap.timeline();
          gsap.to("#hitBear", {
            marginBottom: "1.5vh",
            duration: 10,
            filter: "brightness(0.2)",
            onComplete: () => {
              gsap.to("#hitBear", {
                marginBottom: "10.5vh",
                duration: 20,
                filter: "brightness(0.8)",
                width: 700,
                onComplete: () => {},
              });
            },
          });
          gsap.to("#hitBearMobile", {
            marginBottom: "5vh",
            duration: 30,
            filter: "brightness(1)",
          });
          tll.to(countdownRefs[countdownRefs.length - 1].current, {
            opacity: 0,
            duration: 1,
            display: "none",
          });
          // tl.delay(1);
          for (let index = 0; index < countdownRefs.length - 1; index++) {
            const ref = countdownRefs[countdownRefs.length - 2 - index].current;
            tll
              .to(ref, { opacity: 1, duration: 1, display: "block" })
              .set(ref, { opacity: 0, display: "none" });
          }
          tll
            .to(hitHimRef.current, {
              opacity: 1,
              duration: 2,
              display: "block",
            })
            .set(hitHimRef.current, { opacity: 0, display: "none" });
        }
      } else {
        router.push("/youMadeIt");
      }
    });
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      setIsClickable(true);
      // Enable the button when the component mounts
      if (evilBlood <= 0) {
        const countdownInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev > 1) return prev - 1;
            clearInterval(countdownInterval);
            setIsClickable(false);

            gsap.to("#hitBear", {
              marginBottom: "-144px",
              duration: 10,
              filter: "brightness(.2)",
              onComplete: () => {
                router.push("/youMadeIt");
              },
            });
            gsap.to("#hitBearMobile", {
              marginBottom: "-288px",
              duration: 10,
              filter: "brightness(.1)",
              onComplete: () => {
                router.push("/youMadeIt");
              },
            });
            return 0;
          });
        });
        // Cleanup interval when the component unmounts
        return () => clearInterval(countdownInterval);
      }
    }, 2000);
  }, [evilBlood]);

  const handleClick = (event: any) => {
    if (isClickable) {
      const { clientX, clientY } = event;

      // Get the click position relative to the image
      const rect = event.target.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const marker = hitMarkerRefs[Math.floor(Math.random() * 3)].current;

      if (marker) {
        marker.style.left = `${x}px`; // Assume marker width and height is 30px
        marker.style.top = `${y}px`;
        marker.style.display = "block";
        gsap.fromTo(
          marker,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1.5,
            opacity: 1,
            duration: 0.001,
            ease: "elastic.out",
            onComplete: () => {
              gsap.to(marker, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                  marker.style.display = "none";
                },
              });
            },
          },
        );
        battleClickHandler();
      }
    }
  };

  return (
    <main className="relative flex items-center justify-center w-screen h-screen">
      <div
        ref={healthRef}
        className="absolute flex flex-col items-center justify-center w-full top-1"
      >
        <span className="mb-1 text-2xl text-center text-white ">
          HP:{evilBlood <= 0 ? 0 : evilBlood}
        </span>
        <div className="relative mx-auto h-10 w-72 skew-x-[-38deg] rounded-lg border-4 border-black bg-[#9ba3b9]">
          <div
            className="relative h-full overflow-hidden rounded-sm bg-[#9a000c]"
            style={{
              width: `${Number((evilBlood / 1000).toFixed(2)) * 100}` + "%",
            }}
          >
            <div className=" -bottom-[85%] h-full w-full bg-red-400/80" />
            <div className="w-full h-full rounded-sm left-2 top-2 bg-red-500/50" />
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-fit">
        <Image
          className="-mb-48 hidden content-center items-center justify-center brightness-[.2] md:block"
          src="/assets/game/evil-sloth.svg"
          alt="Bear"
          width={500}
          height={600}
          onClick={handleClick}
          onLoad={handleImageLoad}
          id="hitBear"
          priority
        />
        <Image
          className="-mb-72 brightness-[.1] md:hidden"
          src={blinkBearImg.src}
          alt="Bear"
          id="hitBearMobile"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={600}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onClick={handleClick}
          onLoad={handleImageLoad}
          priority
        />
        <img
          ref={hitMarkerRefB as React.RefObject<HTMLImageElement>}
          src={boomImgB.src}
          className="absolute z-50 hidden w-40 "
          alt="Hit Marker"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
        <img
          ref={hitMarkerRefC as React.RefObject<HTMLImageElement>}
          src={boomImgC.src}
          className="absolute z-50 hidden w-40 "
          alt="Hit Marker"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
        <img
          ref={hitMarkerRefA as React.RefObject<HTMLImageElement>}
          src={boomImgA.src}
          className="absolute z-50 hidden w-40 "
          alt="Hit Marker"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      {countdownRefs.map((ref, i) => {
        return (
          <div
            key={i}
            ref={ref}
            className={
              `absolute top-52 z-20 hidden w-3/4 text-center text-[15rem] text-white` +
              ` ${i === countdownRefs.length - 1 ? "hidden opacity-100" : "opacity-0"}`
            }
            style={{
              textShadow:
                "10px 10px 0 #000, 10px -10px 0 #000, -10px 10px 0 #000, -10px -10px 0 #000, 0 10px 0 #000, 0 -10px 0 #000, 10px 0 #000, -10px 0 #000",
              display: "none",
            }}
          >
            {i + 1}
          </div>
        );
      })}
      <div
        ref={hitHimRef}
        className="absolute top-[15rem] z-20 w-full text-center text-[9rem] font-bold leading-[8rem] text-white opacity-0"
        style={{
          textShadow:
            "8px 8px 0 #000, 8px -8px 0 #000, -8px 8px 0 #000, -8px -8px 0 #000, 0 8px 0 #000, 0 -8px 0 #000, 8px 0 #000, -8px 0 #000",
          display: "none",
        }}
      >
        <h1 className="font-bold">Hit</h1>
        <h1>him</h1>
      </div>
      <img
        className="absolute bottom-0 z-50 h-[38vh] w-full md:hidden"
        src={frontImg.src}
        alt=""
      />
      <img
        src="/assets/game/desktop-footer.png"
        alt="desktop"
        className="absolute bottom-0 z-50 hidden h-[40vh] w-full object-cover md:block"
      />
    </main>
  );
};

export default HitBear;
