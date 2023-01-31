import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";

import { MyPage } from "$core/@types";
import { useAppContext } from "$core/contexts/app";
import { Gallery } from "$modules/Gallery";
import { ImageProcessor } from "$modules/ImageProcessor";
import { Loading } from "$modules/Loading";

import { plates_3 } from "../../public/index";

const IndexPage: MyPage = () => {
  const appContext = useAppContext();
  const { loading } = appContext;
  return (
    <Container maxWidth="xl">
      <Typography component="h2" fontWeight="bold" variant="h2">
        Auto Prae Aksorn
      </Typography>
      <Box
        sx={{
          width: 3 / 4,
          height: "2rem",
          backgroundColor: "primary.main",
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
          backgroundColor: "paleturquoise",
        }}
      >
        {loading ? <Loading /> : <ImageProcessor />}
        <Gallery />
      </Box>
    </Container>
  );
};

export default IndexPage;
