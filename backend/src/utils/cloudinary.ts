import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

async function uploadImageToCloudinary(image: Express.Multer.File) {
  const b64 = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${b64}`;

  try {
    const response = await cloudinary.uploader.upload(dataURI);
    return response.url;

  } catch (error: any) {
    console.error(`Error uploading ${image.originalname} to Cloudinary:`, error);
    return error.message;
  }
}


export const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  try {
    const uploadPromises = imageFiles.map(
      async (image) => uploadImageToCloudinary(image)
    );

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;

  } catch (error: any) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image to Cloudinary');
  }
};
