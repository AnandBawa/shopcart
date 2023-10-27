import path from "path";
import multer from "multer";
import DataParser from "datauri/parser.js";

// use multer memory storage for compatibility with Render and datauri to parse it to upload to Cloudinary

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};
