const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// dummy data
let products = [
    { id: 1, name: 'Hat', price: 12 },
    { id: 2, name: 'Gloves', price: 18 },
    { id: 3, name: 'Glasses', price: 22 },
]

// GET /products
router.get('/', (req, res) => {
    res.json(products);
});

// POST /products
router.post('/',
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const newProduct = {
            id: products.length + 1,
            name: req.body.name,
            price: req.body.price
        };
        products.push(newProduct);
        res.status(201).json(products);
    }
);

// delete etc...

module.exports = router;