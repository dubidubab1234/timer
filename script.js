const showTime = document.querySelector(".show-time");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const reset = document.querySelector(".reset");

let isPaused = false;
let timeInterval;

function zero(num) {
  if (num < 10) {
    let zerofilled = ("00" + num).slice(-2);
    return zerofilled;
  }
  return num;
}

function transfer(minute = 0, second = 0) {
  showTime.innerHTML = "";
  if (second == 60) {
    let hTag = document.createElement("span");
    hTag.innerText = zero(minute + 1) + ":00";
    showTime.appendChild(hTag);
  } else {
    let hTag = document.createElement("span");
    hTag.innerText = zero(minute) + ":" + zero(second);
    showTime.appendChild(hTag);
  }
}

function timer(minutes = 0, seconds = 0) {
  timeInterval = setInterval(() => {
    if (seconds <= 0 && minutes <= 0) {
      clearInterval(timeInterval);
      let audio = new Audio("./winterGlow.mp3");
      audio.play();
      showTime.classList.add("blinking");
    } else if (seconds <= 0) {
      minutes--;
      seconds = 60;
    }

    if (seconds > 0 || minutes > 0) {
      seconds--;
      transfer(minutes, seconds);
    }
  }, 1000);
}

start.addEventListener("click", function (e) {
  clearInterval(timeInterval);

  let minutesValue = minutes.value;
  let secondsValue = seconds.value;
  timer(minutesValue, secondsValue);

  minutes.value = "";
  seconds.value = "";
});

stop.addEventListener("click", function (e) {
  clearInterval(timeInterval);
  transfer(minutesValue, secondsValue);
});

reset.addEventListener("click", function () {
  location.reload(true);
});
