// Categories dropdown functionality (from index.html, might need adjustment if IDs change)
    document.addEventListener("DOMContentLoaded", function () {
      const categoriesBtn = document.getElementById("categories-btn");
      const categoriesDropdown = document.getElementById("categories-dropdown");

      if (categoriesBtn && categoriesDropdown) {
        categoriesBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          categoriesDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", function (event) {
          if (
            !categoriesBtn.contains(event.target) &&
            !categoriesDropdown.contains(event.target)
          ) {
            categoriesDropdown.classList.add("hidden");
          }
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            categoriesDropdown.classList.add("hidden");
          }
        });
      }

      // Filter dropdown functionality
      const filterBtn = document.getElementById("filter-btn");
      const filterDropdown = document.getElementById("filter-dropdown");

      if (filterBtn && filterDropdown) {
        filterBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          filterDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", function (event) {
          if (
            !filterBtn.contains(event.target) &&
            !filterDropdown.contains(event.target)
          ) {
            filterDropdown.classList.add("hidden");
          }
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            filterDropdown.classList.add("hidden");
          }
        });
      }
    });

    // Hamburger menu functionality for mobile sidebar (from index.html)
    document.addEventListener("DOMContentLoaded", function () {
      const hamburger = document.getElementById("hamburger");
      const sidebar = document.getElementById("sidebar");

      if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
          sidebar.classList.toggle("hidden");
        });
      }
    });

    // PWA Install functionality (from index.html)
    let deferredPrompt;
    const installBtn = document.getElementById("install-btn");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn) {
        installBtn.style.display = "inline-block"; // Make button visible
        installBtn.disabled = false;
      }
    });

    if (installBtn) {
      installBtn.addEventListener("click", () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("User accepted the install prompt");
            } else {
              console.log("User dismissed the install prompt");
            }
            deferredPrompt = null;
          });
        }
      });
    }

    window.addEventListener("appinstalled", () => {
      console.log("PWA was installed");
      localStorage.setItem("libraNetInstalled", "true");
      if (installBtn) {
        installBtn.classList.add("hidden");
      }
    });

    // Service Worker registration (from index.html)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("service-worker.js")
          .then((reg) => {
            console.log("Service Worker registered!", reg);
          })
          .catch((err) => {
            console.log("Service Worker registration failed: ", err);
          });
      });
    }