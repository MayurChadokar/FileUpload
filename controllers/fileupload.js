const cloudinary = require("cloudinary").v2;
const File = require("../models/file"); // Ensure this is your Mongoose model

exports.localUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const uploadFile = req.files.file;
    const path = __dirname + "/files/" + Date.now() + `.${uploadFile.name.split(".").pop()}`;

    uploadFile.mv(path, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "File could not be saved locally" });
      }

      return res.status(200).json({ success: true, message: "File uploaded successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "File could not upload" });
  }
};

function isSupported(file, supportedFileTypes) {
  const fileType = file.name.split(".").pop().toLowerCase();
  return supportedFileTypes.includes(fileType);
}

async function uploadToCloudinary(file, folder) {
  const options = { folder };
  const result = await cloudinary.uploader.upload(file.tempFilePath, options);
  return result;
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, email, tag } = req.body;
    const file = req.files?.imageFile;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const supportedFileTypes = ["jpg", "jpeg", "png"];
    if (!isSupported(file, supportedFileTypes)) {
      return res.status(415).json({ success: false, message: "Invalid file type" });
    }

    const response = await uploadToCloudinary(file, "mayurchadokar");

    const fileData = await File.create({
      name,
      email,
      tag,
      imageURL: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: fileData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
