(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("mayhemTheme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  root.dataset.theme = savedTheme || preferredTheme;

  function syncThemeButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isLight = root.dataset.theme === "light";
      button.textContent = isLight ? "Dark" : "Light";
      button.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    });
  }

  syncThemeButtons();

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem("mayhemTheme", root.dataset.theme);
      syncThemeButtons();
    });
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(document.body.classList.contains("menu-open")));
    });
  }

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });

  document.querySelectorAll("[data-project]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("mayhemSelectedService", link.dataset.project || "");
    });
  });

  const serviceSelect = document.querySelector("#service");
  const selected = localStorage.getItem("mayhemSelectedService");
  if (serviceSelect && selected) {
    serviceSelect.value = selected;
    localStorage.removeItem("mayhemSelectedService");
  }

  const form = document.querySelector("#project-form");
  const toast = document.querySelector("#toast");
  if (form && toast) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      if (!name || !email) {
        toast.textContent = "Please add your name and email so Mayhem can respond.";
      } else {
        toast.textContent = `Thanks ${name}. Your project enquiry is ready for Mayhem Collectives.`;
        form.reset();
      }
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4600);
    });
  }
})();
