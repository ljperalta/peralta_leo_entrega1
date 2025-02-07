const fs = require("fs").promises;
class Products
{
    #rutaArchivo;

    constructor(path){
        //const fs = require("fs");
        //this.products = require('../bd/bd.products.json')
        this.#rutaArchivo = path;
        //this.fs = fs; // Usar el módulo fs de forma moderna
    }

    async getProducts(){
       return await this.leerJSON()
    }

    async getProductById(id) {
        const productos = await this.leerJSON();
        return productos.find(producto => producto.id === Number(id)) || null;
    }

    async addProduct(newproduct) {
        const productos = await this.leerJSON();

        // Generar un ID único (usando la longitud del array + 1)
        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        console.log(nuevoId)
        const nuevoProducto = { id: nuevoId }; // Agrega el ID generado

        newproduct.forEach(element => {
            console.log(element)
        }); 

        productos.push(nuevoProducto); // Agregar el nuevo producto
        await this.escribirJSON(productos); // Guardar en el archivo

        return nuevoProducto;
    }

    async deleteProductById(id) {

        let productos = await this.leerJSON();
        const productoIndex = productos.findIndex(producto => producto.id === Number(id));

        if (productoIndex === -1) {
            return null; // No encontrado
        }

        const productoEliminado = productos.splice(productoIndex, 1)[0];
        await this.escribirJSON(productos); // Guardar cambios en el JSON
        return productoEliminado;
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

prod = new Products('server/bd/bd.products.json')

module.exports = {
    getAllProducts: async () => await prod.getProducts(),
    getProductById: async (id) => await prod.getProductById(id),
    deleteProductById: async (id) => await prod.deleteProductById(id),
    addProduct: async (producto) => await prod.addProduct(producto)
};
// const Products = require("../bd/bd.products.json");

// const getAllProducts = () => {
//     return Products.length ? Products : null
// };

// module.exports = { getAllProducts };