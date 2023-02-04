import { ImagesData } from "$core/@types";

export const fetchData = async (formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_PROCESS_IMAGE as string;
  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let imagesData: ImagesData = { data: [] };
      if (localStorage.getItem("images") !== null) {
        imagesData = JSON.parse(localStorage.getItem("images") as string);
      }
      imagesData.data.push({
        base64: "data:image/png;base64," + data.content,
        code: data.kradatTak,
      });
      localStorage.setItem("images", JSON.stringify(imagesData));
    });
};
