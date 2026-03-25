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

store.addProduct(new Product("PS5 Controller", 89.99, 12));
store.addProduct(new Product("Gaming Headset", 129.99, 8));
store.addProduct(new Product("Nintendo Switch", 399.99, 5));
store.addProduct(new PerishableProduct("Energy Drink", 19.99, 20, "2026-04-01"));
store.addProduct(new PerishableProduct("Snack Pack", 14.99, 6, "2026-03-29"));

function renderTable() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    store.inventory.forEach(p => {
        table.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>$${p.price}</td>
            <td>${p.quantity}</td>
            <td>$${p.getTotalValue()}</td>
            <td>${p.quantity < 10 ? "Low" : "OK"}</td>
        </tr>`;
    });
}

renderTable();
function log(msg) {
    const logBox = document.getElementById("log");
    logBox.innerHTML += `<div>${msg}</div>`;
}

log("System initialized");