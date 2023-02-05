import React, { FC, PropsWithChildren } from "react";

import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";

import { plates_3 } from "../../../public/index";

const Default: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Typography component="h2" fontWeight="bold" mt={2} variant="h3">
        AutoPraeAksorn
      </Typography>
      <Box
        sx={{
          width: { xs: 1, md: 3 / 4 },
          height: { xs: "2rem" },
          overflow: "clip",
        }}
      >
        <Image alt="plates" className="" src={plates_3} />
      </Box>
      {children}
    </Container>
  );
};

export default Default;
