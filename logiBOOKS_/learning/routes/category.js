const express = require('express');
const router = express.Router();
const {
    getAllCategory, 
    getAllCategoryById, 
    storeCategory, 
    updateCategory, 
    deleteCategory } = require('../controllers/categoryController');
const { authMiddleware, permissionUser } = require('../middleware/UserMiddleware');

//routes category
router.get('/', getAllCategory)
router.get('/:id', getAllCategoryById)
router.post('/', authMiddleware, permissionUser("admin"), storeCategory)
router.patch('/:id',  authMiddleware, permissionUser("admin"), updateCategory)
router.delete('/:id',  authMiddleware, permissionUser("admin"), deleteCategory)
module.exports = router