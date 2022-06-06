const cloudinary = require('cloudinary').v2;

const cloudinaryUpload = async (imagePath) => {
    let response;
    await cloudinary.uploader.upload(imagePath, (error, res) => {
        response = res;
    })

    return response;
}

module.exports = {
    cloudinaryUpload
}