// config/env.js

// This configuration file contains sensitive information.
// Ensure that it is added to .gitignore to prevent accidental exposure.
require('dotenv').config();

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

module.exports = {
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  };
  