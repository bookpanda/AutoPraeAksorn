import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import StadiumIcon from "@mui/icons-material/Stadium";
import { Button, IconButton, ListItem, Typography } from "@mui/material";
import clsx from "clsx";

import { useAppContext } from "$core/contexts/app";

type GalleryItemProps = {
  index: number;
  picture: string;
};

export const GalleryItem: FC<GalleryItemProps> = ({ index, picture }) => {
  const appContext = useAppContext();
  const {
    currentImage,
    setCurrentImage,
    setDeletePopup,
    setPreview,
    setStandLoading,
    standCheer,
    standLoading,
  } = appContext;
  const handlePreview = () => {
    setCurrentImage({ ...currentImage, base64: picture });
    setPreview(true);
  };
  const handleDelete = () => {
    setCurrentImage({ ...currentImage, index });
    setDeletePopup(true);
  };
  const handleStandCheer = () => {
    setStandLoading(true);
    standCheer(picture);
  };
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "grid w-full grid-cols-12 items-center p-4",
            snapshot.isDragging ? "bg-gray-100" : "bg-white"
          )}
        >
          <div className="col-span-1 flex items-center justify-center">
            <DragIndicatorIcon className="mr-8" sx={{ fontSize: 35 }} />
            <Typography component="h6" variant="h6">
              {index}
            </Typography>
          </div>
          <div className="relative col-start-3 col-end-5 flex">
            <button
              className="absolute inset-0 z-10 flex w-[200px] flex-col items-center justify-center rounded-xl bg-gray-100 bg-opacity-90 text-center opacity-0 duration-300 hover:cursor-pointer hover:opacity-80"
              onClick={() => handlePreview()}
            >
              <Typography component="p" variant="body1">
                Preview
              </Typography>
            </button>
            <Image
              alt="picture"
              className="rounded-xl"
              height={200}
              src={picture}
              width={200}
            />
          </div>
          <div className="col-start-5 col-end-7 flex items-center justify-center space-x-8">
            {standLoading ? (
              <IconButton color="primary" component="label" disabled>
                <StadiumIcon sx={{ fontSize: 40 }} />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                component="label"
                onClick={() => handleStandCheer()}
              >
                <StadiumIcon sx={{ fontSize: 40 }} />
              </IconButton>
            )}
          </div>
          <div className="col-start-8 col-end-10 flex items-center justify-center space-x-8">
            {/* <Button variant="text">PDF</Button> */}
            <Button variant="text">CARD CODE (JSON)</Button>
          </div>
          <div className="col-start-12 col-end-12 flex items-center justify-center">
            <IconButton
              aria-label="cheer"
              color="primary"
              component="label"
              onClick={() => handleDelete()}
            >
              <DeleteIcon color="error" sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </ListItem>
      )}
    </Draggable>
  );
};
