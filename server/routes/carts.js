const express = require('express');
const routerC = express.Router();

const { getCarts, getCartsById } = require('../controllers/carts');

routerC.get('/', getCarts);
routerC.get('/:id', getCartsById);

module.exports = routerC;