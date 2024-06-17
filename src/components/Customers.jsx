import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { InfoContext } from "../context/InfoContext";
import { customers } from "../mocks/customers";


const Customers = () => {
  const { login } = useContext(InfoContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      sx={{ marginTop: "2rem"}}
    >
      {customers.map((customer) => (
        <Grid key={customer.id} margin={isSmallScreen ? "0.5rem":"1rem 2rem"}>
          <Button
            onClick={() => {
              login(customer);
              navigate("/");
            }}
            variant="contained"
            sx={{
              color: "white",
              padding: "1rem",
              width: isSmallScreen? "150px" :"250px",
              height: isSmallScreen? "70px" :"100px",
            }}
          >
            <Typography variant={isSmallScreen? "h6":"h2"}>
              {customer.name}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Customers;
