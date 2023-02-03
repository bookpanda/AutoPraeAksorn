import Image from "next/image";
import Link from "next/link";

import { Box, Button, Container, Typography } from "@mui/material";

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
        className="mt-8 flex flex-col items-center justify-center"
        sx={{
          width: "100%",
          display: "flex-col",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {standLoading ? <Loading /> : <StandImage />}
        <div className="mt-8">
          <Link href="/">
            <Button size="large" variant="outlined">
              Go back
            </Button>
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default StandCheer;
