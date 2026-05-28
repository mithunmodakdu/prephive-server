import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => {
      const extension = file.originalname.split(".").pop();

      const fileName = file.originalname
        .toLowerCase()
        .replace(/\./g, "")
        .replace(extension, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName +
        "." +
        extension;

      return uniqueFileName;
    }
  }
});

export const uploadByMulter = multer({ storage: storage });
