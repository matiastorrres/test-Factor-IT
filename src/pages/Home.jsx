import { Grid } from "@mui/material";

import Products from "../components/Products";
import imgBanner from "../assets/img/banner.png";

const Home = () => {
  return (
    <Grid>
      <Grid textAlign="center" marginTop="4.5rem">
        <img
          src={imgBanner}
          alt="banner"
          style={{ height: "400px", width: "95%" }}
        />
      </Grid>
      <Products />
    </Grid>
  );
};

export default Home;
