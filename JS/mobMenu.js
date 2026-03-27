document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("threedots");
  const menu = document.getElementById("menuMobile");

  if (icon && menu) {
    icon.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});