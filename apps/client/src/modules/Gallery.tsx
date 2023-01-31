import React, { FC, useEffect, useState } from "react";

import Image from "next/image";

import { ImagesData } from "$core/@types";

export const Gallery: FC = () => {
  const [imgL, setImgL] = useState<string[]>([]);
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      const gallery = [];
      for (let i = 0; i < image.data.length; i++) {
        gallery.push("data:image/png;base64," + image.data[i].base64);
      }
      setImgL(gallery);
    }
  }, []);
  return (
    <>
      {imgL.map((picture, index) => (
        <Image
          key={index}
          alt="Crop me"
          className="mb-2"
          height={100}
          src={picture}
          width={100}
        />
      ))}
    </>
  );
};
