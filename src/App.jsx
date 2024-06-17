import { useContext, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { InfoContext } from "./context/InfoContext";
import Loadable from "./components/Loadable";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

const GeneralLayout = Loadable(lazy(() => import("./Layouts/GeneralLayout")));
const AppLayout = Loadable(lazy(() => import("./Layouts/AppLayout")));

const App = () => {
  const { selectClient } = useContext(InfoContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffbf3c",
      },
    },
    typography: {
      h2: {
        fontWeight: 500,
        fontSize: "24px",
        lineHeight: "38.19px",
      },
      h3: {
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "38.19px",
      },
      h6: {
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: "1.5",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            boxShadow: "none",
            fontSize: "22px",
            lineHeight: "24px",
            fontWeight: "500",
            "&:hover": {
              boxShadow: "none",
            },
            borderRadius: "7px",
            color: "#ffffff",
          },
          sizeMedium: {
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "25px",
            paddingRight: "25px",
          },
          sizeLarge: {
            paddingTop: "24px",
            paddingBottom: "24px",
            paddingLeft: "54px",
            paddingRight: "54px",
          },
          outlined: {
            color: "#ffbf3c",
          },
        },
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/cart",
          element: selectClient ? <Cart /> : <Navigate to="/login" />,
        },
      ],
    },
    {
      path: "/login",
      element: <GeneralLayout />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/dashboard/",
      element: <GeneralLayout />,
      children: [{ path: "", element: <Dashboard /> }],
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
