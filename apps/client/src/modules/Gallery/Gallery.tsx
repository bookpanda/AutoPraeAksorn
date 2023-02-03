import React, { FC } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import DownloadIcon from "@mui/icons-material/Download";
import { Button, Divider, Typography } from "@mui/material";

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
    localStorage.setItem("images", JSON.stringify({ data: newItems }));
  };
  return (
    <>
      <div className="grid w-full grid-cols-12 items-center p-4">
        <div className="col-span-1 flex items-center justify-center">
          <Typography component="h6" variant="h6">
            Index
          </Typography>
        </div>
        <div className="col-start-3 col-end-4 ml-20 flex items-center justify-center">
          <Typography component="h6" variant="h6">
            Card
          </Typography>
        </div>
        <div className="col-start-5 col-end-7 flex items-center justify-center">
          <Typography component="h6" variant="h6">
            ขึ้นแสตนเชียร์
          </Typography>
        </div>
        <div className="col-start-8 col-end-12 flex items-center justify-center space-x-8">
          <Button startIcon={<DownloadIcon />} variant="outlined">
            กระดาษตักทุกรูป (pdf)
          </Button>
          <Button startIcon={<DownloadIcon />} variant="outlined">
            กระดาษตักทุกรูป (json)
          </Button>
        </div>
      </div>
      <Divider variant="middle" />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={makeid(20)}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <>
                  <GalleryItem
                    key={index}
                    index={index}
                    picture={item.base64}
                  />
                  <Divider variant="middle" />
                </>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
