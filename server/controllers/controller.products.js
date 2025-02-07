const { getAllProducts, getProductById, addProduct, deleteProductById } = require('../managers/manager.products');

const getProds = async (req, res) => {
    try {
        const p = await getAllProducts();
        
        if(p){
            res.status(200).json(p)
        }else{
            res.status(400).json("Sin productos")
        }
    } catch (error) {
        res.status(500).json("Error en los productos")
    }
};

const getProdById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProductById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el producto", error });
    }
};

const addNewProduct = async (req, res) => {
    console.log(req.body)
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const nuevoProducto = await addProduct([{ title, description, code, price, status, stock, category, thumbnails }]);

        res.status(201).json({ message: "Producto agregado", producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar producto", error });
    }
};

const deleteProdById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await deleteProductById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el productoooo", error });
    }
};

module.exports = { getProds, getProdById, addNewProduct, deleteProdById };