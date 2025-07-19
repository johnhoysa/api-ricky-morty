// Scratch page so I am not pulling data from the API as much.
//
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
const cards = container.querySelectorAll('.card');

const halfIndex = Math.floor(cards.length / 2);

// Create card for each member
cards.forEach((card, index) => {
  let cardInner = card.querySelector('.card__inner');

  // Animate cards in on load
  gsap.from(card, {
    duration: 1, // Animation duration
    y: 50, // Move 50px down
    opacity: 0, // Fade in
    delay: index * 0.2, // Stagger delay based on index
    ease: 'power2.out' // Easing function
  });

  let isClicked = false;
  let hoverTween = null; // Tracks hover animation
  let clickTween = null; // Tracks click animation

  // Mouse Enter
  card.addEventListener('mouseenter', () => {
    if (isClicked) return; // Skip if already clicked
    // Kill any existing hover animation
    if (hoverTween) hoverTween.kill();

    hoverTween = gsap.to(cardInner, {
      scale: 1,
      backgroundColor: '#3b82f6', // hover to make blue-600
      duration: 0.3,
      ease: 'power1.out'
    });
  });

  // Mouse Leave
  card.addEventListener('mouseleave', () => {
    if (isClicked) return; // Skip if clicked
    if (hoverTween) hoverTween.kill();

    hoverTween = gsap.to(cardInner, {
      scale: 1,
      backgroundColor: '#fff', // Reset color to white
      duration: 0.3,
      ease: 'power1.in'
    });
  });

  // Click
  card.addEventListener('click', () => {
    isClicked = !isClicked; // Toggle clicked state

    // Kill hover animation so they don’t conflict
    if (hoverTween) hoverTween.kill();

    if (clickTween) clickTween.kill();

    if (isClicked) {
      // Play click animation
      clickTween = gsap.to(cardInner, {
        rotationY: 180,
        scale: 1,
        //backgroundColor: '#ef4444', // Tailwind red-500
        duration: 0.8,
        ease: 'power2.inOut'
      });
    } else {
      // Reset to Hover on second click
      clickTween = gsap.to(cardInner, {
        rotationY: 0,
        scale: 1,
        // backgroundColor: '#3b82f6', // Reset color
        duration: 0.8,
        ease: 'power2.inOut'
      });
      isClicked = isClicked;
    }
  });
  //
});
