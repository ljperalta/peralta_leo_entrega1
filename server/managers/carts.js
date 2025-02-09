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

    // #generateId = async () => {
    //     const carts = await this.getCarts()
    //     return carts.length === 0 ? 1 : carts[carts.length - 1].id + 1
    // }

    // addCart = async (products) => {
    //     const carts = await this.getCarts()
    //     const newCart = {
    //         id: await this.#generateId(),
    //         products: (products = [])
    //     }
    //     carts.push(newCart)
    //     await fs.promises.writeFile(this.#rutaArchivo, JSON.stringify(carts, null, '\t'))
    //     this.carts = carts 
    //     return newCart
    // }

    // addProductsToCart = async (cartId, productId) => {
    //     const products = productManager.getProductById(productId)
    //     // if (!products) {
    //     //     return Error : 'the product with id:${productId} does not exist'
    //     // }
    //     let carts = await this.getCarts()
    //     const cart = await this.getCartById(cartId)
    //     if (!cart) return null
    //     const productExistsInCart = cart.products.find(item => item.product === productId)
    //     if (productExistsInCart) {
    //         productExistsInCart.quantity++
    //     } else {
    //         const product = {
    //             product: productId,
    //             quantity: 1
    //         }
    //         cart.products.push(product)
    //     }
    //     const cartIndex = carts.findIndex(item => item.id === cartId)
    //     if (cartIndex !== -1) {
    //         carts[cartIndex] = cart
    //     }
    //     await fs.promises.writeFile(this.#rutaArchivo, JSON.stringify(carts, null, '\t'))
    //     return cart
    // }

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
    getCart: async (id) => await cartManager.getCart(id),
    getCartById: async (id) => await cartManager.getCartById(id),
};