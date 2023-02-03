export const standPreview = async (formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_STAND_PREVIEW as string;
  return await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem(
        "standImage",
        JSON.stringify("data:image/png;base64," + data.content)
      );
    });
};
