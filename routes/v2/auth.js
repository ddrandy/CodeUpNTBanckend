const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../../models');
const config = require('../../util/config')

// user register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashPasswd = bcrypt.hashSync(password, 10);
        const user = await User.create({ email, password: hashPasswd });
        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn },
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

module.exports = router;