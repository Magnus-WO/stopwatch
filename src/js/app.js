// selecting elements
const millisecondsContainer = document.querySelector(".timer__milliseconds");
const secondsContainer = document.querySelector(".timer__seconds");
const minutesContainer = document.querySelector(".timer__minutes");
const hoursContainer = document.querySelector(".timer__hours");

const controlsButton = document.querySelectorAll(".controls__button");

const startButton = document.querySelector(".controls__button--start");
const pauseButton = document.querySelector(".controls__button--pause");
const resetButton = document.querySelector(".controls__button--reset");

const controlsGuide = document.querySelector(".stopwatch__guide");

// declaring variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerStatus = null;

// function to handle the increment logic
const handleIncrement = () => {
  milliseconds += 10;
  if (milliseconds === 1000) {
    seconds++;
    milliseconds = 0;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
      if (minutes === 60) {
        hours++;
        minutes = 0;
      }
    }
  }
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedHours = hours < 10 ? "0" + hours : hours;

  millisecondsContainer.textContent = milliseconds;
  secondsContainer.textContent = formattedSeconds;
  minutesContainer.textContent = formattedMinutes;
  hoursContainer.textContent = formattedHours;
};

//adding control for the start-button
const handleControls = (e) => {
  if (e.target.classList.contains("controls__button--start")) {
    pauseButton.textContent = "Pause";
    startButton.textContent = "Start";
    controlsGuide.style.visibility = "hidden";
    if (timerStatus !== null) {
      clearInterval(timerStatus);
    }
    timerStatus = setInterval(handleIncrement, 10);

    //pressing the pause button
  } else if (e.target.classList.contains("controls__button--pause")) {
    clearInterval(timerStatus);
    pauseButton.textContent = "Paused";
    startButton.textContent = "Resume";
    controlsGuide.style.visibility = "visible";

    //pressing the reset button
  } else if (e.target.classList.contains("controls__button--reset")) {
    clearInterval(timerStatus);
    controlsGuide.style.visibility = "hidden";

    startButton.classList.add("controls__button--start");
    pauseButton.textContent = "Pause";
    startButton.textContent = "Start";

    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    millisecondsContainer.textContent = "000";
    secondsContainer.textContent = "00";
    minutesContainer.textContent = "00";
    hoursContainer.textContent = "00";
  }
};

//adding events to the buttons
startButton.addEventListener("click", handleControls);
pauseButton.addEventListener("click", handleControls);
resetButton.addEventListener("click", handleControls);
