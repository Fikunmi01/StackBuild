const cloudinary = require('cloudinary').v2;
const {
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY,
    CLOUDINARY_CLOUD_NAME,
} = require('../config/env');

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
});

const uploadToCloudinary = async (filepath, option) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filepath,
            {
                ...option,
                overwrite: true, // whether to overwrite the image if it already exists
            },
            (err, res) => {
                if (err) {
                    reject(err);
                } else if (res) {
                    // Return the public URL of the uploaded image
                    resolve({ url: res.secure_url, id: res.public_id });
                } else {
                    reject(new Error('Something went wrong'));
                }
            }
        );
    });
};

module.exports = { uploadToCloudinary };
