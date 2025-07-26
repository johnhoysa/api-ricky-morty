// Scratch page so I am not pulling data from the API as much.
//
// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// Register plugins here
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// On card click add class
const cards = document.querySelectorAll('#relatedList li.card');
console.log('cards', cards);

cards.forEach((clickedCard) => {
  clickedCard.addEventListener('click', () => {
    cards.forEach((card) => {
      if (card !== clickedCard) {
        card.classList.add('fade-out');
        gsap.to(card, {
          opacity: 0,
          scale: 0.5,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            card.style.display = 'none';
          }
        });
      } else {
        gsap.to(card, {
          x: 80,
          scale: 1.2,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(clickedCard, {
              scale: 1,
              duration: 0.7,
              x: 0,
              ease: 'power1.out'
            });
          }
        });
      }
    });
  });
});
