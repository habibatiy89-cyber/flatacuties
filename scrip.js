document.addEventListener("DOMContentLoaded", () => {
  const namesList = document.querySelectorAll("#names li");
  const animalName = document.getElementById("animal-name");
  const animalImg = document.getElementById("animal-img");
  const animalVotes = document.getElementById("animal-votes");
  const voteForm = document.getElementById("vote-form");
  const voteInput = document.getElementById("vote-input");

  let currentAnimal = null;

  // When you click an animal
  namesList.forEach((item) => {
    item.addEventListener("click", () => {
      currentAnimal = item;
      const name = item.textContent.trim();
      const img = item.dataset.image;
      const votes = item.dataset.votes;

      // Show animal details
      animalName.textContent = name;
      animalImg.src = img;
      animalVotes.textContent = `Votes: ${votes}`;
    });
  });

  // Voting
  voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentAnimal) {
      alert("Please select an animal first!");
      return;
    }

    const addedVotes = parseInt(voteInput.value, 10);
    if (isNaN(addedVotes) || addedVotes < 0) {
      alert("Enter a valid number of votes.");
      return;
    }

    let currentVotes = parseInt(currentAnimal.dataset.votes, 10);
    currentVotes += addedVotes;

    // Update dataset + details
    currentAnimal.dataset.votes = currentVotes;
    animalVotes.textContent = `Votes: ${currentVotes}`;
    voteInput.value = "";
  });
});
