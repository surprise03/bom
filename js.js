let url = "https://polar-carbonated-kangaroo.glitch.me/products";
let container = document.querySelector(".container");
let categorySelect = document.getElementById("category-select"); // Access dropdown

// Fetch data from API and initialize the page
async function getdata() {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        let products = await response.json();
        localStorage.setItem("products", JSON.stringify(products));

        displayData(products);          // Display product data
        populateCategories(products);   // Populate dropdown with categories
    } catch (err) {
        console.error(err);
        container.innerHTML = `<p style="color: red;">Failed to load products. Please try again later.</p>`;
    }
}

// Display products in the grid container
function displayData(products = []) {
    container.innerHTML = ""; // Clear previous content

    if (products.length === 0) {
        container.innerHTML = `<p>No data available</p>`;
    } else {
        products.forEach(({ image, title, price, description, category,id }) => {
            let item = document.createElement("div");
            item.classList.add("product-card");  // Add styling for product card
            item.innerHTML = `
                <img src="${image}" alt="Product Image">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Price:</strong> $${price.toFixed(2)}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Category:</strong> ${category}</p>
                <button id="button" class="delete-btn" onclick=deleteData("${id}")>Delete</button>
            `;
            container.appendChild(item);
        });
    }
}

// Populate categories in the dropdown
function populateCategories(products) {
    let categories = Array.from(new Set(products.map(product => product.category)));
    categories.unshift("all");  // Add "all" as the first option

    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = capitalizeFirstLetter(category);  // Capitalize category names
        categorySelect.appendChild(option);
    });

    // Event listener for filtering products by selected category
    categorySelect.addEventListener("change", () => {
        filterData(categorySelect.value, products);
    });
}

// Filter products by category
function filterData(selectedCategory, products) {
    let filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category === selectedCategory);

    displayData(filteredProducts);
}

// Capitalize first letter of each category (for dropdown display)
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function deleteData(id) {
    let options={
        "method":"DELETE"
    }
    fetch(`https://surprise03.github.io/bom/${id}`,options)
         .then(res=>{
            if(res.ok)
                alert("data deleted")
         }).catch(err=>console.log(err))
}


getdata();  // Initial call to fetch and display data
