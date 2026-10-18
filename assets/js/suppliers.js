// ======= References =======
const supplierForm = document.getElementById("supplierForm");
const suppliersTableBody = document.getElementById("suppliersTable").getElementsByTagName("tbody")[0];

// ======= Load suppliers from LocalStorage =======
let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

// ======= Render Supplier Table =======
function renderSuppliers() {
    suppliersTableBody.innerHTML = "";
    suppliers.forEach((supplier, index) => {
        const row = suppliersTableBody.insertRow();
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.contact}</td>
            <td>${supplier.address}</td>
            <td>
                <button class="btn edit" onclick="editSupplier(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn delete" onclick="deleteSupplier(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
}

// ======= Add Supplier =======
supplierForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("supplierName").value.trim();
    const contact = document.getElementById("supplierContact").value.trim();
    const address = document.getElementById("supplierAddress").value.trim();

    suppliers.push({ name, contact, address });
    localStorage.setItem("suppliers", JSON.stringify(suppliers));

    supplierForm.reset();
    renderSuppliers();
});

// ======= Edit Supplier =======
function editSupplier(index){
    const supplier = suppliers[index];
    const name = prompt("Enter Supplier Name:", supplier.name);
    const contact = prompt("Enter Contact Number:", supplier.contact);
    const address = prompt("Enter Address:", supplier.address);

    if(name && contact && address){
        suppliers[index] = { name, contact, address };
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
        renderSuppliers();
    }
}

// ======= Delete Supplier =======
function deleteSupplier(index){
    if(confirm("Are you sure you want to delete this supplier?")){
        suppliers.splice(index, 1);
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
        renderSuppliers();
    }
}

// ======= Initial Load =======
renderSuppliers();
