import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";

import { MyPage } from "$core/@types";
import { useAppContext } from "$core/contexts/app";
import { DeletePopup } from "$modules/DeletePopup";
import { Gallery } from "$modules/Gallery";
import { ImageProcessor } from "$modules/ImageProcessor";
import { Loading } from "$modules/Loading";
import { Preview } from "$modules/Preview";

import { plates_3 } from "../../public/index";

const IndexPage: MyPage = () => {
  const appContext = useAppContext();
  const { loading, standLoading } = appContext;
  return (
    <Container maxWidth="xl">
      <Typography component="h2" fontWeight="bold" variant="h2">
        Auto Prae Aksorn
      </Typography>
      <Box
        sx={{
          width: 3 / 4,
          height: "2rem",
          overflow: "hidden",
        }}
      >
        <Image alt="plates" src={plates_3} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex-col",
          alignContent: "center",
          justifyContent: "center",
          paddingBottom: "10vh",
        }}
      >
        {loading || standLoading ? <Loading /> : <ImageProcessor />}
        <Gallery />
      </Box>
      <Preview />
      <DeletePopup />
    </Container>
  );
};

export default IndexPage;
