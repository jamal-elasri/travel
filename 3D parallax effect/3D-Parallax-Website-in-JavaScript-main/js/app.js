const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main")

let xValue = 0,
  yValue = 0;

  let rotateDegree = 0;

function update (cursorPosition) {
  parallax_el.forEach(el => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    let rotateDegree = (xValue / (window.innerWidth / 2)) * 20 * rotateSpeed;

    el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) 
      rotateY(${rotateDegree}deg)
      translateY(calc(-50% + ${yValue * speedy}px))
      perspective(2300px) translateZ(${zValue * speedz}px)`;
  }); 
}

update(0); 

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);

});

if(window.innerWidth >= 725) {
  main.style.maxHeight = `${Window.innerWidth * 0.6}px`
}else{
  main.style.maxHeight = `${Window.innerWidth * 1.6}px`
}
// ... (existing code)

// GSAP Animation
let timeline = gsap.timeline();

// Target the "bg-img" separately and set its animation at the beginning
timeline.from(".bg-img", {
  top: (index, target) => `${target.offsetHeight / 2 + parseFloat(target.dataset.distance)}px`,
  duration: 3.5,
  ease: "power3.out",
}, "1");

// Target other parallax elements excluding the "text" class and delay their animations
Array.from(parallax_el)
  .filter(el => !el.classList.contains("text") && !el.classList.contains("bg-img"))
  .forEach(el => {
    timeline.from(
      el, {
        top: `${el.offsetHeight / 2 + parseFloat(el.dataset.distance)}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "-=3.5" // Delay these animations by the total duration of the "bg-img" animation
    );
  });

// Target text elements and animate them after a delay
timeline.from(".text", {
  opacity: 0,
  y: 300,
  duration: 5,
  ease: "power3.out",
}, "-=1")
 // Adjust this delay to synchronize with the end of other animations

 .from(".hide", {
  opacity: 0,
  duration: 1.5,
}, "3"); 