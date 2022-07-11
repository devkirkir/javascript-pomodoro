const settings = () => {
  let valuePomodoro = document.querySelector("input[name=pomodoro]").value,
    valueShort = document.querySelector("input[name=shortBreak]").value,
    valueLong = document.querySelector("input[name=longBreak]").value,
    valuelongBreakInterval = document.querySelector(
      "input[name=longBreakInterval]"
    ).value,
    allValues = document.querySelectorAll(".set__input"),
    isNaN = false,
    set = {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      longBreakInterval: 4,
    };

  allValues.forEach((item) => {
    if (item.value <= 0 || !parseInt(item.value)) {
      isNaN = true;
    }
  });

  if (!isNaN) {
    set = {
      pomodoro: valuePomodoro,
      shortBreak: valueShort,
      longBreak: valueLong,
      longBreakInterval: valuelongBreakInterval,
    };
  }

  return set;
};

export default settings;
