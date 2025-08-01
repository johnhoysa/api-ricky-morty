// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// Register plugins here
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// get family members using API
const getData = document.getElementById('letsStart'); // Rename this variable and element
const appContainer = document.getElementById('appRickMorty');
// add intial html to page
const html = `
  <h2 class="mt-20 text-2xl text-center text-white">Who's your favorite? Don't say Rick. Or do. Whatever. It's fine.</h2>
  <div class="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-5" id="familyCards" aria-live="polite"></div>
  <div class="mt-20 results" id="results"></div>
`;

// Button action
if (getData) {
  getData.addEventListener('click', () => {
    // Disable
    getData.disabled = true;
    appContainer.innerHTML = html;

    // if user requested a reset, place the element back in place
    gsap.to(appContainer, {
      opacity: 1,
      autoAlpha: 1,
      y: 0,
      backgroundColor: 'transparent',
      duration: 0,
      ease: 'ease.out'
    });

    // 1-5 are the family members
    const familyIds = [1, 2, 3, 4, 5];
    const apiURL = `https://rickandmortyapi.com/api/character/${familyIds.join(',')}`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((family) => {
        const container = document.getElementById('familyCards');
        // Create card for each member
        family.forEach((member, index) => {
          // Create each card
          const card = document.createElement('div');
          // create variable to determine which animation to use
          const halfIndex = Math.floor(family.length / 2);

          // once data is received scroll user to the section

          //Create card and add content
          card.classList.add('bg-white', 'rounded-md', 'p-4', 'cursor-pointer');
          card.innerHTML = `
            <img class="w-full rounded-md" src="${member.image}" alt="${member.name}">
            <h3 class="mt-2 text-center text-base text-dirt">${member.name}</h3>
          `;

          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: '#appRickMorty', offsetY: 50 }
          });

          // Animate cards in on load
          animateCardEntrance(card, index);

          // On mouse enter
          card.addEventListener('mouseenter', () => {
            animateCardHover(card, index, halfIndex);
          });

          // On mouse leave
          card.addEventListener('mouseleave', () => {
            animateCardHoverOut(card);
          });

          // On card click
          card.addEventListener('click', () => {
            const firstName = member.name.split(' ')[0];
            // pass member name to step 2.
            showCharactersByFirstName(firstName);
            // Scroll to next section
            gsap.to(window, {
              duration: 0.5,
              // scrollTo: '#results',
              scrollTo: { y: '#results', offsetY: 50 },
              delay: 0.5,
              ease: 'ease.out'
            });
          });

          container.appendChild(card);
        });
      });

    //
    //
    // search for firstName and show alternate characters.
    //
    //
    function showCharactersByFirstName(firstName) {
      const results = document.getElementById('results');
      // Show header to section 2
      if (firstName == 'Jerry') {
        results.innerHTML = `
  <h2 class="text-center text-2xl text-white w-full lg:w-3/5 mx-auto">
  Okay, so, get this, multiverse stuff. Which version of me, I mean ${firstName} is, uh, your favorite? No wrong answers! Except maybe some.</h2>
  <div class="flex flex-wrap gap-6 justify-center mt-8 text-white" id="relatedList" aria-live="polite">Loading...</div>`;
      } else {
        results.innerHTML = `
  <h2 class="text-center text-2xl text-white w-full lg:w-3/5 mx-auto">
  Okay, so, get this, multiverse stuff. Which version of the ${firstName} is, uh, your favorite? No wrong answers! Except maybe some.</h2>
  <div class="flex text-white flex-wrap gap-6 justify-center mt-8" id="relatedList" aria-live="polite">Loading...</div>`;
      }

      // lets fetch content related to the first name
      fetch(`https://rickandmortyapi.com/api/character/?name=${firstName}`)
        .then((res) => res.json())
        .then((data) => {
          const list = document.getElementById('relatedList');
          list.innerHTML = '';

          data.results.forEach((char, index) => {
            // Create cards and styles
            const card = document.createElement('div');

            // Default message for card backs
            let cardBack = `<p>Oh wow, ${char.name} is your favorite? Uh… okay. A ${char.species} from ${char.origin.name}, that's currently ${char.status}. I… I guess that's cool.</p>`;

            // Create custom messages for specific characters
            // If Rick, human
            if (char.id == 1) {
              cardBack = `<p>Oh. Rick? Yeah. Of course. Everyone loves Rick. Genius, multiverse, portal gun… blah blah blah.</p>`;
            }
            // If Morty, human
            if (char.id == 2) {
              cardBack = `<p>You picked Morty? That's awesome! I mean, I raised him, y'know. Well—Beth and I. Mostly Beth. But I was there!</p>`;
            }
            if (char.id == 118) {
              cardBack = `<p>Wait… Morty's in charge of a shadow government now? Since when does he get to be the smart one?</p>`;
            }
            // If Summer, human
            if (char.id == 3) {
              cardBack = `<p>Oh, totally! Summer's awesome. Just yesterday she told me to 'stop being weird' and I was like… wow, strong leadership.</p>`;
            }
            if (char.id == 338) {
              cardBack = `<p>You know things are bad when your teenage daughter adapts to post-collapse society faster than you adapt to a standing desk.</p>`;
            }

            // If Beth, human
            if (char.id == 4) {
              cardBack = `<p>Beth's your favorite? Yeah, same! I mean, if I didn't say that, I'd probably be sleeping on the couch.</p>`;
            }
            if (char.id == 667) {
              cardBack = `<p>She's like Beth if Beth had no filter, no mercy, and absolutely no patience for me.</p>`;
            }

            // if Jerry, human
            if (char.id == 5) {
              cardBack = `<p>I'm your favorite? Oh jeez… Beth! Beth, did you hear that? Somebody actually likes me!</p>`;
            }
            if (char.id == 310) {
              cardBack = `<p>Wow, Self-Congratulatory Jerry? That guy gets it. We celebrate the small wins. Like waking up. And breathing.</p>`;
            }

            card.classList.add(
              'card',
              'relative',
              'w-36',
              'h-64',
              'md:w-52',
              'md:h-80',
              'perspective',
              'cursor-pointer',
              'rounded-lg'
            );
            card.innerHTML = `
              <div class="card__inner absolute inset-0 transition-transform duration-700 preserve-3d rounded-lg bg-white">
              <div
                class="card__front p-4 absolute inset-0 flex flex-col justify-center items-center text-black text-2xl rounded-lg backface-hidden">
                <img class="w-full h-auto rounded-md" src="${char.image}" alt="${char.name}">
                <h3 class="mt-2 text-center text-base">${char.name}</h3>
                <p class="text-sm">${char.species}</p>
              </div>

              <div
                class="card__back absolute p-4 inset-0 flex justify-center items-center text-black text-sm rounded-lg rotate-y-180 backface-hidden bg-[#22A2BD]">
               ${cardBack}
              </div>
            </div>
            `;
            list.appendChild(card);
            // Animate cards in
            animateCardEntrance(card, index);

            let isClicked = false; // tracks if card clicked
            let hoverTween = null; // Tracks hover animation
            let clickTween = null; // Tracks click animation

            let cardInner = card.querySelector('.card__inner');

            // mouse enter
            card.addEventListener('mouseenter', () => {
              hoverTween = animateRelatedCardHover(
                cardInner,
                isClicked,
                hoverTween
              );
            });

            // mouse leave
            card.addEventListener('mouseleave', () => {
              hoverTween = animateRelatedCardHoverOut(
                cardInner,
                isClicked,
                hoverTween
              );
            });

            // mouse click
            card.addEventListener('click', () => {
              const result = animateRelatedCardClick(
                cardInner,
                isClicked,
                hoverTween,
                clickTween
              );
              isClicked = result.isClicked;
              clickTween = result.clickTween;
            });
          });
        })
        // Error  message
        .catch(() => {
          document.getElementById('relatedList').textContent =
            `No characters? Great. Just great. I probably messed something up, didn't I?`;
        });
    }
  });
}
// Animations for family
//
function animateCardEntrance(card, index) {
  const randomAngle = randomRotation();
  gsap.from(card, {
    duration: 1,
    y: 50,
    opacity: 0,
    rotate: randomAngle,
    delay: index * 0.2
  });
}

function animateCardHover(card, index, halfIndex) {
  gsap.killTweensOf(card);
  gsap.defaults({
    ease: 'ease.out',
    duration: 0.3,
    backgroundColor: '#7CE158', // Green
    scale: 1.02,
    opacity: 1,
    autoAlpha: 1
  });
  if (index < halfIndex) {
    gsap.to(card, {
      rotation: -4
    });
  } else if (index > halfIndex) {
    gsap.to(card, {
      rotation: 4
    });
  } else {
    gsap.to(card, {
      y: -8
    });
  }
}

function animateCardHoverOut(card) {
  gsap.to(card, {
    scale: 1,
    backgroundColor: '#ffffff',
    rotation: 0,
    y: 0,
    duration: 0.3,
    ease: 'ease.out'
  });
}

// Animations for related cards
//
// Mouse OVER card
function animateRelatedCardHover(cardInner, isClicked, hoverTween) {
  const randomAngle = randomRotation();
  if (isClicked) return hoverTween;
  if (hoverTween) hoverTween.kill();
  //
  return gsap.to(cardInner, {
    scale: 1,
    duration: 0.3,
    rotate: randomAngle,
    ease: 'ease.out'
  });
}
// Mouse OUT card
function animateRelatedCardHoverOut(cardInner, isClicked, hoverTween) {
  //
  const randomAngle = randomRotation();
  //
  if (isClicked) return hoverTween;
  if (hoverTween) hoverTween.kill();
  //
  return gsap.to(cardInner, {
    scale: 1,
    backgroundColor: '#ffffff', // white
    duration: 0.3,
    rotate: 0,
    rotate: 0,
    ease: 'ease.out'
  });
}

// Click
function animateRelatedCardClick(cardInner, isClicked, hoverTween, clickTween) {
  // Toggle click state
  const newIsClicked = !isClicked;
  if (hoverTween) hoverTween.kill();
  if (clickTween) clickTween.kill();
  let newClickTween = clickTween;

  if (newIsClicked) {
    newClickTween = gsap.to(cardInner, {
      rotationY: 180,
      scale: 1,
      duration: 0.8,
      delay: 0,
      ease: 'ease.out',
      onComplete: () => fadeOutOtherRelatedCards(cardInner)
    });
  } else {
    // Optionally, animate flipping back to front
    newClickTween = gsap.to(cardInner, {
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      delay: 0,
      ease: 'ease.out',
      onComplete: () => restoreAllRelatedCards()
    });
  }
  return { isClicked: newIsClicked, clickTween: newClickTween };
}

// Helper: Fade out all other related cards except the clicked one
function fadeOutOtherRelatedCards(clickedCardInner) {
  const relatedList = document.querySelector('#relatedList');
  const allCards = document.querySelectorAll('#relatedList > .card');
  allCards.forEach((card) => {
    const cardInner = card.querySelector('.card__inner');
    if (cardInner === clickedCardInner) {
      // ACTIVE CARD
      card.classList.add('clicked-on');
      gsap.to(card, {
        y: 108,
        scale: 1.2,
        duration: 0.7,
        ease: 'ease.out',
        onComplete: () => {
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: '#results', offsetY: 50 },
            ease: 'ease.out'
          });

          gsap.to(card, {
            scale: 1,
            duration: 0.7,
            y: 0,
            ease: 'ease.out',
            onComplete: () => {
              console.log('Party Time 1999');
              // want cool animation here to celebrate choosing a favorite
              //
            }
          });
          //
          // add button to page to reset selection
          relatedList.insertAdjacentHTML(
            'afterend',
            '<button id="resetApp" class="block text-center mx-auto mt-8 px-4 py-2 border-2 border-[#7CE158] text-white rounded transition-colors duration-300 hover:bg-[#7CE158] hover:text-white  bg-[#22A2BD]">Pick another Favorite?</button>'
          );
          //
          resetCards();
        }
      });
    }
    // CARDS TO FADE OUT
    else {
      card.classList.add('fade-me-out');
      gsap.to(card, {
        opacity: 0,
        scale: 0.2,
        duration: 0.7,
        ease: 'ease.out',
        onComplete: () => {
          card.style.display = 'none';
        }
      });
    }
  });
}
// Helper: Restore all related cards to normal state
function resetCards() {
  const resetApp = document.querySelector('#resetApp');
  resetApp.addEventListener('click', () => {
    // scroll up and hide content that was there
    gsap.to(window, {
      duration: 1,
      scrollTo: 'body',
      onComplete: () => {
        getData.disabled = false;
        gsap.to(appContainer, {
          opacity: 0,
          y: 300,
          backgroundColor: 'transparent',
          duration: 0.7,
          ease: 'ease.out',
          onComplete: () => {
            appContainer.innerHTML = '';
          }
        });
      }
    });
  });
}

// Helper: Restore all related cards to normal state
function restoreAllRelatedCards() {
  const allCards = document.querySelectorAll('.card__inner');
  allCards.forEach((card) => {
    card.classList.remove('faded-out');
    gsap.to(card, {
      opacity: 1,
      filter: 'none',
      duration: 0.5,
      pointerEvents: 'auto'
    });
  });
}

// Create a random number to help animate cards
function randomRotation(min = -2, max = 2) {
  let angle = Math.random() * (max - min) + min;
  // Avoid exactly 0 if you want some visible tilt
  if (angle === 0) return randomRotation(min, max);
  return angle;
}
