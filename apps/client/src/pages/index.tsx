import { Box } from "@mui/material";

import { MyPage } from "$core/@types";
import { useAppContext } from "$core/contexts/app";
import DefaultLayout from "$core/layouts/default";
import { DeletePopup } from "$modules/DeletePopup";
import { Gallery } from "$modules/Gallery";
import { ImageProcessor } from "$modules/ImageProcessor";
import { Loading } from "$modules/Loading";
import { Preview } from "$modules/Preview";

const IndexPage: MyPage = () => {
  const appContext = useAppContext();
  const { loading, standLoading } = appContext;
  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

export default IndexPage;
