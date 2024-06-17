import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const AppLayout = () => {
    return (
        <Grid>
          <Header />
          <Grid>
            <Outlet />
          </Grid>
        </Grid>
      );
}

export default AppLayout