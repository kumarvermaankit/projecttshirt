import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler' // Middleware to handle exceptions inside async express routes

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    // Get all the products from MongoDB
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const saveProducts = asyncHandler(async (req,res)=>{
    const productInfo = new Product({
        user:req.body.user,
        name:req.body.name,
        image:req.body.image,
        design:req.body.design,
        color:req.body.color,
        genre:req.body.genre,
        description:req.body.description,
        reviews:req.body.reviews,
        rating:req.body.rating,
        numReviews:req.body.numReviews,
        price:req.body.price,
        countInStock:req.body.countInStock,
        
    })

    productInfo.save()

})

export { getProducts, getProductById,saveProducts}
