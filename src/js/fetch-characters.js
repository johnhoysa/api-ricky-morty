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
      card.className = 'card';
      card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            
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
  results.innerHTML = `<h2>So which "${firstName}" is your favorite?</h2><div class="related" id="relatedList">Loading...</div>`;

  // lets fetch content related to the first name
  fetch(`https://rickandmortyapi.com/api/character/?name=${firstName}`)
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById('relatedList');
      list.innerHTML = '';

      data.results.forEach((char) => {
        const card = document.createElement('div');
        card.className = 'related-card';
        card.innerHTML = `
              <img src="${char.image}" alt="${char.name}">
              <h4>${char.name}</h4>
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
