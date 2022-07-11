const modal = (callBtn, modalSelector, closeSelector, activeClass) => {
  const modalWindow = document.querySelector(modalSelector),
    openBtn = document.querySelector(callBtn),
    closeBtn = document.querySelector(closeSelector),
    layout = document.querySelector(".layout");

  closeBtn.addEventListener("click", () => {
    modalWindow.classList.remove(activeClass);
    layout.style.display = "none";
  });

  openBtn.addEventListener("click", () => {
    modalWindow.classList.add(activeClass);
    layout.style.display = "flex";
  });
};

export default modal;
