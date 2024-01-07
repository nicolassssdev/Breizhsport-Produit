const express = require('express');
const router = express.Router();
const controller = require('../controllers/produit');

router.post('/create-product', controller.createProduit);

router.get('/', controller.getAllProduits);
router.get('/:product_id', controller.getProduitById);

router.put('/:product_id', controller.updateProduitById);

router.delete('/:product_id', controller.deleteProduitById);

module.exports = router;
