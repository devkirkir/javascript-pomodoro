const tasks = () => {
  const tasksContainer = document.querySelector(".tasks-list"),
    btnAddTask = document.querySelector(".control-elems__add"),
    formAdd = document.querySelector(".create-task-form"),
    formAddBtn = document.querySelector(".add-btn"),
    formCancelBtn = document.querySelector(".cancel-btn");

  let activeTasks = [
    {
      isDone: false,
      isActive: true,
      taskTitle: "Task Name",
      pomodorosNeed: 4,
      currentPomodoros: 1,
      time: 600,
    },
  ];

  let taskObj = [
    {
      tagName: "div",
      props: {
        class: "tasks-list__elem tasks-list__elem_active task",
      },
    },
    {
      tagName: "div",
      props: {
        class: "checkbox-container",
      },
    },
    {
      tagName: "input",
      props: {
        class: "checkbox",
        type: "checkbox",
        name: "task-done",
      },
    },
    {
      tagName: "label",
      props: {
        for: "task-done",
      },
    },
    {
      tagName: "p",
      props: {
        class: "task-title",
        text: null,
      },
    },
    {
      tagName: "div",
      props: {
        class: "task-stat",
      },
    },
    {
      tagName: "span",
      props: {
        class: "task-stat__quanity",
        text: "/",
      },
    },
    {
      tagName: "span",
      props: {
        class: "current",
        text: null,
      },
    },
    {
      tagName: "span",
      props: {
        class: "need",
        text: null,
      },
    },
    {
      tagName: "span",
      props: {
        class: '"task-stat__time',
        text: null,
      },
    },
  ];

  function createTaks(obj) {
    if (obj.taskTitle.length <= 0 || obj.pomodoros <= 0) {
      alert("Хуйню написал урод");
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
      taskStatTime = document.createElement("span");

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
    taskStatTime.setAttribute("class", "task-stat__time");

    taskName.textContent = obj.taskTitle;
    taskStatQuanityCurrent.textContent = "0";
    taskStatQuanityDivider.textContent = "/";
    taskStatQuanityNeed.textContent = obj.pomodoros;
    taskStatTime.textContent = "00:00";

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
    taskStatContainer.append(taskStatTime);

    openForm(false);
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
      taskTitle: document.querySelector("input[name=create-task-title]").value,
      pomodoros: document.querySelector("input[name=create-task-number]").value,
    };

    createTaks(newTaskObj);
  });
};

export default tasks;
