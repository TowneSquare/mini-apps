import gsap from "gsap";

export const revealAnimation = (selector: string) => {
  const tl = gsap.timeline();
   tl.restart();
//   tl.to("#ImgBg", {
//     rotation: 360,
//     transformOrigin: "center",
//     ease: "elastic.out",
//     duration: 1,
//     repeat: 1,
//   });
  tl.to(`#${selector}`, {
    translateZ: 360,
    ease: "circ.inOut",
    transformOrigin:"center",
    duration: 10,
    repeat: 1,
  });
  tl.restart();
  
};
