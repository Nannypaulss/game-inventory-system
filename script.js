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

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    static applyDiscount(products, discount) {
        for (let product of products) {
            product.price = product.price * (1 - discount);
        }
    }
}

class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}, Expiration Date: ${this.expirationDate}`;
    }
}

class Store {
    constructor() {
        this.inventory = [];
    }

    addProduct(product) {
        this.inventory.push(product);
    }

    getInventoryValue() {
        let total = 0;
        for (let product of this.inventory) {
            total += product.getTotalValue();
        }
        return total;
    }

    findProductByName(name) {
        for (let product of this.inventory) {
            if (product.name.toLowerCase() === name.toLowerCase()) {
                return product;
            }
        }
        return null;
    }
}

const store = new Store();

const p1 = new Product("Apple", 2.5, 50);
const p2 = new Product("Bread", 3, 20);
const p3 = new Product("Rice", 12, 15);
const p4 = new PerishableProduct("Milk", 4.5, 10, "2026-04-01");
const p5 = new PerishableProduct("Yogurt", 2.75, 25, "2026-03-30");

store.addProduct(p1);
store.addProduct(p2);
store.addProduct(p3);
store.addProduct(p4);
store.addProduct(p5);

document.getElementById("totalProducts").textContent = Product.productCount;

const before = store.getInventoryValue();
document.getElementById("beforeValue").textContent = `$${before.toFixed(2)}`;

let inventoryText = "";
for (let product of store.inventory) {
    inventoryText += product.toString() + "\n";
}
document.getElementById("inventoryOutput").textContent = inventoryText;

Product.applyDiscount(store.inventory, 0.15);

const after = store.getInventoryValue();
document.getElementById("afterValue").textContent = `$${after.toFixed(2)}`;

const found = store.findProductByName("Milk");

if (found) {
    document.getElementById("searchOutput").textContent = found.toString();
}

document.getElementById("logOutput").textContent =
    "Discount of 15% applied to all products.\nSearch completed for 'Milk'.";