const router= require('express').Router();
const productController= require('../controllers/productsController')

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)
router.post('/', productController.createProduct)
router.get('/search/:key', productController.searchProduct)

module.exports = router