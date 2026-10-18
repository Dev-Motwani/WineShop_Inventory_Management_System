 //======= TEMP: Clear old sales data once =======
 //localStorage.removeItem("sales");
 l//ocalStorage.removeItem("inventory");


// ======= References =======
const productSelect = document.getElementById("productSelect");
const saleQuantity = document.getElementById("saleQuantity");
const customerName = document.getElementById("customerName");
const salesForm = document.getElementById("salesForm");
const salesTableBody = document.getElementById("salesTable").getElementsByTagName("tbody")[0];

// ======= Load inventory and sales from LocalStorage =======
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

// ======= Populate product dropdown =======
function loadProducts() {
    productSelect.innerHTML = '<option value="">Select Product</option>';
    inventory.forEach((item, index) => {
        productSelect.innerHTML += `<option value="${index}">${item.name} (${item.quantity})</option>`;
    });
}

// ======= Render sales table =======
function renderSalesTable() {
    salesTableBody.innerHTML = "";
    sales.forEach((sale, index) => {
        const row = salesTableBody.insertRow();
        row.innerHTML = `
            <td>${sale.product}</td>
            <td>${sale.category}</td>
            <td>${sale.brand}</td>
            <td>${sale.quantity}</td>
            <td>${sale.customer || "-"}</td>
            <td>₹${sale.totalPrice.toFixed(2)}</td>
            <td>${new Date(sale.date).toLocaleString()}</td>
            <td>
                <button class="btn delete" onclick="deleteSale(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    });
}

// ======= Record a sale =======
salesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const productIndex = productSelect.value;
    const quantity = parseInt(saleQuantity.value);
    const customer = customerName.value.trim();

    if (productIndex === "" || isNaN(quantity) || quantity <= 0) {
        alert("Please select a product and enter a valid quantity");
        return;
    }

    const product = inventory[productIndex];

    if (quantity > product.quantity) {
        alert("Insufficient stock!");
        return;
    }

    // Deduct stock
    product.quantity -= quantity;

    // Record sale (use ISO format for consistency)
    const saleRecord = {
        product: product.name,
        category: product.category,
        brand: product.brand,
        quantity: quantity,
        totalPrice: quantity * product.price,
        customer: customer,
        date: new Date().toISOString().split('T')[0], // saves as YYYY-MM-DD

    };

    sales.push(saleRecord);

    // Save to LocalStorage
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("sales", JSON.stringify(sales));

    // Reset form
    salesForm.reset();

    // Refresh UI and stats
    loadProducts();
    renderSalesTable();
    updateDashboardStats();
});

// ======= Delete a sale =======
function deleteSale(index) {
    const sale = sales[index];

    // Restore quantity to inventory
    const product = inventory.find(
        (p) => p.name === sale.product && p.brand === sale.brand
    );
    if (product) {
        product.quantity += sale.quantity;
    }

    // Remove sale
    sales.splice(index, 1);

    // Update LocalStorage
    localStorage.setItem("sales", JSON.stringify(sales));
    localStorage.setItem("inventory", JSON.stringify(inventory));

    // Refresh UI and stats
    loadProducts();
    renderSalesTable();
    updateDashboardStats();
}

// ======= Update Dashboard Stats =======
function updateDashboardStats() {
    let totalProducts = inventory.length;
    let totalSalesCount = sales.length;
    let todaySales = 0;
    let monthlySales = 0;

    const today = new Date().toLocaleDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    sales.forEach((sale) => {
        const saleDate = new Date(sale.date);
        if (saleDate.toLocaleDateString() === today) {
            todaySales += sale.totalPrice;
        }
        if (
            saleDate.getMonth() === thisMonth &&
            saleDate.getFullYear() === thisYear
        ) {
            monthlySales += sale.totalPrice;
        }
    });

    // Save stats to LocalStorage
    localStorage.setItem("totalProducts", totalProducts);
    localStorage.setItem("totalSales", totalSalesCount);
    localStorage.setItem("todaySales", todaySales);
    localStorage.setItem("monthlySales", monthlySales);
}

// ======= Initial Load =======
loadProducts();
renderSalesTable();
updateDashboardStats();
