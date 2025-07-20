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
  <h2 class="mt-20 text-2xl text-center text-white">Who’s your favorite? Don’t say Rick. Or do. Whatever. It’s fine.</h2>
  <div class="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-5" id="familyCards"></div>
  <div class="mt-8 results" id="results"></div>
`;

// Button action
getData.addEventListener('click', () => {
  // Disable
  getData.disabled = true;

  appContainer.innerHTML = html;

  const familyIds = [1, 2, 3, 4, 5];
  const apiURL = `https://rickandmortyapi.com/api/character/${familyIds.join(',')}`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((family) => {
      const container = document.getElementById('familyCards');
      // Create card for each member
      family.forEach((member, index) => {
        const card = document.createElement('div');

        const halfIndex = Math.floor(family.length / 2);

        // once data is received scroll user to the section
        gsap.to(window, {
          duration: 0.5,
          scrollTo: appContainer,
          ease: 'power2.inOut'
        });

        //Create card, add styles and content here
        card.classList.add('bg-white', 'rounded-md', 'p-4', 'cursor-pointer');
        card.innerHTML = `
            <img class="w-full rounded-md" src="${member.image}" alt="${member.name}">
            <h3 class="mt-2 text-center text-base text-dirt">${member.name}</h3>
          `;

        // Animate cards in on load
        animateCardEntrance(card, index);

        card.addEventListener('mouseenter', () => {
          animateCardHover(card, index, halfIndex);
        }); // Event Listener

        // On mouse leave
        card.addEventListener('mouseleave', () => {
          animateCardHoverOut(card);
        });

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
            ease: 'ease.inOut'
          });
        });

        container.appendChild(card);
      });
    });

  //
  // search for firstName and show alternate characters.
  function showCharactersByFirstName(firstName) {
    const results = document.getElementById('results');
    if (firstName == 'Jerry') {
      results.innerHTML = `
  <h2 class="text-center pt-32 text-2xl text-white">
  Okay, so—get this—multiverse stuff. Which version of me, I mean ${firstName} is, uh, your favorite? No wrong answers! Except maybe some.</h2>
  <div class="flex flex-wrap gap-6 justify-center mt-8" id="relatedList">Loading...</div>`;
    } else {
      results.innerHTML = `
  <h2 class="text-center pt-32 text-2xl text-white">
  Okay, so—get this—multiverse stuff. Which version of the ${firstName} is, uh, your favorite? No wrong answers! Except maybe some.</h2>
  <div class="flex flex-wrap gap-6 justify-center mt-8" id="relatedList">Loading...</div>`;
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
          card.classList.add(
            'card',
            'relative',
            'w-52',
            'h-80',
            'perspective',
            'cursor-pointer',
            'rounded-lg'
          );
          card.innerHTML = `
              <div class="card__inner absolute inset-0 transition-transform duration-700 preserve-3d rounded-lg bg-white">
              <div
                class="card__front p-4 absolute inset-0 flex flex-col justify-center items-center text-black text-2xl rounded-lg backface-hidden">
                <img class="w-full  rounded-md" src="${char.image}" alt="${char.name}">
                <h3 class="mt-2 text-center text-base">${char.name}</h3>
                <p class="text-sm">${char.species}</p>
              </div>

              <div
                class="card__back absolute p-4 inset-0 flex justify-center items-center text-black text-sm rounded-lg rotate-y-180 backface-hidden">
                <p>Oh wow, ${char.name} is your favorite? Uh… okay. A ${char.species} from ${char.origin.name}, that's currently ${char.status}. I… I guess that’s cool.</p>
              </div>
            </div>
            `;
          list.appendChild(card);
          // Animate in
          animateCardEntrance(card, index);

          let isClicked = false;
          let hoverTween = null; // Tracks hover animation
          let clickTween = null; // Tracks click animation

          let cardInner = card.querySelector('.card__inner');

          card.addEventListener('mouseenter', () => {
            hoverTween = animateRelatedCardHover(
              cardInner,
              isClicked,
              hoverTween
            );
          });

          card.addEventListener('mouseleave', () => {
            hoverTween = animateRelatedCardHoverOut(
              cardInner,
              isClicked,
              hoverTween
            );
          });

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
      .catch(() => {
        document.getElementById('relatedList').textContent =
          'No characters? Great. Just great. I probably messed something up, didn’t I?';
      });
  }
});

// Animation helpers
function animateCardEntrance(card, index) {
  const randomAngle = randomRotation();
  gsap.from(card, {
    duration: 1,
    y: 50,
    opacity: 0,
    rotate: randomAngle,
    delay: index * 0.2,
    ease: 'power2.out'
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

// Related card animation helpers
// Mouse OVER card
function animateRelatedCardHover(cardInner, isClicked, hoverTween) {
  const randomAngle = randomRotation();
  if (isClicked) return hoverTween;
  if (hoverTween) hoverTween.kill();
  return gsap.to(cardInner, {
    scale: 1,
    duration: 0.3,
    rotate: randomAngle,
    ease: 'power1.out'
  });
}
// Mouse OUT card
function animateRelatedCardHoverOut(cardInner, isClicked, hoverTween) {
  const randomAngle = randomRotation();
  if (isClicked) return hoverTween;
  if (hoverTween) hoverTween.kill();
  return gsap.to(cardInner, {
    scale: 1,
    backgroundColor: '#ffffff', // white
    duration: 0.3,
    rotate: 0,
    rotate: 0,
    ease: 'power1.in'
  });
}

// Click and rotate the card
function animateRelatedCardClick(cardInner, isClicked, hoverTween, clickTween) {
  let newIsClicked = !isClicked;
  if (hoverTween) hoverTween.kill();
  if (clickTween) clickTween.kill();
  let newClickTween;
  if (newIsClicked) {
    // Show back of card
    newClickTween = gsap.to(cardInner, {
      rotationY: 180,
      scale: 1,
      duration: 0.8,
      delay: 0,
      ease: 'power2.inOut'
    });
  } else {
    // Show the front card
    newClickTween = gsap.to(cardInner, {
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      delay: 0,
      ease: 'power2.inOut'
    });
  }
  return { isClicked: newIsClicked, clickTween: newClickTween };
}

// Create a random number to help animate cards
function randomRotation(min = -2, max = 2) {
  let angle = Math.random() * (max - min) + min;
  // Avoid exactly 0 if you want some visible tilt
  if (angle === 0) return randomRotation(min, max);
  return angle;
}
