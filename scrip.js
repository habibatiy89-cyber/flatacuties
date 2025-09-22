document.addEventListener("DOMContentLoaded", () => {
  const namesList = document.getElementById("names");
  const animalName = document.getElementById("animal-name");
  const animalImg = document.getElementById("animal-img");
  const animalVotes = document.getElementById("animal-votes");
  const voteForm = document.getElementById("vote-form");
  const voteInput = document.getElementById("vote-input");

  let currentAnimal = null;

  // Fetch animals
  fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(data => {
      data.forEach(animal => {
        const li = document.createElement("li");
        li.textContent = animal.name;
        li.addEventListener("click", () => showAnimal(animal));
        namesList.appendChild(li);
      });
    });

  function showAnimal(animal) {
    currentAnimal = animal;
    animalName.textContent = animal.name;
    animalImg.src = animal.image;
    animalImg.alt = animal.name;
    animalVotes.textContent = `Votes: ${animal.votes}`;
  }

  // Add votes
  voteForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!currentAnimal) return;

    const votesToAdd = parseInt(voteInput.value);
    if (!isNaN(votesToAdd)) {
      currentAnimal.votes += votesToAdd;
      animalVotes.textContent = `Votes: ${currentAnimal.votes}`;
    }
    voteInput.value = "";
  });
});
