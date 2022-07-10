import modal from "./modals.module.js";

window.addEventListener("DOMContentLoaded", () => {
  modal(".open-modal-how", ".modal-how", ".ok", "modal-how_active");
  modal(
    ".open-modal-settings",
    ".modal-settings",
    ".cancel",
    "modal-settings_active"
  );
});
