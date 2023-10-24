const express = require('express');
const { 
    addStore, 
    getStore, 
    getStores, 
    deleteStore, 
    updateStore, 
    upgradeStore
} = require('../controller/storeController');
const router = express.Router();

router.post('/add-new-store', addStore)
router.post('/upgrade-store-data', upgradeStore)
router.get('/retrieve-store-data', getStore)
router.get('/retrieve-stores-data', getStores)
router.patch('/update-store', updateStore)
router.delete('/:tag', deleteStore)

module.exports = router;