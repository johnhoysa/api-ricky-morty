// Scratch page so I am not pulling data from the API as much.
//
// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// Register plugins here
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// On card click add class
const relatedList = document.querySelector('#relatedList');
const cards = document.querySelectorAll('#relatedList li.card');
console.log('cards', cards);

cards.forEach((clickedCard) => {
  clickedCard.addEventListener('click', () => {
    // click a card and hide non clicked cards
    //
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
            //
            // add button to reset
            relatedList.insertAdjacentHTML(
              'afterend',
              '<button id="resetApp" class="block text-center mx-auto mt-8 px-4 py-2 border-2 border-[#7CE158] text-white rounded transition-colors duration-300 hover:bg-[#7CE158] hover:text-white  bg-[#22A2BD]">Pick another Favorite?</button>'
            );
            //
            const resetApp = document.querySelector('#resetApp');
            resetApp.addEventListener('click', () => {
              console.log('reset asked for');
            });
          }
        });
      }
      //
    }); // end of if clicked
    //

    //
  }); // end of event listener
}); // end of CARDS
