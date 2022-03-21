const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  //   cloud_name: "imgpetapp",
  //   api_key: "831974973319339",
  //   api_secret: "6EbStdVcBAQfDLVdvAFTuYCmr-M",
});

exports.uploads = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, function (error, result) {
      if (error) reject(error);
      else resolve(result);
    });
  });
};
