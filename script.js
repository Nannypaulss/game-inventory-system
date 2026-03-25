class Product {
    static productCount = 0;

    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        Product.productCount++;
    }

    getTotalValue() {
        return this.price * this.quantity;
    }
}

class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }
}

class Store {
    constructor() {
        this.inventory = [];
    }

    addProduct(p) {
        this.inventory.push(p);
    }

    getInventoryValue() {
        return this.inventory.reduce((sum, p) => sum + p.getTotalValue(), 0);
    }

    findProductByName(name) {
        return this.inventory.find(p => p.name.toLowerCase() === name.toLowerCase()) || null;
    }
}

const store = new Store();

store.addProduct(new Product("PS5 Controller", 74.99, 6));
store.addProduct(new Product("Gaming Headset", 89.99, 4));
store.addProduct(new Product("Nintendo Switch Game", 59.99, 8));
store.addProduct(new PerishableProduct("Energy Drink", 3.49, 18, "2026-04-01"));
store.addProduct(new PerishableProduct("Snack Pack", 4.99, 10, "2026-03-29"));

function renderTable() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    store.inventory.forEach(p => {
        const isLow = p.quantity < 10;

        table.innerHTML += `
        <tr style="${isLow ? 'background:#2a0000;' : ''}">
            <td>${p.name}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>${p.quantity}</td>
            <td>$${p.getTotalValue().toFixed(2)}</td>
            <td class="${isLow ? 'low-stock' : 'ok-stock'}">
                ${isLow ? "Low Stock ⚠️" : "In Stock"}
            </td>
        </tr>`;
    });
}

renderTable();
function log(msg) {
    const logBox = document.getElementById("log");
    logBox.innerHTML += `<div>${msg}</div>`;
}

log("System initialized");

const beforeValue = store.getInventoryValue();
document.getElementById("beforeValue").textContent = "$" + beforeValue.toFixed(2);

function applyDiscount() {
    store.inventory.forEach(p => p.price *= 0.85);
    renderTable();

    const afterValue = store.getInventoryValue();
    document.getElementById("afterValue").textContent = "$" + afterValue.toFixed(2);

    log("Discount applied to all products");
}

