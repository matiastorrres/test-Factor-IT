import { Typography, AppBar, Toolbar, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeaderGeneral = () => {
    const navigate = useNavigate();
  return (
    <AppBar position="static">
        <Toolbar
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <Link
            underline="none"
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Typography variant="h5" component="div">
              FACTOR-IT E-COMMERCE
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
  )
}

export default HeaderGeneral