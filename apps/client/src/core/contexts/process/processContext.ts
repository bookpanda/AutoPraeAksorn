import { RefObject, createContext, useContext } from "react";
import { Crop, PixelCrop } from "react-image-crop";

interface IProcessContext {
  imgSrc: string;
  previewCanvasRef: RefObject<HTMLCanvasElement> | null;
  imgRef: RefObject<HTMLImageElement> | null;
  crop: Crop | undefined;
  completedCrop: PixelCrop | undefined;
  scale: number;
  rotate: number;
  aspect: number | undefined;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  handleToggleAspectClick: () => void;
  setScale: (scale: number) => void;
  setRotate: (rotation: number) => void;
  setCrop: (crop: Crop) => void;
  setCompletedCrop: (completedCrop: PixelCrop) => void;
  processImage: () => void;
}

export const ProcessContext = createContext<IProcessContext>({
  imgSrc: "",
  previewCanvasRef: null,
  imgRef: null,
  crop: undefined,
  completedCrop: undefined,
  scale: 1,
  rotate: 0,
  aspect: 2 / 1,
  onSelectFile: () => null,
  onImageLoad: () => null,
  handleToggleAspectClick: () => null,
  setScale: () => null,
  setRotate: () => null,
  setCrop: () => null,
  setCompletedCrop: () => null,
  processImage: () => null,
});

export function useProcessContext() {
  return useContext(ProcessContext);
}
