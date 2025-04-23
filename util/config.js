require('dotenv').config();
const port = process.env.PORT || 3000

module.exports = {
    // app basic config
    app: {
        port,
        environment: process.env.NODE_ENV || 'development',
    },

    // database config
    sequelize: {
        dialect: 'sqlite',
        storage: './database.sqlite'
    },

    // swagger config
    swaggerOptions: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: "Shopping API",
                version: "1.0.0",
                description: "API for managing products and orders"
            },
            servers: [{ url: `http://localhost:${port}` }],
        },
        apis: ['./routes/**/*.js'],
    },

    // jwt configurations
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    }
}