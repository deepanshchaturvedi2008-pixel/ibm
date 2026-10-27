
const items = [
    {
        name: "Blue Water Bottle",
        category: "Bottle",
        status: "Lost",
        location: "College Library",
        date: "2026-10-21",
        description: "Blue bottle with a black cap."
    },
    {
        name: "Black Notebook",
        category: "Books",
        status: "Found",
        location: "Computer Lab",
        date: "2026-10-22",
        description: "Notebook left on a desk."
    },
    {
        name: "Student ID Card",
        category: "ID Card",
        status: "Lost",
        location: "Canteen",
        date: "2026-10-20",
        description: "Student ID card."
    },
    {
        name: "Silver Keychain",
        category: "Keys",
        status: "Found",
        location: "Main Entrance",
        date: "2026-10-22",
        description: "Keychain with two keys."
    }
];

const searchInput = document.getElementById("searchInput");
const container = document.getElementById("itemsContainer");
const buttons = document.querySelectorAll(".filter-btn");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

let activeFilter = "All";

function displayItems() {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredItems = items.filter(item => {
        const text = (
            item.name + " " +
            item.category + " " +
            item.location + " " +
            item.description
        ).toLowerCase();

        const matchesSearch = text.includes(searchText);
        const matchesFilter =
            activeFilter === "All" ||
            item.status === activeFilter;

        return matchesSearch && matchesFilter;
    });

    container.innerHTML = "";

    filteredItems.forEach(item => {
        const card = document.createElement("article");
        card.className = "item-card";

        const heading = document.createElement("h3");
        heading.textContent = item.name;

        const status = document.createElement("span");
        status.className =
            "status status-" + item.status.toLowerCase();
        status.textContent = item.status;

        const category = document.createElement("p");
        category.textContent = "Category: " + item.category;

        const location = document.createElement("p");
        location.textContent = "Location: " + item.location;

        const date = document.createElement("p");
        date.textContent = "Date: " + item.date;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.append(
            heading, status, category,
            location, date, description
        );

        container.appendChild(card);
    });

    resultCount.textContent =
        filteredItems.length + " item(s) found";

    emptyMessage.hidden = filteredItems.length !== 0;
}

searchInput.addEventListener("input", displayItems);

buttons.forEach(button => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        buttons.forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });

        displayItems();
    });
});

displayItems();
