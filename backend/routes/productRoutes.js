import express from 'express'
import {
    getProducts,
    getProductById,
    saveProducts
} from '../controllers/productController.js'

const router = express.Router()


router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.route('/save').post(saveProducts)
export default router
