import React, { FC } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { ImagesData } from "$core/@types";
import { useAppContext } from "$core/contexts/app";

import { GalleryItem } from "./components/GalleryItem";
import { makeid } from "./makeId";
import { reorder } from "./reorder";

export const Gallery: FC = () => {
  const appContext = useAppContext();
  const { images, setImages } = appContext;
  const items = images.data;
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(items, source.index, destination.index);
    setImages({ data: newItems });

    const imagesData: ImagesData = { data: [] };
    for (let i = 0; i < newItems.length; i++) {
      imagesData.data.push({
        base64: newItems[i].base64,
        code: [[0]],
      });
    }
    localStorage.setItem("images", JSON.stringify(imagesData));
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={makeid(5)}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <GalleryItem key={index} index={index} picture={item.base64} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
