const express = require('express');
const routerP = express.Router();

const { getProds, getProdById, addNewProduct, deleteProdById } = require('../controllers/controller.products');

routerP.get('/', getProds);
routerP.get('/:id', getProdById); // Obtener un producto por ID
routerP.post('/', addNewProduct); // Obtener un producto por ID
routerP.delete('/:id', deleteProdById); // Eliminar un producto por ID

module.exports = routerP;