const modalLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const blockPadding = document.querySelectorAll(".lock-paddding");
let unblock = true;
const timeout = 800;

if (modalLinks.length > 0) {
  modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const modalName = link.getAttribute("href").replace("#", "");
      const currentModal = document.getElementById(modalName);
      modalOpen(currentModal);
      event.preventDefault();
    });
  });

  const modalCloseElem = document.querySelectorAll(".close-modal");
  if (modalCloseElem.length > 0) {
    modalCloseElem.forEach((el) => {
      el.addEventListener("click", (event) => {
        modalClose(el.closest(".popup"));
        event.preventDefault();
      });
    });
  }
}

function modalOpen(currentModal) {
  if (currentModal && unblock) {
    const modalActive = document.querySelector(".popup.open");
    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyBlock();
    }
    currentModal.classList.add("open");
    currentModal.addEventListener("click", (event) => {
      if (!event.target.closest("popup__content")) {
        modalClose(event.target.closest("popup"));
      }
    });
  }
}

function modalClose(modalActive, doUnblock = true) {
  if (unblock) {
    modalActive.classList.remove("open");
    if (doUnblock) {
      bodyUnblock();
    }
  }
}

function bodyBlock() {
  const blockPaddingValue =
    window.innerWidth - document.querySelector("#wrapper").offsetWidth + "px";
  console.log("blockPaddingValue = " + blockPaddingValue);
  if (blockPadding.length > 0) {
    blockPadding.forEach((el) => {
      el.style.paddingRight = blockPaddingValue;
    });
  }
  body.classList.add("blocked");
  document.querySelector(".navbar").classList.add("blocked");
  unblock = false;
  setTimeout(() => {
    unblock = true;
  }, timeout);
}

function bodyUnblock() {
  setTimeout(() => {
    if (blockPadding.length > 0) {
      blockPadding.forEach((el) => {
        el.style.paddingRight = "0px";
      });
    }
    body.style.paddingRight = "0px";
    body.classList.remove("blocked");
  }, timeout);
  unblock = false;
  setTimeout(() => {
    unblock = true;
  }, timeout);
}
