document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get input values
    let firstName = e.target.children[0].value;
    let lastName = e.target.children[1].value;
    let country = e.target.children[2].value;
    let score = e.target.children[3].value;
    let err = document.querySelector(".err");

    // Reset error message visibility
    err.style.display = "none";

    // Check for empty fields
    if (firstName.trim() === "" || lastName.trim() === "" || country.trim() === "" || score.trim() === "") {
        err.style.display = "block";
        return;
    }

    // Format current date
    let date = new Date();
    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // Create a new player card
    let playerCard = document.createElement("div");
    playerCard.classList.add("player-card");
    playerCard.innerHTML = `
        <div class="name">
            <p>${firstName} ${lastName}</p>
            <p>${formattedDate}</p>
        </div>
        <p>${country}</p>
        <p class="score">${score}</p>
        <div class="event-box">
            <button class="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                </svg>
            </button>
            <button class="increment">+5</button>
            <button class="decrement">-5</button>
        </div>
    `;

    // Append the new player card to the container
    document.querySelector(".player-container").appendChild(playerCard);

    // Clear input fields
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    e.target.children[2].value = "";
    e.target.children[3].value = "";

    // Event listeners for buttons
    playerCard.querySelector(".delete-btn").addEventListener("click", () => {
        playerCard.remove();
        sortplayer(); // Sort again after deletion
    });

    playerCard.querySelector(".increment").addEventListener("click", () => {
        let scoreElement = playerCard.querySelector(".score");
        scoreElement.textContent = parseInt(scoreElement.textContent) + 5;

        // Automatically sort players after increasing the score
        sortplayer();
    });

    playerCard.querySelector(".decrement").addEventListener("click", () => {
        let scoreElement = playerCard.querySelector(".score");
       
        if (scoreElement.textContent <= 0) {
            alert("Score cannot be less than 0");
        } else {
            scoreElement.textContent = parseInt(scoreElement.textContent) - 5;
        }

        // Automatically sort players after decreasing the score
        sortplayer();
    });

  
    sortplayer();
});

// Sort players by score in descending order
function sortplayer() {
    let playerCards = document.querySelectorAll(".player-card");
    let sortedCards = Array.from(playerCards).sort((a, b) => {
        return parseInt(b.querySelector(".score").textContent) - parseInt(a.querySelector(".score").textContent);
    });

    document.querySelector(".player-container").innerHTML = "";
    sortedCards.forEach(card => document.querySelector(".player-container").appendChild(card));
}
