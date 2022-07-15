const tasks = () => {
  const tasksContainer = document.querySelector(".tasks-list"),
    btnAddTask = document.querySelector(".control-elems__add"),
    formAdd = document.querySelector(".create-task-form"),
    formAddBtn = document.querySelector(".add-btn"),
    formCancelBtn = document.querySelector(".cancel-btn");

  function init() {
    getData();
  }

  function getData() {
    let promise = fetch("assets/js/data.json").then((res) =>
      res.json().then((data) =>
        data.forEach((item) => {
          createTasks(item);
        })
      )
    );
  }

  function isChekboxCheked(checkbox, isCheked) {
    if (isCheked) {
      checkbox.checked = true;
    }
  }

  function displayTime(time, minContainer, secContainer) {
    let min = Math.floor(time / 60),
      sec = time % 60;

    String(min).length == 1
      ? (minContainer.textContent = "0" + min)
      : (minContainer.textContent = min);

    String(sec).length == 1
      ? (secContainer.textContent = "0" + sec)
      : (secContainer.textContent = sec);
  }

  function createTasks(obj) {
    if (obj.taskTitle.length <= 0 || obj.pomodorosNeed <= 0) {
      alert("Less then 1 characters length");
      return;
    }

    const container = document.createElement("div"),
      checkboxContainer = document.createElement("div"),
      checkboxInput = document.createElement("input"),
      checkboxLabel = document.createElement("label"),
      taskName = document.createElement("p"),
      taskStatContainer = document.createElement("div"),
      taskStatQuanity = document.createElement("span"),
      taskStatQuanityCurrent = document.createElement("span"),
      taskStatQuanityDivider = document.createElement("span"),
      taskStatQuanityNeed = document.createElement("span"),
      taskStatTimeContainer = document.createElement("span"),
      taskStatTimeSec = document.createElement("span"),
      taskStatTimeMin = document.createElement("span"),
      taskStatTimeDivider = document.createElement("span");

    container.setAttribute("class", "tasks-list__elem task");
    checkboxContainer.setAttribute("class", "checkbox-container");
    checkboxInput.setAttribute("class", "checkbox");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("name", "task-done");
    checkboxLabel.setAttribute("for", "task-done");
    taskName.setAttribute("class", "task-title");
    taskStatContainer.setAttribute("class", "task-stat");
    taskStatQuanity.setAttribute("class", "task-stat__quanity");
    taskStatQuanityCurrent.setAttribute("class", "current");
    taskStatQuanityNeed.setAttribute("class", "need");
    taskStatTimeContainer.setAttribute("class", "task-stat__time");
    taskStatTimeMin.setAttribute("class", "task-stat__min");
    taskStatTimeDivider.setAttribute("class", "task-stat__divider");
    taskStatTimeSec.setAttribute("class", "task-stat__sec");

    taskName.textContent = obj.taskTitle;
    taskStatQuanityCurrent.textContent = obj.currentPomodoros;
    taskStatQuanityDivider.textContent = "/";
    taskStatTimeDivider.textContent = ":";
    taskStatQuanityNeed.textContent = obj.pomodorosNeed;

    isChekboxCheked(checkboxInput, obj.isDone);

    displayTime(obj.time, taskStatTimeMin, taskStatTimeSec);

    tasksContainer.append(container);
    container.append(checkboxContainer);
    checkboxContainer.append(checkboxInput);
    checkboxContainer.append(checkboxLabel);
    container.append(taskName);
    container.append(taskStatContainer);
    taskStatContainer.append(taskStatQuanity);
    taskStatQuanity.append(taskStatQuanityCurrent);
    taskStatQuanity.append(taskStatQuanityDivider);
    taskStatQuanity.append(taskStatQuanityNeed);
    taskStatContainer.append(taskStatTimeContainer);
    taskStatTimeContainer.append(taskStatTimeMin);
    taskStatTimeContainer.append(taskStatTimeDivider);
    taskStatTimeContainer.append(taskStatTimeSec);

    openForm(false);
    document.querySelector(".create-task-form__input").value = "";
    document.querySelector(".create-task-form__number").value = "1";
  }

  function openForm(bool) {
    if (bool) {
      formAdd.classList.add("create-task-form_show");
      formAdd.classList.remove("create-task-form_hide");
    } else {
      formAdd.classList.remove("create-task-form_show");
      formAdd.classList.add("create-task-form_hide");
    }
  }

  btnAddTask.addEventListener("click", () => {
    openForm(true);
  });

  formCancelBtn.addEventListener("click", () => {
    openForm(false);
  });

  formAddBtn.addEventListener("click", () => {
    let newTaskObj = {
      isDone: false,
      isActive: false,
      taskTitle: document.querySelector("input[name=create-task-title]").value,
      currentPomodoros: 0,
      pomodorosNeed: document.querySelector("input[name=create-task-number]")
        .value,
      time: 0,
    };
    createTasks(newTaskObj);
  });

  init();
};

export default tasks;
