// ====== Dashboard.js ======

// Helper to get data safely
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// ===== Inventory Count =====
const inventory = getData("inventory");
document.getElementById("totalProducts").textContent = inventory.length;

// ===== Sales Data =====
const sales = getData("sales");
document.getElementById("totalSales").textContent = sales.length;

// ===== Customers Count =====
const customers = getData("customers");
document.getElementById("totalCustomers").textContent = customers.length;

// ===== Today's and Monthly Sales (₹) =====
let today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let todayTotal = 0;
let monthlyTotal = 0;

sales.forEach(sale => {
    // Ensure total is numeric
    let total = parseFloat(sale.total) || 0;
    let saleDate = new Date(sale.date);

    // Check for today's sales
    if (sale.date === today) {
        todayTotal += total;
    }

    // Check for current month & year
    if (saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear) {
        monthlyTotal += total;
    }
});

// Update values
document.getElementById("todaySales").textContent = "₹" + todayTotal.toFixed(2);
document.getElementById("monthlySales").textContent = "₹" + monthlyTotal.toFixed(2);
