const { title } = require("process");

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
    
        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        
        const nuevoProducto = { id: nuevoId, 
                                title: newproduct[0].title, 
                                description: newproduct[0].description,
                                code: newproduct[0].code,
                                price: newproduct[0].price,
                                status: newproduct[0].status,
                                stock: newproduct[0].stock,
                                categoty: newproduct[0].categoty,
                                thumbnails: newproduct[0].thumbnails
                             };

        productos.push(nuevoProducto); 
        await this.escribirJSON(productos);

        return nuevoProducto;
    }

    async updateProductById(id, data) {
        console.log(data);
        const productos = await this.leerJSON();

        console.log('....=',data);

        productos[id].price = data.price;
        await this.escribirJSON(productos);

        return productos[id];
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
    addProduct: async (producto) => await prod.addProduct(producto),
    updateProductById: async (id, newPrice) => await prod.updateProductById(id, newPrice),
    deleteProductById: async (id) => await prod.deleteProductById(id)
};
// const Products = require("../bd/bd.products.json");

// const getAllProducts = () => {
//     return Products.length ? Products : null
// };

// module.exports = { getAllProducts };