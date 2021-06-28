// one pet name submit:
// hide welcome screen, 
// display name
// display game buttons

let welcomeScreen = document.querySelector("#welcome_screen");
let userPetName = document.getElementById("pet_name_input");
let petName = document.getElementById("pet_name");
let characterContainer = document.querySelector("#character_container");
let gameControlsContainer = document.querySelector("#game_controls_container");
let resetButton = document.querySelector("#btn_reset");
let petAge = document.getElementById("pet_age");
let gameOverScreen = document.querySelector("#game_over_screen")
let isGameOver = false;
let endGamePetName = document.getElementById("end_game_pet_name");
let endGameAge = document.getElementById("end_game_age");

// initial and refresh setup of the game

function beginGame() {
    if (userPetName.value == "") {
        alert("Please provide a pet name.")
    } else {
        petName.innerHTML = userPetName.value;
        welcomeScreen.style.display = "none";
        // userPetName.value = "";
        characterContainer.style.display = "flex";
        gameControlsContainer.style.display = "flex";
        resetButton.style.display = "inline";
        setUpStats();
        updateStats();
    }
}

function endGame() {
    let isGameOver = true;
    characterContainer.style.display = "none";
    gameControlsContainer.style.display = "none";
    welcomeScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    resetButton.style.display = "inline";
    endGamePetName.innerHTML = "R.I.P. " + petName.innerHTML;
    endGameAge.innerHTML = age + " days old";
}

function clearStats() {
    statsBar.forEach(function(stat) {
        stat.style.display = "none";
    });
}


function resetGame () {
    window.location.reload();
}

// starting stats 
let statsHealth = document.querySelector("#stats_health");
let statsHunger = document.querySelector("#stats_hunger");
let statsHappiness = document.querySelector("#stats_happiness");
let statsBar = [statsHealth, statsHunger, statsHappiness];
let age = 0;
let health = 100; 
let hunger = 0;
let happiness = 100;
let upperLimitStats = [100, 0, 100];
let lowerLimitStats = [0, 100, 0];


function setUpStats() {
    statsBar.forEach(function(stat, index) {
        stat.style.display = "block";
        stat.style.width = upperLimitStats[index] + "%";
        stat.innerHTML = upperLimitStats[index] + "%";        
    });
}

function updateStats() {
    // at each pet day
        // hunger ++
        // health --
        // happiness -- by random number
    setInterval(function () {
        if (health > 0 ) {
            health --;
        }; 
        if (hunger < 100 ) {
            hunger ++;
        };
        if (happiness > 0) {
            let happinessDec = Math.floor(Math.random()*10);
            if (happiness - happinessDec < 0) {
                happiness = 0;
            } else {
            happiness = happiness - happinessDec;
            };
        }
        let stats = [health, hunger, happiness];
        statsBar.forEach( function(stat, index) {
            stat.style.width = stats[index] + "%";
            stat.innerHTML = stats[index] + "%";
            }
        );
        if (health === 0 && hunger === 100 && happiness === 0) {
            endGame();
        } else {
            age ++;
            petAge.innerHTML = age + " days old";
        }
    }, 1000);
}


// game control
    // clean: health ++
    // feed: hunger--
    // play: happiness ++

function clean() {
    if (health < 100) {
        health ++;
    } else {
        health = 100;
    };
    statsHealth.width = health + "%";
    statsHealth.innerHTML = health + "%";
}

function feed() {
    if (hunger > 0) {
        hunger --;
    } else {
        hunger = 0;
    }
    statsHunger.width = hunger + "%";
    statsHunger.innerHTML = hunger + "%";
}

function play() {
    if (happiness < 100) {
        let happinessInc = Math.floor(Math.random()*10)
        if (happiness + happinessInc < 100) {
            happiness = happiness + happinessInc;
        } else {
            happiness = 100;
        }
    }
    statsHappiness.width = happiness + "%";
    statsHappiness.innerHTML = happiness + "%";
}




