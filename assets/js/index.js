import modal from "./modules/modals.mjs";
import tasks from "./modules/tasks.mjs";
import timerModule from "./modules/timer.mjs";

document.addEventListener("DOMContentLoaded", () => {
  timerModule();
  modal(".open-modal-how", ".modal-how", ".ok", "modal-how_active");
  modal(
    ".open-modal-settings",
    ".modal-settings",
    ".cancel",
    "modal-settings_active"
  );

  tasks();
});
