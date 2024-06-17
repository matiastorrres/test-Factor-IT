import { Button, Typography, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Customers from "../components/Customers";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid container paddingBottom="2rem">
        <Grid item xs={12} sm={6}>
          <Typography
            variant={isSmallScreen ? "h2" : "h1"}
            paddingTop={isSmallScreen ? "1rem" : "4rem"}
            textAlign="center"
          >
            Hello! To buy, choose some of the users
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Customers />
        </Grid>
      </Grid>
      <Divider />
      <Grid textAlign="center" marginBottom="1rem">
        <Typography variant="h2" paddingY="2rem" textAlign="center">
          Log in as managed to see your customer data
        </Typography>
        <Button onClick={() => navigate("/dashboard")} variant="contained">
          Dashboard
        </Button>
      </Grid>
    </>
  );
};

export default Login;
