// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// Register plugins here
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// get family members using API
const getData = document.getElementById('letsStart');
const appContainer = document.getElementById('app');
// add html to page
const html = `
  <h2 class="mt-20 text-2xl text-center text-white">Which is your favorite character?</h2>
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
          scrollTo: '#app',
          ease: 'power2.inOut'
        });

        //Create card, add styles and content here
        card.classList.add('bg-white', 'rounded-md', 'p-4', 'cursor-pointer');
        card.innerHTML = `
            <img class="w-full rounded-md" src="${member.image}" alt="${member.name}">
            <h3 class="mt-2 text-center text-base">${member.name}</h3>
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
    results.innerHTML = `
  <h2 class="text-center pt-32 text-2xl text-white">So which "${firstName}" is your favorite "${firstName}"?</h2>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 justify-center mt-8" id="relatedList">Loading...</div>`;

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
            'bg-white',
            'rounded-md',
            'p-4',
            'mt-4',
            'text-center',
            'cursor-pointer'
          );
          card.innerHTML = `
              <img class="w-full rounded-md" src="${char.image}" alt="${char.name}">
              <h4 class="text-base">${char.name}</h4>
              <p class="text-sm">${char.species}</p>
            `;
          list.appendChild(card);
          // Animate in
          animateCardEntrance(card, index);

          // Animate Hover
          card.addEventListener('mouseenter', () => {
            animateRelatedCardHover(card);
          });
          // Animate hover out
          card.addEventListener('mouseleave', () => {
            animateRelatedCardHoverOut(card);
          });
        });
      })
      .catch(() => {
        document.getElementById('relatedList').textContent =
          'No characters found.';
      });
  }
});

// Animation helpers
function animateCardEntrance(card, index) {
  gsap.from(card, {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: index * 0.2,
    ease: 'power2.out'
  });
}

function animateCardHover(card, index, halfIndex) {
  gsap.killTweensOf(card);
  gsap.defaults({
    ease: 'ease.out',
    duration: 0.3,
    backgroundColor: '#7CE158',
    scale: 1.02,
    opacity: 1
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

function animateRelatedCardHover(card) {
  const randomAngle = randomRotation();
  gsap.to(card, {
    scale: 1.02,
    backgroundColor: '#7CE158',
    rotate: randomAngle,
    duration: 0.3,
    ease: 'ease.out'
  });
}

function animateRelatedCardHoverOut(card) {
  gsap.to(card, {
    scale: 1,
    backgroundColor: '#ffffff',
    rotate: 0,
    y: 0,
    duration: 0.3,
    ease: 'ease.out'
  });
}
// Create a random number to help animate cards
function randomRotation(min = -2, max = 2) {
  let angle = Math.random() * (max - min) + min;
  // Avoid exactly 0 if you want some visible tilt
  if (angle === 0) return randomRotation(min, max);
  return angle;
}
