const express = require('express');
const { 
    addProduct, 
    getProducts, 
    getProduct, 
    updateProduct, 
    deleteProduct, 
    upgradeProduct
} = require('../controller/productController');
const router = express.Router();

router.post('/add-new-product', addProduct)
router.get('/retrieve-product-data', getProduct)
router.post('/upgrade-product-data', upgradeProduct)
router.get('/retrieve-products-data', getProducts)
router.patch('/update-product', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;