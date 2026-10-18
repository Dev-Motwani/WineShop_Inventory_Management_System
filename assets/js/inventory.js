// Get inventory from LocalStorage or initialize empty
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// References
const inventoryForm = document.getElementById("inventoryForm");
const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];

// Function to render inventory table
function renderInventory() {
    inventoryTable.innerHTML = ""; // clear table
    inventory.forEach((item, index) => {
        const row = inventoryTable.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn edit" onclick="editItem(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn delete" onclick="deleteItem(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
    localStorage.setItem("inventory", JSON.stringify(inventory));
    updateDashboardStats();
}

// Add new inventory item
inventoryForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("category").value;
    const brand = document.getElementById("brand").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    if(name && category && brand && !isNaN(quantity) && !isNaN(price)){
        inventory.push({name, category, brand, quantity, price});
        renderInventory();
        inventoryForm.reset();
    }
});

// Delete item
function deleteItem(index){
    inventory.splice(index, 1);
    renderInventory();
}

// Edit item (basic)
function editItem(index){
    const item = inventory[index];
    document.getElementById("productName").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("brand").value = item.brand;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("price").value = item.price;
    // Remove from inventory temporarily
    inventory.splice(index, 1);
    renderInventory();
}

// Initial render
renderInventory();

// Update dashboard stats dynamically
function updateDashboardStats(){
    let totalProducts = inventory.length;
    localStorage.setItem("totalProducts", totalProducts); // save for dashboard
}
