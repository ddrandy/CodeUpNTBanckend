const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Product } = require('../../models');
const authenticate = require('../../middleware/auth');

/**
 * @swagger
 * /api/v2/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 */
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    try {
        const { count, rows } = await Product.findAndCountAll({
            limit: pageSize,
            offset: offset
        });
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            products: rows
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /products
router.post('/',
    authenticate,
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
        res.status(201).json(newProduct);
    }
);

// delete etc...

module.exports = router;