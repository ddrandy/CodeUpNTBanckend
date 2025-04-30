const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth');
const { Order, OrderItem, Product } = require('../../models');

// Create order
router.post('/', authenticate, async (req, res) => {
  try {
    const { items } = req.body;

    // calculate total
    const productIds = items.map(item => item.productId);
    const products = await Product.findAll({ where: { id: productIds } });

    const total = products.reduce((sum, product) => {
      const item = items.find(i => i.productId === product.id);
      return sum + (product.price * item.quantity);
    }, 0);

    // create order
    const order = await Order.create({
      total,
      userId: req.userId
    });

    // create order items
    const orderItems = items.map(item => ({
      ...item,
      orderId: order.id,
      price: products.find(p => p.id === item.productId).price
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's orders
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      include: {
        model: OrderItem,
        include: [Product]
      }
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;