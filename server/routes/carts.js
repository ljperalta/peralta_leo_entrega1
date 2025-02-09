const express = require('express');
const routerC = express.Router();

const { getCarts, getCartsById, addCarts, addProductToCart } = require('../controllers/carts');

routerC.get('/', getCarts);
routerC.get('/:id', getCartsById);
routerC.post('/', addCarts);
routerC.post('/:cid/product/:pid', addProductToCart);

module.exports = routerC;