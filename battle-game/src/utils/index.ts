import gsap from "gsap";

export const revealAnimation = (selector: string) => {
  const tl = gsap.timeline();
   //tl.restart();
//   tl.to("#ImgBg", {
//     rotation: 360,
//     transformOrigin: "center",
//     ease: "elastic.out",
//     duration: 1,
//     repeat: 1,
//   });
  gsap.to(`#${selector}`, {
    rotationX: 360,
    ease: "power1",
    transformOrigin:"center",
    duration: 10,
    repeat: 0,
    zIndex:100,
    transition:"ease"
  });
  //tl.restart();
  
};


