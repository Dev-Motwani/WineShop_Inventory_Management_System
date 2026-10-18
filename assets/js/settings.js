// ===== References =====
const resetBtn = document.getElementById("resetDataBtn");
const exportBtn = document.getElementById("exportDataBtn");
const importBtn = document.getElementById("importDataBtn");
const importFile = document.getElementById("importFile");

const saveCompanyBtn = document.getElementById("saveCompanyBtn");
const companyName = document.getElementById("companyName");
const companyAddress = document.getElementById("companyAddress");
const gstNumber = document.getElementById("gstNumber");
const companyEmail = document.getElementById("companyEmail");

const changePasswordBtn = document.getElementById("changePasswordBtn");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");

// ===== Load Company Info & Password =====
companyName.value = localStorage.getItem("companyName") || "";
companyAddress.value = localStorage.getItem("companyAddress") || "";
gstNumber.value = localStorage.getItem("gstNumber") || "";
companyEmail.value = localStorage.getItem("companyEmail") || "";

let storedPassword = localStorage.getItem("adminPassword") || "admin123";

// ===== Save Company Info =====
saveCompanyBtn.addEventListener("click", () => {
    localStorage.setItem("companyName", companyName.value.trim());
    localStorage.setItem("companyAddress", companyAddress.value.trim());
    localStorage.setItem("gstNumber", gstNumber.value.trim());
    localStorage.setItem("companyEmail", companyEmail.value.trim());
    alert("Company info saved successfully!");
});

// ===== Change Password =====
changePasswordBtn.addEventListener("click", () => {
    if(oldPassword.value !== storedPassword){
        alert("Current password is incorrect!");
        return;
    }
    if(newPassword.value.trim() === ""){
        alert("New password cannot be empty!");
        return;
    }
    storedPassword = newPassword.value.trim();
    localStorage.setItem("adminPassword", storedPassword);
    oldPassword.value = newPassword.value = "";
    alert("Password changed successfully!");
});

// ===== Reset / Clear All Data =====
resetBtn.addEventListener("click", () => {
    if(confirm("Are you sure you want to clear all data? This action cannot be undone.")){
        localStorage.removeItem("inventory");
        localStorage.removeItem("sales");
        localStorage.removeItem("suppliers");
        localStorage.removeItem("customers");
        alert("All data cleared successfully!");
        location.reload();
    }
});

// ===== Export Data as PDF =====
exportBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    doc.setFontSize(16);
    doc.text("Wine & Beer Store Data", 14, 20);

    let y = 30;

    function addSection(title, arr){
        doc.setFontSize(14);
        doc.text(title, 14, y);
        y += 6;
        doc.setFontSize(12);
        arr.forEach(item => {
            doc.text(JSON.stringify(item), 14, y);
            y += 6;
            if(y > 280){
                doc.addPage();
                y = 20;
            }
        });
        y += 10;
    }

    addSection("Inventory:", inventory);
    addSection("Sales:", sales);
    addSection("Suppliers:", suppliers);
    addSection("Customers:", customers);

    doc.save("wine_beer_store_data.pdf");
});

// ===== Import Data =====
importBtn.addEventListener("click", () => {
    const file = importFile.files[0];
    if(!file){
        alert("Please select a JSON file to import.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
        try{
            const data = JSON.parse(e.target.result);
            if(data.inventory) localStorage.setItem("inventory", JSON.stringify(data.inventory));
            if(data.sales) localStorage.setItem("sales", JSON.stringify(data.sales));
            if(data.suppliers) localStorage.setItem("suppliers", JSON.stringify(data.suppliers));
            if(data.customers) localStorage.setItem("customers", JSON.stringify(data.customers));
            alert("Data imported successfully!");
            location.reload();
        } catch (err){
            alert("Invalid JSON file.");
        }
    };
    reader.readAsText(file);
});
