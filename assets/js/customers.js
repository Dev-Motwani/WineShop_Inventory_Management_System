// ======= References =======
const customerForm = document.getElementById("customerForm");
const customersTableBody = document.getElementById("customersTable").getElementsByTagName("tbody")[0];

// ======= Load customers from LocalStorage =======
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// ======= Render Customer Table =======
function renderCustomers() {
    customersTableBody.innerHTML = "";
    customers.forEach((customer, index) => {
        const row = customersTableBody.insertRow();
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.contact}</td>
            <td>${customer.address}</td>
            <td>
                <button class="btn edit" onclick="editCustomer(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn delete" onclick="deleteCustomer(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
    });
}

// ======= Add Customer =======
customerForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const contact = document.getElementById("customerContact").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    customers.push({ name, contact, address });
    localStorage.setItem("customers", JSON.stringify(customers));

    customerForm.reset();
    renderCustomers();
});

// ======= Edit Customer =======
function editCustomer(index){
    const customer = customers[index];
    const name = prompt("Enter Customer Name:", customer.name);
    const contact = prompt("Enter Contact Number:", customer.contact);
    const address = prompt("Enter Address:", customer.address);

    if(name && contact && address){
        customers[index] = { name, contact, address };
        localStorage.setItem("customers", JSON.stringify(customers));
        renderCustomers();
    }
}

// ======= Delete Customer =======
function deleteCustomer(index){
    if(confirm("Are you sure you want to delete this customer?")){
        customers.splice(index, 1);
        localStorage.setItem("customers", JSON.stringify(customers));
        renderCustomers();
    }
}

// ======= Initial Load =======
renderCustomers();
