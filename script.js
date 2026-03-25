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
        return `${this.name} - $${this.price} (${this.quantity})`;
    }
}

class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `${this.name} - $${this.price} (${this.quantity}) Exp: ${this.expirationDate}`;
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