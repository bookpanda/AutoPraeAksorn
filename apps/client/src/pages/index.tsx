import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";

import { MyPage } from "$core/@types";
import { ImageProcessor } from "$modules/ImageProcessor";

import { plates_3 } from "../../public/index";

const IndexPage: MyPage = () => {
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
        <ImageProcessor />
      </Box>
    </Container>
  );
};

export default IndexPage;
