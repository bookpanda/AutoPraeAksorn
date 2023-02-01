import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import Image from "next/image";

import { ListItem } from "@mui/material";

type GalleryItemProps = {
  index: number;
  picture: string;
};

export const GalleryItem: FC<GalleryItemProps> = ({ index, picture }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? "bg-gray-100" : ""}
        >
          <Image
            alt="picture"
            className="mb-2"
            height={100}
            src={picture}
            width={100}
          />
        </ListItem>
      )}
    </Draggable>
  );
};
