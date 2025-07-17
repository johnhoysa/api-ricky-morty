// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// Register plugins here
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// get family members using API
const getData = document.getElementById('letsStart');
const appContainer = document.getElementById('app');

const container = document.getElementById('familyCards');
const cards = container.querySelectorAll('div');
// Create card for each member
cards.forEach((card, index) => {
  // Animate cards in on load
  gsap.from(card, {
    duration: 1, // Animation duration
    y: 50, // Move 50px down
    opacity: 0, // Fade in
    delay: index * 0.2, // Stagger delay based on index
    ease: 'power2.out' // Easing function
  });

  const halfIndex = Math.floor(cards.length / 2);

  // On Card Hover
  card.addEventListener('mouseenter', () => {
    // Clear previous tweens on this element
    gsap.killTweensOf(card);
    //
    if (index < halfIndex) {
      // Animation A: slide left and rotate
      gsap.to(card, {
        scale: 1.02,
        backgroundColor: '#7CE158',
        rotation: -4,
        duration: 0.3,
        ease: 'ease.out'
      });
    } else if (index > halfIndex) {
      // Animation B: slide right and rotate opposite
      gsap.to(card, {
        scale: 1.02,
        backgroundColor: '#7CE158',
        rotation: 4,
        duration: 0.3,
        ease: 'ease.out'
      });
    } else {
      // Animation C: scale and bounce
      gsap.to(card, {
        scale: 1.02,
        backgroundColor: '#7CE158',
        y: -8,
        duration: 0.3,
        ease: 'ease.out'
      });
    }
  }); // Event Listener

  // On mouse leave
  card.addEventListener('mouseleave', () => {
    // REset so only need one animation
    gsap.to(card, {
      scale: 1,
      backgroundColor: '#ffffff',
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: 'ease.out'
    });
  });

  //
  // On card click
  card.addEventListener('click', () => {
    const firstName = member.name.split(' ')[0];
    // pass member name to step 2.
    showCharactersByFirstName(firstName);
    // SCroll to next section
    gsap.to(window, {
      duration: 0.5,
      scrollTo: '#results',
      delay: 0.5,
      y: 0,
      ease: 'ease.inOut'
    });
  });
});
