document.addEventListener("DOMContentLoaded", () => {
  const navInit = () => {
    const navbarCollapsible = document.body.querySelector("#mainNav");

    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }

    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 72) {
        links.forEach((link) => {
          link.classList.remove("active");

          if (link.href.split("#").pop() === section.id) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  /* анимация */

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.screenX || document.documentElement.scrollLeft,
      scollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scollTop, left: rect.left + scrollLeft };
  }
  const animItems = document.querySelectorAll(".animation");
  if (animItems.length > 0) {
    console.log("here");
    function onEntry() {
      animItems.forEach((item) => {
        const itemHeight = item.offsetHeight;
        const itemOffset = offset(item).top;
        const startPos = 2;

        const animPoint =
          document.documentElement.clientHeight - itemHeight / startPos;

        if (itemHeight > document.documentElement.clientHeight) {
          const animPoint =
            document.documentElement.clientHeight -
            document.documentElement.clientHeight / startPos;
        }
        if (
          scrollY > itemOffset - animPoint &&
          scrollY < itemOffset + itemHeight
        ) {
          item.classList.add("show");
        } else {
          if (!item.classList.contains("no-hide")) {
            item.classList.remove("show");
          }
        }
      });
    }
  }
  onEntry();
  navInit();

  window.addEventListener("scroll", () => {
    navInit();
    onEntry();
  });
  window.addEventListener("resize", () => navInit());
});
