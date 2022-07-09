const counter = document.querySelector(".count-container__counter"),
  btnStart = document.querySelector(".start"),
  btnPause = document.querySelector(".pause"),
  counterMin = document.querySelector(".count-minutes"),
  counterSec = document.querySelector(".count-seconds"),
  timerTypes = document.querySelectorAll(".type-container__elem");

const timer = {
  timeRemaining: null,
  type: "pomodoro",
  longBreakInterval: 4,
  currentInterval: 0,
  time: {
    pomodoro: 0.1,
    shortBreak: 5,
    longBreak: 15,
  },
  start: function () {
    if (this.timeRemaining == null) {
      this.timeRemaining = this.time.pomodoro * 60;
    }
    interval = setInterval(this.tick, 1000);
  },
  pause: function () {
    this.clear();
    btnStart.style.display = "block";
    btnPause.style.display = "none";
  },
  tick: function () {
    timer.timeRemaining -= 1;
    timerDisplay(timer.timeRemaining);
  },
  clear: function () {
    clearInterval(interval);
  },
};

const timerDisplay = (time) => {
  let min = Math.floor(time / 60),
    sec = time % 60;

  String(min).length == 1
    ? (counterMin.textContent = "0" + min)
    : (counterMin.textContent = min);

  String(sec).length == 1
    ? (counterSec.textContent = "0" + sec)
    : (counterSec.textContent = sec);
};

const clearClass = (arr, className) => {
  arr.forEach((item) => {
    item.classList.remove(className);
  });
};

const switchTypes = (className) => {
  if (className.classList.contains("type-pomodoro")) {
    timer.timeRemaining = timer.time.pomodoro * 60;
    timerDisplay(timer.timeRemaining);
    timer.type = "pomodoro";
  }

  if (className.classList.contains("type-short")) {
    timer.timeRemaining = timer.time.shortBreak * 60;
    timerDisplay(timer.timeRemaining);
    timer.type = "shortBreak";
  }

  if (className.classList.contains("type-long")) {
    timer.timeRemaining = timer.time.longBreak * 60;
    timerDisplay(timer.timeRemaining);
    timer.type = "longBreak";
  }
};

btnStart.addEventListener("click", () => {
  btnStart.style.display = "none";
  btnPause.style.display = "block";
  timer.start();
});

btnPause.addEventListener("click", () => {
  btnStart.style.display = "block";
  btnPause.style.display = "none";
  timer.pause();
});

timerTypes.forEach((item) => {
  item.addEventListener("click", (event) => {
    timer.clear();
    btnStart.style.display = "block";
    btnPause.style.display = "none";

    if (event.target.classList.contains("type-container__elem")) {
      clearClass(timerTypes, "type-container__elem_active");
      item.classList.add("type-container__elem_active");
    }

    switchTypes(item);
  });
});
