const tasks = () => {
  const tasksContainer = document.querySelector(".tasks-list"),
    btnAddTask = document.querySelector(".tasks-list__add"),
    formAdd = document.querySelector(".create-task-form"),
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

  function formOpen(bool) {
    if (bool) {
      btnAddTask.classList.remove("tasks-list__add_show");
      btnAddTask.classList.add("tasks-list__add_hide");
      formAdd.classList.add("create-task-form_show");
      formAdd.classList.remove("create-task-form_hide");
    } else {
      btnAddTask.classList.add("tasks-list__add_show");
      btnAddTask.classList.remove("tasks-list__add_hide");
      formAdd.classList.remove("create-task-form_show");
      formAdd.classList.add("create-task-form_hide");
    }
  }

  btnAddTask.addEventListener("click", () => {
    formOpen(true);
  });

  formCancelBtn.addEventListener("click", () => {
    formOpen(false);
  });
};

export default tasks;
