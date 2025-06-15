const baseTrail = [
    { name: "Dashboard", url: "studentDashboard.html" },
    { name: "Books", url: "#" },
    { name: "Browse Categories", url: "browseCategories.html" },
    { name: "Mathematics", url: "#" },
    { name: "Book Details", url: "book_details_page.html" }
];

// Call this on each page with the current page name
function updateBreadcrumbs(currentPageName, currentPageURL = "#") {
    let trail = JSON.parse(localStorage.getItem("breadcrumbs")) || [...baseTrail];
    console.log("updateBreadcrumbs called with:", currentPageName, currentPageURL);
    console.log("Final breadcrumb trail:", trail);


    // Check if current page already added (last one must not match)
    const last = trail[trail.length - 1];
    if (!last || last.name !== currentPageName) {
        trail.push({ name: currentPageName, url: currentPageURL });
        localStorage.setItem("breadcrumbs", JSON.stringify(trail));
    }

    renderBreadcrumbs(trail);
}

function renderBreadcrumbs(trail) {
    const nav = document.getElementById("breadcrumbs");
    nav.innerHTML = trail.map((item, index) => {
        const isLast = index === trail.length - 1;
        return isLast
            ? `<span class="text-gray-800 font-medium">${item.name}</span>`
            : `<a href="${item.url}" class="text-blue-600 hover:underline">${item.name}</a> <span class="mx-2">›</span>`;
    }).join('');
}