 // Carousel functionality
    function scrollCarousel(direction) {
      const carousel = document.getElementById("carousel");
      if (carousel) {
        const scrollAmount = 200;
        carousel.scrollLeft += direction * scrollAmount;
      }
    }

    // Categories dropdown functionality
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
    });

    // Hamburger menu functionality for mobile sidebar
    document.addEventListener("DOMContentLoaded", function () {
      const hamburger = document.getElementById("hamburger");
      const sidebar = document.getElementById("sidebar");

      if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
          sidebar.classList.toggle("hidden");
        });
      }
    });

    


  document.addEventListener("DOMContentLoaded", function () {
    const toggleLink = document.getElementById("categories-toggle-mobile");
    const dropdown = document.getElementById("categories-dropdown-mobile");
    const arrow = document.getElementById("categories-arrow-mobile");

    toggleLink.addEventListener("click", function (e) {
      e.preventDefault();
      dropdown.classList.toggle("hidden");
      arrow.classList.toggle("rotate-90");
    });
  });
    // PWA Install functionality
    // JavaScript
   

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event for later use
  deferredPrompt = e;

  // Show all install buttons (in case they were hidden)
  document.querySelectorAll('.install-btn').forEach(btn => {
    btn.style.display = 'inline-block'; // or 'flex' depending on your button styling
    btn.disabled = false; // enable button if disabled
  });
});

document.querySelectorAll('.install-btn').forEach(button => {
  // Initially hide or disable install buttons until prompt is available
  button.style.display = 'none';
  button.disabled = true;

  button.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert('Install prompt not available yet. Please try again later.');
      return;
    }
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the saved prompt since it can only be used once
    deferredPrompt = null;

    // Hide install buttons after prompt
    document.querySelectorAll('.install-btn').forEach(btn => {
      btn.style.display = 'none';
      btn.disabled = true;
    });
  });
});
