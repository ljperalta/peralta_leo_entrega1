const fs = require("fs").promises;

class CartManager {
    #rutaArchivo
    constructor(path) {
        this.#rutaArchivo = path
        this.carts = []
    }

    getCart = async () => {      return await this.leerJSON()    }

    getCartById = async (id) => {
        const carts = await this.leerJSON()
        return carts.find(carrito => carrito.id === Number(id)) || null;
    }

    async addCart() {
        const carts = await this.leerJSON();

        const newCart = {
            id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
            products: []
        };

        carts.push(newCart);
        await this.escribirJSON(carts);

        return newCart;
    }

    async addProductsToCart(cartId, productId) {
        const carts = await this.leerJSON();
        const cartIndex = carts.findIndex(cart => cart.id === Number(cartId));
    
        if (cartIndex === -1) {     return { error: `Carrito con ID ${cartId} no encontrado` };     }
        /* else {
            this.addCart();
            const cartIndex = carts.findIndex(cart => cart.id === Number(cartId));
        }*/
        //console.log(cartIndex)
        const cart = carts[cartIndex];
        //console.log(cart)
        const productIndex = cart.products.findIndex(item => item.product === Number(productId));
        //console.log(productIndex)
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++; // Si existe, incremento cantidad
        } else {
            cart.products.push({ product: Number(productId), quantity: 1 }); // Si no, locreo con cantidad 1
        }
    
        carts[cartIndex] = cart; // Actualizar carrito en la lista
    
        await this.escribirJSON(carts); // Guardar en el JSON
        return cart;
    }
    

    async leerJSON() {
        try {
            const data = await fs.readFile(this.#rutaArchivo, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer o procesar el archivo JSON:', error);
            return [];
        }
    }

    async escribirJSON(data) {
        try {
            await fs.writeFile(this.#rutaArchivo, JSON.stringify(data, null, 2), "utf8");
        } catch (error) {
            console.error("Error al escribir el archivo JSON:", error);
        }
    }
}

const cartManager = new CartManager('server/bd/carts.json')

module.exports = {
    getCart: async () => await cartManager.getCart(),
    getCartById: async (id) => await cartManager.getCartById(id),
    addCart: async () => await cartManager.addCart(),
    addProductsToCart: async (idCart, idProduct) => await cartManager.addProductsToCart(idCart, idProduct)
};