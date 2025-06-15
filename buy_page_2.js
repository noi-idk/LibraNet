let deferredPrompt;

// PWA Install Event Listener
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    document.querySelectorAll('.install-btn').forEach(btn => {
        btn.style.display = 'inline-block';
        btn.disabled = false;
    });
});

document.addEventListener("DOMContentLoaded", function () {
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

    // Hamburger Menu
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
        });
    }

    // Mobile Category Dropdown
    const toggleLink = document.getElementById("categories-toggle-mobile");
    const dropdown = document.getElementById("categories-dropdown-mobile");
    const arrow = document.getElementById("categories-arrow-mobile");
    if (toggleLink && dropdown && arrow) {
        toggleLink.addEventListener("click", function (e) {
            e.preventDefault();
            dropdown.classList.toggle("hidden");
            arrow.classList.toggle("rotate-90");
        });
    }

    // Purchase Modal & Form Logic
    const purchaseBtn = document.getElementById('purchase-btn');
    const modal = document.getElementById('purchase-modal');
    const cancelBtn = document.getElementById('cancel-modal');
    const confirmBtn = document.getElementById('confirm-modal');
    const modalClose = document.getElementById('modal-close');
    const formatSelect = document.getElementById('format-select');
    const retrievalSelect = document.getElementById('retrieval-method');
    const paymentSelect = document.getElementById('payment-select');
    const priceDisplay = document.getElementById('book-price');
    const priceSummary = document.getElementById('price-summary');
    const basePrice = 32.99;
    const deliveryFee = 5.00;

    if (retrievalSelect && priceDisplay) {
        retrievalSelect.addEventListener('change', () => {
            const isDelivery = retrievalSelect.value.toLowerCase().includes("delivery");
            const totalPrice = isDelivery ? basePrice + deliveryFee : basePrice;
            priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        });
    }

    if (purchaseBtn && modal && cancelBtn && confirmBtn) {
        purchaseBtn.addEventListener('click', () => {
            const cardNumber = document.getElementById('card-number').value.trim();
            const cardHolder = document.getElementById('card-holder').value.trim();
            const cardNumberError = document.getElementById('card-number-error');
            const cardHolderError = document.getElementById('card-holder-error');
            let valid = true;

            if (!cardNumber) {
                cardNumberError.classList.remove('hidden');
                valid = false;
            } else {
                cardNumberError.classList.add('hidden');
            }

            if (!cardHolder) {
                cardHolderError.classList.remove('hidden');
                valid = false;
            } else {
                cardHolderError.classList.add('hidden');
            }

            if (!valid) return;

            const format = formatSelect.value;
            const retrieval = retrievalSelect.value;
            const payment = paymentSelect.value;
            const isDelivery = retrieval.toLowerCase().includes("delivery");
            const totalPrice = isDelivery ? basePrice + deliveryFee : basePrice;

            document.getElementById('format-summary').textContent = format.toLowerCase();
            document.getElementById('retrieval-summary').textContent = retrieval.toLowerCase();
            document.getElementById('payment-summary').textContent = payment.toLowerCase();
            priceSummary.innerHTML = `PRICE: <span class="text-green-600 font-bold">$${totalPrice.toFixed(2)}</span>`;

            modal.classList.remove('hidden');
        });

        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'book_details_page.html';
        });

        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('confirmed_page_2.html', '_blank');
        });

        modalClose.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // PWA Install Button Handler
    document.querySelectorAll('.install-btn').forEach(button => {
        button.style.display = 'none';
        button.disabled = true;

        button.addEventListener('click', async () => {
            if (!deferredPrompt) {
                alert('Install prompt not available yet. Please try again later.');
                return;
            }

            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;

            console.log(`User ${choiceResult.outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`);

            deferredPrompt = null;

            document.querySelectorAll('.install-btn').forEach(btn => {
                btn.style.display = 'none';
                btn.disabled = true;
            });
        });
    });
});
