import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import Image from "next/image";
import Link from "next/link";

import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import StadiumIcon from "@mui/icons-material/Stadium";
import { Button, IconButton, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";

import { useAppContext } from "$core/contexts/app";

type GalleryItemProps = {
  index: number;
  picture: string;
};

export const GalleryItem: FC<GalleryItemProps> = ({ index, picture }) => {
  const matchesMD = useMediaQuery("(min-width:900px)");
  const appContext = useAppContext();
  const {
    currentImage,
    downloadJSON,
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
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "grid w-full grid-cols-12 items-center p-4",
            snapshot.isDragging ? "bg-gray-100" : "bg-white"
          )}
        >
          <div className="col-span-1 flex items-center justify-center space-x-8">
            <DragIndicatorIcon sx={{ fontSize: 35 }} />
            {matchesMD && (
              <Typography component="h6" variant="h6">
                {index}
              </Typography>
            )}
          </div>
          <div className="relative col-start-3 col-end-9 flex overflow-hidden md:col-start-3 md:col-end-5">
            {/* <button
              className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center rounded-xl bg-gray-100 bg-opacity-90 text-center opacity-0 duration-300 hover:cursor-pointer hover:opacity-80"
              onClick={() => handlePreview()}
            >
              <Typography component="p" variant="body1">
                Preview
              </Typography>
            </button> */}
            <Image
              alt="picture"
              className="rounded-xl duration-300 hover:cursor-pointer hover:opacity-60"
              height={200}
              src={picture}
              width={200}
              onClick={() => handlePreview()}
            />
          </div>
          <div className="col-start-10 col-end-11 flex items-center justify-center space-x-8 md:col-start-5 md:col-end-7">
            {standLoading ? (
              <IconButton color="primary" component="label" disabled>
                <StadiumIcon sx={{ fontSize: "5vh" }} />
              </IconButton>
            ) : (
              <Link href="/standcheer">
                <IconButton
                  color="primary"
                  component="label"
                  onClick={() => handleStandCheer()}
                >
                  <StadiumIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Link>
            )}
          </div>
          <div className="col-start-8 col-end-10 hidden items-center justify-center space-x-8 md:flex">
            {/* <Button variant="text">PDF</Button> */}
            <Button variant="text" onClick={() => downloadJSON(index)}>
              CARD CODE (JSON)
            </Button>
          </div>
          <div className="col-start-12 col-end-12 flex items-center justify-center">
            <IconButton
              aria-label="cheer"
              color="primary"
              component="label"
              onClick={() => handleDelete()}
            >
              <DeleteIcon color="error" sx={{ fontSize: "5vh" }} />
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );
};
