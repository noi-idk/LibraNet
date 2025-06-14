let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    // PWA Install setup
    const installButtons = document.querySelectorAll('.install-btn');
    installButtons.forEach(button => {
        button.style.display = 'none';
        button.disabled = true;

        button.addEventListener('click', async () => {
            if (!deferredPrompt) {
                alert('Install prompt not available yet.');
                return;
            }

            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            console.log(`User ${choiceResult.outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`);
            deferredPrompt = null;

            installButtons.forEach(btn => {
                btn.style.display = 'none';
                btn.disabled = true;
            });
        });
    });

    // Carousel
    window.scrollCarousel = function (direction) {
        const carousel = document.getElementById("carousel");
        if (carousel) {
            const scrollAmount = 200;
            carousel.scrollLeft += direction * scrollAmount;
        }
    };

    // Categories Dropdown
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

    // Sidebar
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
        });
    }

    // Menu Highlighting
    const items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(i => {
                i.querySelector(".arrow")?.classList.add("hidden");
                i.classList.remove("bg-[#a6947e]");
            });

            item.querySelector(".arrow")?.classList.remove("hidden");
            item.classList.add("bg-[#a6947e]");
        });
    });

    // TOC Toggle — THIS is now inside DOMContentLoaded
    const toggleBtn = document.getElementById("toggle-toc");
    const moreItems = document.querySelectorAll(".more");

    if (toggleBtn && moreItems.length > 0) {
        toggleBtn.addEventListener("click", () => {
            const isHidden = moreItems[0].classList.contains("hidden");
            moreItems.forEach(item => item.classList.toggle("hidden"));
            toggleBtn.textContent = isHidden ? "Show Less" : "Show More";
        });
    }

    // Buy Button
    const buyBtn = document.getElementById("buy-button");
    if (buyBtn) {
        buyBtn.addEventListener("click", function () {
            window.open("buy_page_2.html", "_blank");
        });
    }
});

// This part should remain outside because it listens for a system event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButtons = document.querySelectorAll('.install-btn');
    installButtons.forEach(btn => {
        btn.style.display = 'inline-block';
        btn.disabled = false;
    });
});