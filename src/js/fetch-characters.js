// get family members using API
const familyIds = [1, 2, 3, 4, 5];
const apiURL = `https://rickandmortyapi.com/api/character/${familyIds.join(',')}`;

fetch(apiURL)
  .then((res) => res.json())
  .then((family) => {
    const container = document.getElementById('familyCards');

    // Create card for each member
    family.forEach((member) => {
      const card = document.createElement('div');
      //card.className = 'card';
      card.classList.add('bg-white', 'rounded-md', 'p-2');
      card.innerHTML = `
            <img class="w-full rounded-md" src="${member.image}" alt="${member.name}">
            <h3 class="mt-2 text-center text-base">${member.name}</h3>
          `;
      // On card click
      card.addEventListener('click', () => {
        const firstName = member.name.split(' ')[0];
        // pass member name to step 2.
        showCharactersByFirstName(firstName);
      });

      container.appendChild(card);
    });
  });

// search for member and show alternate characters.
function showCharactersByFirstName(firstName) {
  const results = document.getElementById('results');
  results.innerHTML = `
  <h2 class="text-center mt-4 text-xl">So which "${firstName}" is your favorite?</h2>
  <div class="flex flex-wrap gap-4 justify-center" id="relatedList">Loading...</div>`;

  // lets fetch content related to the first name
  fetch(`https://rickandmortyapi.com/api/character/?name=${firstName}`)
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById('relatedList');
      list.innerHTML = '';

      data.results.forEach((char) => {
        const card = document.createElement('div');
        card.classList.add(
          'bg-white',
          'rounded-md',
          'p-2',
          'mt-4',
          'text-center'
        );
        card.innerHTML = `
              <img class="w-full rounded-md" src="${char.image}" alt="${char.name}">
              <h4 class="text-base">${char.name}</h4>
              <p class="text-sm">${char.species}</p>
            `;
        list.appendChild(card);
      });
    })
    .catch(() => {
      document.getElementById('relatedList').textContent =
        'No characters found.';
    });
}
