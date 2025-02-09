const { getCart, getCartById } = require('../managers/carts');

const getCarts = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getCart(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Carrito con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el carrito", error });
    }
};

const getCartsById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getCartById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Carrito con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el carrito", error });
    }
};

// const addNewProduct = async (req, res) => {
//     try {
//         const { title, description, code, price, status, stock, category, thumbnails } = req.body;

//         if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
//             return res.status(400).json({ message: "Faltan campos obligatorios" });
//         }

//         const nuevoProducto = await addProduct([{ title, description, code, price, status, stock, category, thumbnails }]);

//         res.status(201).json({ message: "Producto agregado", producto: nuevoProducto });
//     } catch (error) {
//         res.status(500).json({ message: "Error al agregar producto", error });
//     }
// };

module.exports = { getCarts, getCartsById };