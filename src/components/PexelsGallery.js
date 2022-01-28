import React, { useEffect, useState } from "react";
import { Card, Box } from "@mui/material";
import Gallery from "react-grid-gallery";
import { getImages, fetchNextPage } from "../api/pexelsApi";
import { useSelector, useDispatch } from "react-redux";
import LoadingButton from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function PexelsGallery() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state) || {};
  const { photosSlice } = state;
  const { total_results: totalPhotos, photos, next_page, isFetchingMorePhotos, page, per_page: perPage } =
    photosSlice;

  const [photosToShow, setPhotosToShow] = useState([]);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  useEffect(() => {
    if (photos.length) updatePhotosArray();
  }, [photos]);

  const updatePhotosArray = () => {
    const customPhotosArray = photos.map((val) => {
      return {
        src: val.src.large,
        thumbnail: val.src.small,
        thumbnailWidth: val.width,
        thumbnailHeight: val.height,
        caption: `${val.alt} by ${val.photographer}`,
      };
    });
    const temp = [...photosToShow];
    temp.push(...customPhotosArray);
    setPhotosToShow(temp);
  };

  return (
    <>
      <Card>
        <div style={{marginLeft: "2rem", float:"left", marginTop: ".5rem"}}>Total photos: {totalPhotos}</div>
        <Box sx={{p:4}}>

        {photosToShow.length && (
          <Gallery 
            images={photosToShow} 
            direction={"row"}
            enableImageSelection={false}
            enableLightbox={true} // open every photo
            backdropClosesModal={true}
          />
        )}
        </Box>
      </Card>

      <div>
        {next_page && (
          <div style={{mt:2}} >
          <LoadingButton
            
            loading={isFetchingMorePhotos}
            variant="text"
            onClick={() => {
              dispatch(fetchNextPage(photosSlice));
              updatePhotosArray();
            }}
          >
            Load more
          </LoadingButton> 
          ({page} of {Math.ceil(totalPhotos / perPage)})
          </div>
        )}
      </div>
      <ArrowUpwardIcon
        color="primary"
        sx={{
          justifyContent: "flex-end",
          marginLeft: "38rem",
          bottom: "4rem",
          cursor: "pointer",
          position: "fixed",
          float: "left",
          zIndex: 9999,
          opacity: 1,
          transform: "translateY(0)",
          transition: "all 5s ease",
          fontSize: 50,
          backgroundColor: "#ffffff",
          borderRadius: "50%",
        }}
        onClick={() => window.scrollTo(0, 0)}
      />
    </>
  );
}
