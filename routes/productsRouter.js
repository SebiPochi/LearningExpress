const express = require('express');

const ProductServices = require('../services/productServices')
const validatorHandler = require('../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema')

const service = new ProductServices()
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const products = await service.find()
        // const product = this.erdasdsa()
        res.json(products)
    }
    catch(err){
        next(err)
    }
})

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body
            const newProduct = await service.create(body)
            res.status(201).json(newProduct)
        }
        catch(err){
            next(err)
        }
    }
)

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const updatedProduct = await service.update(id, body)
            res.json(updatedProduct)
        }
        catch (err) {
            next(err)
        }
    }
)

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteProduct = await service.delete(id)
        res.json(deleteProduct)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const product = await service.findOne(id)
            res.json(product)
        }
        catch (err){
            next(err)
        }
    }
)



module.exports = router
