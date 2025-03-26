let container = document.createElement("div");
container.id = "container";
container.className = "container";
document.body.appendChild(container);

let url = "http://localhost:3000/recipes";

async function getData() {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data, status: " + response.status);
        }

        let data = await response.json();
        showData(data);
    } catch (error) {
        console.error("Error fetching data:", error); // Proper error handling
    }
}

function showData(data) {
    data.forEach(ele => {
        let { image, name, cuisine } = ele;

        let item = document.createElement("div");
        item.id = "item";

        item.innerHTML = `
            <img src="${image}" alt="${name}">
            <p>Name: ${name} | Cuisine: ${cuisine}</p>
        `;

        container.appendChild(item);  // Move inside the loop to append each item
    });
}

getData();
