import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import HeaderGeneral from "../components/HeaderGeneral";

const GeneralLayout = () => {
  return (
    <Grid>
      <HeaderGeneral />
      <Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default GeneralLayout;
