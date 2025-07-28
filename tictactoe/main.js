gsap.fromTo("#myElement", { /* from properties */ }, { /* to properties */ });
const Hero = document.querySelector('.hero');
const login_btn = document.querySelector('.game-button');
const slider = document.querySelector('.slider');
const sideCharacter = document.querySelector('.backgroundCharacter');
// const sub_header = document.querySelector('.sub-header');

// const cover1 = document.querySelector('.cover-1');
// const cover2 = document.querySelector('.cover-2');
// const cover3 = document.querySelector('.cover-3');
// const cover4 = document.querySelector('.cover-4');

const header = document.querySelector('.header');
// const live = document.querySelector('.live');
// const footer = document.querySelector('.footer');

// const modal_obj = document.querySelector('.modal');


const tl = new TimelineMax();
tl.fromTo(sideCharacter,1,{height:"100%"},{height:'80vmin',ease: Power2.easeInOut})
// .fromTo(Hero,1,{height:"0%"},{height:'80%',ease: Power2.easeInOut})
// .fromTo(Hero,1,{width: '100%'},{width: '80%',ease: Power2.easeInOut})
// .fromTo(Hero,1,{height:"100%"},{height:'80vmin',ease: Power2.easeInOut})
// .fromTo(Hero,1,{width: '80%'},{width: '220vmin',ease: Power2.easeInOut})
.fromTo(slider,1,{height:"80%"},{height:'90vmin',ease: Power2.easeInOut})
.fromTo(slider,1,{width:"80vmin"},{width:'120vmin',ease: Power2.easeInOut})
.fromTo(header,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")
// .fromTo(cover2,1,{height:"0%"},{height:'80%',ease: Power2.easeInOut})
// .fromTo(cover2,0.3,{width: '100%'},{width: '80%',ease: Power2.easeInOut})
// .fromTo(cover3,1,{height:"0%"},{height:'80%',ease: Power2.easeInOut})
// .fromTo(cover3,0.3,{width: '100%'},{width: '80%',ease: Power2.easeInOut})
// .fromTo(cover4,1,{height:"0%"},{height:'80%',ease: Power2.easeInOut})
// .fromTo(cover4,0.3,{width: '100%'},{width: '80%',ease: Power2.easeInOut})
// .fromTo(cover1,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5") 
// .fromTo(cover2,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5") 
// .fromTo(cover3,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")
// .fromTo(cover4,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")
// // .fromTo(header,1,{height:"0%"},{height:'80%',ease: Power2.easeInOut})
// // .fromTo(header,0.3,{width: '100%'},{width: '80%',ease: Power2.easeInOut})
// // .fromTo(header,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")
// .fromTo(live,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")
// .fromTo(footer,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")
// .fromTo(modal_obj,0.5,{opacity:'0',x:'30'},{opacity:'1',x:'0'},"-=0.5")



tl.fromTo(login_btn,1,{height:"0%"},{height:"100%",ease: Power2.easeInOut});
  