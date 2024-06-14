const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API for managing products",
    },
    servers: [
      {
        url:
          "http://localhost:5000/api/v1" ||
          "https://stackbuild.onrender.com/api",
      },
    ],
  },
  apis: [
    "docs/auth.doc.js",
    "docs/user.doc.js",
    "docs/search.doc.js",
    "docs/posts.doc.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
