document.addEventListener("DOMContentLoaded", () => {
  const characterList = document.getElementById("character-bar");
  const characterName = document.getElementById("character-name");
  const characterImage = document.getElementById("character-image");
  const characterVotes = document.getElementById("vote-count");
  const voteForm = document.getElementById("votes-form");

  
  fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => {
          showCharacter(character);
        });
        characterList.appendChild(span);
      });
    });

  function showCharacter(character) {
    characterName.textContent = character.name;
    characterImage.src = character.image;
    characterVotes.textContent = character.votes;

    voteForm.onsubmit = (e) => {
      e.preventDefault();
      const input = e.target.votes.value;
      character.votes += parseInt(input);
      characterVotes.textContent = character.votes;
      e.target.reset();

      
      fetch(`http://localhost:3000/characters/${character.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: character.votes }),
      });
    };
  }
});
