document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.getElementById("hero");
  const btnTienda = document.getElementById("btn-tienda");
  const btnTurno = document.getElementById("btn-turno");

  if (!heroSection || !btnTienda || !btnTurno) return;

  const heroHeight = heroSection.offsetTop + heroSection.offsetHeight;

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY > heroHeight;

    [btnTienda, btnTurno].forEach(btn => {
      if (scrolled) {
        btn.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
        btn.classList.add("opacity-100", "translate-y-0");
      } else {
        btn.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
        btn.classList.remove("opacity-100", "translate-y-0");
      }
    });
  });
});
