import React, { FC, useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { ImagesData } from "$core/@types";

import { GalleryItem } from "./components/GalleryItem";
import { reorder } from "./reorder";

export const Gallery: FC = () => {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const a = localStorage.getItem("images");
    if (a) {
      const image: ImagesData = JSON.parse(a);
      const gallery = [];
      for (let i = 0; i < image.data.length; i++) {
        gallery.push("data:image/png;base64," + image.data[i].base64);
      }
      setItems(gallery);
    }
  }, []);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
    console.log(newItems);

    // localStorage.setItem("images", newItems);
  };
  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={makeid(5)}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <GalleryItem key={index} index={index} picture={item} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* {items.map((picture, index) => (
        <Image
          key={index}
          alt="Crop me"
          className="mb-2"
          height={100}
          src={picture}
          width={100}
        />
      ))} */}
    </>
  );
};
