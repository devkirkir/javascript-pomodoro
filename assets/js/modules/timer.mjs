import settings from "./settings.mjs";

const timerModule = () => {
  const counterMin = document.querySelector(".count-minutes"),
    counterSec = document.querySelector(".count-seconds"),
    timerTypes = document.querySelectorAll(".type-container__elem"),
    btnStart = document.querySelector(".start"),
    btnPause = document.querySelector(".pause"),
    btnNext = document.querySelector(".next");

  let interval = window.setInterval;

  const timer = {
    timeRemaining: 0,
    isPause: true,
    type: "pomodoro",
    currentInterval: 0,
    longBreakInterval: 4,
    time: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    start: function (type) {
      this.isPause = false;
      if (this.timeRemaining == 0) {
        switchTypes(type);
      }
      interval = setInterval(this.tick, 1000);
    },
    pause: function () {
      this.isPause = true;
      this.clear();
      btnStart.style.display = "block";
      btnPause.style.display = "none";
      btnNext.style.display = "none";
    },
    next: function () {
      // weird function but ok
      if (
        timer.type == "pomodoro" &&
        timer.currentInterval % timer.longBreakInterval == 0
      ) {
        timer.type = "longBreak";
        timer.start(timer.type);
      } else if (timer.type == "pomodoro") {
        timer.type = "shortBreak";
        timer.start(timer.type);
      } else if (timer.type == "shortBreak") {
        timer.type = "pomodoro";
        timer.start(timer.type);
      } else if (timer.type == "longBreak") {
        timer.type = "pomodoro";
        timer.start(timer.type);
      }
      clearClass(timerTypes, "type-container__elem_active");
      document
        .querySelector(`.${timer.type}`)
        .classList.add("type-container__elem_active");
    },
    tick: function () {
      if (timer.timeRemaining <= 0) {
        if (timer.type == "pomodoro") {
          timer.currentInterval += 1;
        }
        timer.clear();
        timer.next();
        return;
      }

      timer.timeRemaining -= 1;
      timerDisplay(timer.timeRemaining);
    },
    clear: function () {
      clearInterval(interval);
    },
  };

  const init = () => {
    switchTypes(timer.type);
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

  const switchTypes = (type) => {
    switch (type) {
      case "pomodoro":
        timer.timeRemaining = timer.time.pomodoro * 60;
        timer.type = "pomodoro";
        break;
      case "shortBreak":
        timer.timeRemaining = timer.time.shortBreak * 60;
        timer.type = "shortBreak";
        break;
      case "longBreak":
        timer.timeRemaining = timer.time.longBreak * 60;
        timer.type = "longBreak";
        break;
    }
    timerDisplay(timer.timeRemaining);
  };

  btnStart.addEventListener("click", () => {
    btnStart.style.display = "none";
    btnPause.style.display = "block";
    btnNext.style.display = "block";
    timer.start(timer.type);
    // interval = setInterval(timer.tick, 1000);
  });

  btnPause.addEventListener("click", () => {
    btnStart.style.display = "block";
    btnPause.style.display = "none";
    btnNext.style.display = "none";
    timer.pause();
  });

  btnNext.addEventListener("click", () => {
    timer.clear();
    if (timer.type == "pomodoro") {
      timer.currentInterval += 1;
    }
    timer.next(timer.type);
    switchTypes(timer.type);
  });

  timerTypes.forEach((item) => {
    timer.isPause = true;
    item.addEventListener("click", (event) => {
      if (timer.isPause == false) {
        timer.clear();
      }

      btnStart.style.display = "block";
      btnPause.style.display = "none";
      btnNext.style.display = "none";

      if (event.target.classList.contains("type-container__elem")) {
        clearClass(timerTypes, "type-container__elem_active");
        item.classList.add("type-container__elem_active");
      }

      switchTypes(item.classList[1]);
    });
  });

  document.querySelector(".apply").addEventListener("click", () => {
    let { pomodoro, shortBreak, longBreak, longBreakInterval } = settings();
    timer.time.pomodoro = pomodoro;
    timer.time.shortBreak = shortBreak;
    timer.time.longBreak = longBreak;
    timer.longBreakInterval = longBreakInterval;

    document
      .querySelector(".modal-settings")
      .classList.remove("modal-settings_active");
    document.querySelector(".layout").style.display = "none";

    switchTypes(timer.type);
  });

  init();
};

export default timerModule;