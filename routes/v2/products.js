const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Product } = require('../../models');

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 */
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// POST /products
router.post('/',
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const product = {
            name: req.body.name,
            price: req.body.price
        };
        const newProduct = await Product.create(product);
        const products = await Product.findAll();
        res.status(201).json(products);
    }
);

// delete etc...

module.exports = router;