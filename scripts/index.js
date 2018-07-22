function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function to count down
async function countDown()
{
  await sleep(1000);
  totalSeconds--;
}

function convertSecondsToText()
{
  let minutes = Math.floor(totalSeconds/60);
  let remainingSeconds = totalSeconds - 60*minutes;
  let stringRepresentation = minutes.toString().padStart(2, "0") + ":"
                           + remainingSeconds.toString().padStart(2, "0");
  return stringRepresentation;
}

let timerText = document.querySelector("p.timer-text");
// console.log(timerText);
// timerText.textContent = "3:00";
let totalSeconds = 0;

let paused = false;
let pauseButton = document.createElement("button");
pauseButton.textContent = "Pause";
pauseButton.addEventListener("click", function()
{
  paused = !paused;
  console.log("Paused: ", paused);
  pauseButton.textContent = (pauseButton.textContent == "Pause" ? "Unpause" : "Pause");
});

let pomodoroLength = 25*60;
let breakLength = 5*60;
let longBreakLength = 20*60;

// let pomodoroLength = 25/2.5;
// let breakLength = 5/2.5;
// let longBreakLength = 20/2.5;

let startButton = document.querySelector("button.start-button");
console.log(startButton);
startButton.addEventListener("click", async function()
{
  // remove or change the start button to something else
  let buttonsSpan = document.querySelector("span.buttons");
  console.log(buttonsSpan);
  buttonsSpan.replaceChild(pauseButton, startButton);
  // buttonsSpan.removeChild(startButton);

  timerText.textContent = "25:00";

  console.log("pressed start button!");
  while(true)
  {
    for(let i = 0; i < 4; i++)
    {
      // alert("Pomodoro started!")
      await startTimer(pomodoroLength); // supposed to be 1500 seconds
      alert("Pomodoro completed!");
       // short break
      if(i < 3)
      {
        // alert("Break started!");
        await startTimer(breakLength); // supposed to be 300 seconds
        alert("Break completed!");
      }
      // long break
      else
      {
        // alert("Long break started!");
        await startTimer(longBreakLength) // supposed to be 1200 seconds
        alert("Long break completed!");
      }
    }
  }
});

async function startTimer(seconds)
{
  console.log(seconds == pomodoroLength ? "started timer!" : "started break!");
  // paused = false;
  totalSeconds = seconds;
  while(totalSeconds > 0)
  {
    console.log("Paused: ", paused);
    await countDown();
    if(paused) totalSeconds++;
    timerText.textContent = convertSecondsToText();
  }
}
