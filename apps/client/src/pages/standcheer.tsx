import Link from "next/link";

import { Box, Button } from "@mui/material";

import { MyPage } from "$core/@types";
import { useAppContext } from "$core/contexts/app";
import DefaultLayout from "$core/layouts/default";
import { Loading } from "$modules/Loading";
import { StandImage } from "$modules/StandImage";

const StandCheer: MyPage = () => {
  const appContext = useAppContext();
  const { standLoading } = appContext;
  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

export default StandCheer;
