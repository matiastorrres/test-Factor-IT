import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Link,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { InfoContext } from "../context/InfoContext";

const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials;
};

const minDate = new Date("2020-01-01");
const maxDate = new Date("2030-12-31");

const Header = () => {
  const [errorText, setErrorText] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { totalProducts, currentDate, setCurrentDate, selectClient, logout } =
    useContext(InfoContext);

  return (
    <AppBar position="fixed">
      <Toolbar size="large" edge="start" color="inherit" aria-label="menu">
        <Link
          underline="none"
          sx={{
            color: "white",
            cursor: "pointer",
            marginRight: { xs: "1rem", sm: "4rem" },
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight="bold"
            textAlign="center"
          >
            FACTOR-IT
          </Typography>
        </Link>
        <DemoContainer components={["DatePicker"]} sx={{ flexGrow: "1" }}>
          <DatePicker
            label="Date simulator"
            minDate={minDate}
            maxDate={maxDate}
            value={currentDate}
            onChange={(newValue) => {
                const dateValue = new Date(newValue);
                if (!isNaN(dateValue)) {
                  if (dateValue < minDate || dateValue > maxDate) {
                    setErrorText(true);
                    setCurrentDate(null)
                  } else {
                    setCurrentDate(newValue);
                    setErrorText(false);
                  }
                } 
            }}
            sx={{
              "& .MuiInputBase-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "0 0 3px 0",
                  width: isSmallScreen ? "110px" : "180px",
                },
                width: isSmallScreen ? "110px" : "180px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                paddingTop: "10px",
                paddingBottom: "2px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.54)",
              },
            }}
          />
          {errorText && (
            <Typography color="error">
              Incorrect date. Please select a valid date between 2020-01-01 to
              2030-12-31.
            </Typography>
          )}
        </DemoContainer>

        {selectClient && (
          <>
            <Avatar>{getInitials(selectClient.name)}</Avatar>
            {!isSmallScreen && (
              <Typography marginX="0.5rem">{selectClient.name}</Typography>
            )}
          </>
        )}

        <IconButton
          aria-label="cart"
          onClick={() => navigate("/cart")}
          sx={{ marginLeft: { xs: "0", sm: "1rem" } }}
        >
          <Badge badgeContent={totalProducts} color="secondary">
            <ShoppingCartIcon color="action" />
          </Badge>
        </IconButton>

        {!selectClient && (
          <Tooltip title="Login">
            <IconButton
              aria-label="cart"
              onClick={() => navigate("/login")}
              sx={{ marginLeft: { xs: "0", sm: "1rem" } }}
            >
              <LoginIcon color="action" />
            </IconButton>
          </Tooltip>
        )}

        {selectClient && (
          <Tooltip title="Logout">
            <IconButton
              aria-label="cart"
              onClick={logout}
              sx={{ marginLeft: { xs: "0", sm: "1rem" } }}
            >
              <LogoutIcon color="action" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
