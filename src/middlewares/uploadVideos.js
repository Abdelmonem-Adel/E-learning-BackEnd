import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lectures",
    resource_type: "video",
    
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("video/")) cb(null, true);
  else cb(new Error("Only video files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }
});

export default upload;