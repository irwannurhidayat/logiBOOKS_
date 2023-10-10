const express = require('express');
const {
    getAllCategory, 
    getAllCategoryById, 
    storeCategory, 
    updateCategory, 
    deleteCategory } = require('../controllers/categoryController');
const router = express.Router();



//routes category
router.get('/', getAllCategory);
router.get('/:id', getAllCategoryById);
router.post('/', storeCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);
module.exports = router