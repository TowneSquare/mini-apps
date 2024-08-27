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

  tl.restart();

  return tl.to(`#${selector}`, {
    rotationY: 360,
    ease: "power1",
    transformOrigin: "50% 0",
    duration: 1,
    repeat: 0,
    zIndex: 100,
    transition: "ease",
  });
};

export function removeSpaceAndHash(input: string | undefined) {
  if (!input) {
    return;
  }
  return input.replace(/[\s#]/g, "");
}

export function transferClassToElement(className: string, traitName: string) {
  console.log(traitName, "nnamma");
  // Select all elements with the class
  let elements = document.querySelectorAll(".animate-fade-down");
  const toElement = document.querySelector(`.${traitName}`);
  console.log(toElement, "toElement");

  // Loop through the elements and remove the class
  console.log(elements, "elements");
  elements.forEach(function (element) {
    element.classList.remove(className);
  });

  // Add the class to the target element
  toElement?.classList.add(className);
}

