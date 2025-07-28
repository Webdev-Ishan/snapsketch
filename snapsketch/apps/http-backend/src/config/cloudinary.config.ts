import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_NAME } from "@repo/backend-common/config";
import { CLOUDINARY_API_SECRET } from "@repo/backend-common/config";
import { CLOUDINARY_API_KEY } from "@repo/backend-common/config";
const cloudconfig = async () => {
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
};

export default cloudconfig;
