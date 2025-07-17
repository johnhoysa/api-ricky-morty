// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// Register plugins here
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// get family members using API
const getData = document.getElementById('letsStart');
const appContainer = document.getElementById('app');

// Button action
getData.addEventListener('click', () => {
  // Disable
  getData.disabled = true;

  // add html to page
  const html = `
  <h2 class="mt-8 text-xl text-center text-white">Which is your favorite character?</h2>
  <div class="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-5" id="familyCards"></div>
  <div class="mt-8 results" id="results"></div>
`;

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

        // once data is recived scroll user to the section
        gsap.to(window, {
          duration: 0.5,
          scrollTo: '#app',
          offsetY: 152,
          ease: 'power2.inOut'
        });

        //card.className = 'card';
        card.classList.add('bg-white', 'rounded-md', 'p-4', 'cursor-pointer');
        card.innerHTML = `
            <img class="w-full rounded-md" src="${member.image}" alt="${member.name}">
            <h3 class="mt-2 text-center text-base">${member.name}</h3>
          `;

        // Animate cards in on load
        gsap.from(card, {
          duration: 1, // Animation duration
          y: 50, // Move 50px down
          opacity: 0, // Fade in
          delay: index * 0.2, // Stagger delay based on index
          ease: 'power2.out' // Easing function
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
            offsetY: 152,
            delay: 1,
            ease: 'power2.inOut'
          });
        });

        container.appendChild(card);
      });
    });

  // search for member and show alternate characters.
  function showCharactersByFirstName(firstName) {
    const results = document.getElementById('results');
    results.innerHTML = `
  <h2 class="text-center mt-4 text-xl text-white">So which "${firstName}" is your favorite "${firstName}"?</h2>
  <div class="flex flex-wrap gap-4 justify-center" id="relatedList">Loading...</div>`;

    // lets fetch content related to the first name
    fetch(`https://rickandmortyapi.com/api/character/?name=${firstName}`)
      .then((res) => res.json())
      .then((data) => {
        const list = document.getElementById('relatedList');
        list.innerHTML = '';

        data.results.forEach((char, index) => {
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
          gsap.from(card, {
            duration: 1, // Animation duration
            y: 50, // Move 50px down
            opacity: 0, // Fade in
            delay: index * 0.2, // Stagger delay based on index
            ease: 'power2.out' // Easing function
          });
        });
      })
      .catch(() => {
        document.getElementById('relatedList').textContent =
          'No characters found.';
      });
  }
});
