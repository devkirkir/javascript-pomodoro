const tasks = () => {
  const tasksContainer = document.querySelector(".tasks-list"),
    doneTasksContainer = document.querySelector(".done-tasks-list"),
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

  function handlerTasks(task) {
    task.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("tasks-list__elem") ||
        event.target.classList.contains("task-title")
      ) {
        clearActiveClass();
        task.classList.add("tasks-list__elem_active");
      }
    });
  }

  function clearActiveClass() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((item) => {
      item.classList.remove("tasks-list__elem_active");
    });
  }

  function isActiveTask(task, isActive) {
    if (isActive) {
      task.classList.add("tasks-list__elem_active");
    }
  }

  function doneTask(checkbox, taskContainer) {
    checkbox.addEventListener("click", () => {
      let taskTitle = taskContainer.childNodes[1].innerHTML,
        currentPomodoros =
          taskContainer.childNodes[2].firstChild.childNodes[0].innerHTML,
        pomodorosNeed =
          taskContainer.childNodes[2].firstChild.childNodes[2].innerHTML;

      let time =
        taskContainer.childNodes[2].lastChild.childNodes[0].innerHTML * 60 +
        +taskContainer.childNodes[2].lastChild.childNodes[2].innerHTML;

      const obj = {
        isDone: true,
        isActive: false,
        taskTitle,
        pomodorosNeed,
        currentPomodoros,
        time,
      };

      taskContainer.remove();

      createTasks(obj);
    });
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

    if (obj.isDone) {
      const container = document.createElement("div"),
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

      container.setAttribute("class", "done-tasks-list__elem done");
      taskName.setAttribute("class", "done-task-title");
      taskStatContainer.setAttribute("class", "done-task-stat");
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

      displayTime(obj.time, taskStatTimeMin, taskStatTimeSec);

      doneTasksContainer.append(container);
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

      clearForm();
      handlerTasks(container);

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

    isActiveTask(container, obj.isActive);
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

    doneTask(checkboxInput, container);

    openForm(false);
    clearForm();
    handlerTasks(container);
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

  function clearForm() {
    document.querySelector(".create-task-form__input").value = "";
    document.querySelector(".create-task-form__number").value = "1";
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
