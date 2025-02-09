const { getCart, getCartById, addCart, addProductsToCart } = require('../managers/carts');

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

const addCarts = async (req, res) => {
    try {
        const newCart = await addCart();
        res.status(201).json({ message: "Carrito creado con exito", cart: newCart });
    } catch (error) {
        console.error("Error al crear carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const result = await addProductsToCart(cid, pid);

        if (result.error) {
            return res.status(404).json({ message: result.error });
        }

        res.status(200).json({ message: "Producto agregado al carrito", cart: result });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = { getCarts, getCartsById, addCarts, addProductToCart };