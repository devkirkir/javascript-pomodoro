import modal from "./modals.mjs";
import timerModule from "./timer.mjs";

window.addEventListener("DOMContentLoaded", () => {
  timerModule();
  modal(".open-modal-how", ".modal-how", ".ok", "modal-how_active");
  modal(
    ".open-modal-settings",
    ".modal-settings",
    ".cancel",
    "modal-settings_active"
  );
});
