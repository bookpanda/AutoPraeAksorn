import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";

import { MyPage } from "$core/@types";
import { useAppContext } from "$core/contexts/app";
import { Loading } from "$modules/Loading";
import { StandImage } from "$modules/StandImage";

import { plates_3 } from "../../public/index";

const StandCheer: MyPage = () => {
  const appContext = useAppContext();
  const { standLoading } = appContext;
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
        className="mt-8 flex justify-center"
        sx={{
          width: "100%",
          display: "flex-col",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {standLoading ? <Loading /> : <StandImage />}
      </Box>
    </Container>
  );
};

export default StandCheer;
