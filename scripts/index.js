function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function to count down
async function countDown()
{
  await sleep(1000);
  totalSeconds--;
  console.log(totalSeconds);
}

function convertSecondsToText()
{
  let minutes = Math.floor(totalSeconds/60);
  console.log(minutes);
  let remainingSeconds = totalSeconds - 60*minutes;
  let stringRepresentation = minutes + ":" + remainingSeconds;
  return stringRepresentation;
}

let timerText = document.querySelector("p.timer-text");
// console.log(timerText);
// timerText.textContent = "3:00";
let totalSeconds = 60*parseInt(timerText.textContent.split(":")[0])
               + parseInt(timerText.textContent.split(":")[1]);
console.log(totalSeconds);

let startButton = document.querySelector("button.start-button");
startButton.addEventListener("click", async function()
{
  while(totalSeconds >= 0)
  {
    await countDown();
    timerText.textContent = convertSecondsToText();
  }
});
