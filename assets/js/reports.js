// ======= Load Data from LocalStorage =======
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

// ======= Table References =======
const dailySalesTableBody = document.querySelector("#dailySalesTable tbody");
const monthlySalesTableBody = document.querySelector("#monthlySalesTable tbody");
const inventorySummaryTableBody = document.querySelector("#inventorySummaryTable tbody");

// ======= Helper Function =======
function formatCurrency(amount) {
  return "₹" + (amount ? amount.toFixed(2) : "0.00");
}

// Parse date safely (handles both ISO strings and locale formats)
function normalizeDateString(dateString) {
  const parsed = new Date(dateString);
  if (isNaN(parsed)) return null;
  return parsed;
}

// ======= Load Daily Sales =======
function loadDailySales() {
  dailySalesTableBody.innerHTML = "";

  const today = new Date();
  const todayDate = today.toLocaleDateString("en-CA"); // YYYY-MM-DD format

  const todaysSales = sales.filter(sale => {
    const saleDate = normalizeDateString(sale.date);
    if (!saleDate) return false;
    return saleDate.toLocaleDateString("en-CA") === todayDate;
  });

  if (todaysSales.length === 0) {
    const row = dailySalesTableBody.insertRow();
    row.innerHTML = `<td colspan="5" style="text-align:center;">No sales recorded today.</td>`;
    return;
  }

  todaysSales.forEach(sale => {
    const row = dailySalesTableBody.insertRow();
    row.innerHTML = `
      <td>${sale.product}</td>
      <td>${sale.quantity}</td>
      <td>${formatCurrency(sale.totalPrice)}</td>
      <td>${sale.customer || "-"}</td>
      <td>${new Date(sale.date).toLocaleDateString()}</td>
    `;
  });
}

// ======= Load Monthly Sales =======
function loadMonthlySales() {
  monthlySalesTableBody.innerHTML = "";

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthlyData = {};

  sales.forEach(sale => {
    const saleDate = normalizeDateString(sale.date);
    if (!saleDate) return;

    if (saleDate.getMonth() === thisMonth && saleDate.getFullYear() === thisYear) {
      const key = sale.product + "||" + (sale.brand || "Unknown");
      if (!monthlyData[key]) {
        monthlyData[key] = { product: sale.product, brand: sale.brand || "-", quantity: 0, totalPrice: 0 };
      }
      monthlyData[key].quantity += Number(sale.quantity);
      monthlyData[key].totalPrice += Number(sale.totalPrice);
    }
  });

  const monthlyValues = Object.values(monthlyData);

  if (monthlyValues.length === 0) {
    const row = monthlySalesTableBody.insertRow();
    row.innerHTML = `<td colspan="3" style="text-align:center;">No sales recorded this month.</td>`;
    return;
  }

  monthlyValues.forEach(item => {
    const row = monthlySalesTableBody.insertRow();
    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.totalPrice)}</td>
    `;
  });
}

// ======= Load Inventory Summary =======
function loadInventorySummary() {
  inventorySummaryTableBody.innerHTML = "";

  const summary = {};

  inventory.forEach(item => {
    const key = (item.category || "Other") + "||" + (item.brand || "Unknown");
    if (!summary[key]) {
      summary[key] = { category: item.category || "-", brand: item.brand || "-", quantity: 0 };
    }
    summary[key].quantity += Number(item.quantity);
  });

  const summaryValues = Object.values(summary);

  if (summaryValues.length === 0) {
    const row = inventorySummaryTableBody.insertRow();
    row.innerHTML = `<td colspan="3" style="text-align:center;">No inventory data available.</td>`;
    return;
  }

  summaryValues.forEach(item => {
    const row = inventorySummaryTableBody.insertRow();
    row.innerHTML = `
      <td>${item.category}</td>
      <td>${item.brand}</td>
      <td>${item.quantity}</td>
    `;
  });
}

// ======= Initial Load =======
loadDailySales();
loadMonthlySales();
loadInventorySummary();
