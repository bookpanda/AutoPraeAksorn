import { Crop } from "react-image-crop";

export function getCroppedImg(
  image: CanvasImageSource,
  pixelCrop: Crop,
  fileName = "image"
) {
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  console.log(`width: ${pixelCrop.width}, height: ${pixelCrop.height}`);

  (ctx as CanvasRenderingContext2D).drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  //   const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      //   file.name = fileName;
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error("Canvas is empty");
        return;
      }
      //   blob.name = fileName;

      resolve(window.URL.createObjectURL(blob));
      //   resolve(blob);
    }, "image/jpeg");
  });
}
