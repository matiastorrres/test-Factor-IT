import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../context/InfoContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  ListItem,
  List,
  ButtonGroup,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const {
    cartItems,
    removeProduct,
    cartState,
    addToCart,
    deleteProductUnit,
    totalProducts,
    selectClient,
    deleteCart,
    currentDate,
    getCartType,
  } = useContext(InfoContext);

  const [discount, setDiscount] = useState(0);
  const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertSuccess, setOpenAlertSucces] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAlertSucces = () => {
    setOpenAlertSucces(true);
  };

  const handleAlertSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertSucces(false);
  };


  const handleAlertError = () => {
    setOpenAlertError(true);
  };

  const handleAlertErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };




  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const buy = () => {
    if(!currentDate) return handleAlertError()
    const searchUserCart = localStorage.getItem(selectClient.id);
    const buys = {
      id: uuidv4(),
      total: totalPrice,
      date: currentDate,
    };
    let shoppingList;
    if (searchUserCart) {
      const convertJson = JSON.parse(searchUserCart);
      shoppingList = JSON.stringify([...convertJson, buys]);
    } else {
      shoppingList = JSON.stringify([buys]);
    }
    localStorage.setItem(selectClient.id, shoppingList);
    deleteCart();
    getCartType();
    handleAlertSucces()
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = cartItems
        .reduce((total, item) => total + item.price * item.amount, 0)
        .toFixed(2);
        setTotalWithoutDiscount(total);

      let discount = 0;

      if (totalProducts === 4) {
        discount = total * 0.25;
      } else if (totalProducts > 10 && cartState === "CommonCart") {
        discount = 100;
      } else if (totalProducts > 10 && cartState === "specialDateCart") {
        discount = 300;
      } else if (totalProducts > 10 && cartState === "vipCart") {
        const lowestPrice = cartItems.reduce((minPrecio, product) => {
          return Math.min(parseFloat(minPrecio), parseFloat(product.price));
        }, parseFloat(cartItems[0].price));
        discount = 500 + lowestPrice;
      }

      setDiscount(discount);
      setTotalPrice(total - discount);
    };

    calculateTotalPrice();
  }, [cartItems, cartState, totalProducts, removeProduct]);

  return (
    <Grid>
      <Grid container marginTop="4rem">
        <Grid item xs={12} md={6} padding="2rem" width="100%">
          <Paper
            elevation={15}
            sx={{
              margin: !isMediumScreen && "1rem",
              padding: isMediumScreen ? "1rem" : "2rem",
              position: isMediumScreen ? "static" : "fixed",
              width: {
                xs: "100%",
                md: "45%",
              },
            }}
          >
            <Typography variant="h2">Purchase Summary</Typography>
            <Divider />
            {cartItems.length === 0 ? (
              <Grid marginTop="2rem">
                Here you will see the amounts of your purchase once you add
                products.
              </Grid>
            ) : (
              <Grid textAlign="center">
                <Typography sx={{color:"primary.main", fontWeight:"bold"}} variant="h2">{cartState}</Typography>
                <List>
                  {cartItems?.map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      {item.title} - ${item.price} x {item.amount} = $
                      {(item.price * item.amount).toFixed(2)}
                    </ListItem>
                  ))}
                  <Divider sx={{ marginY: "1rem" }} />
                  <ListItem sx={{ display: "flex", justifyContent: "end" }}>
                    TOTAL WITHOUT DISCOUNT: ${totalWithoutDiscount}
                  </ListItem>
                  <ListItem sx={{ display: "flex", justifyContent: "end" }}>
                    DISCOUNT: - ${discount.toFixed(2)}
                  </ListItem>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL: ${totalPrice.toFixed(2)}
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  onClick={buy}
                  fullWidth
                  sx={{
                    margin: "1rem auto",
                    width: isMediumScreen ? "150px" : "300px",
                  }}
                >
                  BUY
                </Button>
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} width="100%" padding="2rem">
          {cartItems.length === 0 ? (
            <Paper elevation={15} sx={{ margin: "1rem", padding: "1rem" }}>
              <Grid textAlign="center">
                <LocalMallOutlinedIcon
                  sx={{ height: "300px", width: "250px" }}
                  color="action"
                />
                <Typography>Start a shopping cart!</Typography>
                <Typography marginBottom="2rem">
                  Add products and get free shipping.
                </Typography>
                <Button variant="contained" onClick={() => navigate("/")}>
                  Discover products
                </Button>
              </Grid>
            </Paper>
          ) : (
            cartItems?.map((item) => (
              <Paper
                elevation={15}
                key={item.id}
                sx={{ margin: "0.5rem", padding: "1rem" }}
              >
                <Typography variant="h2" marginY="1rem">
                  {item.title}
                </Typography>
                <Divider />
                <Grid container alignItems="center">
                  <Grid item xs={12} xl={2} padding="1rem" textAlign="center">
                    <img
                      src={item.image}
                      style={{ height: "150px", width: "100px" }}
                    />
                  </Grid>
                  <Grid item xs={12} xl={6} textAlign="center">
                    <Typography marginY="1rem">{item.category}</Typography>
                    <Typography marginY="1rem">{item.description}</Typography>
                    <Rating
                      name="read-only"
                      value={item.rating.rate}
                      readOnly
                    />
                    <Typography>{item.rating.count} ratings</Typography>
                    <Button
                      onClick={() => removeProduct(item)}
                      sx={{ marginY: "1rem", color: "primary.main" }}
                    >
                      Eliminate
                    </Button>
                  </Grid>
                  <Grid item xs={12} xl={2} textAlign="center">
                    <ButtonGroup>
                      <Button
                        disabled={item.amount === 1}
                        aria-label="reduce"
                        onClick={() => {
                          deleteProductUnit(item);
                        }}
                        size="small"
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button size="small" disabled>
                        {item.amount}
                      </Button>
                      <Button
                        aria-label="increase"
                        onClick={() => {
                          addToCart(item);
                        }}
                        size="small"
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={12} xl={2} textAlign="center">
                    <Typography variant="h2">
                      ${(item.price * item.amount).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Grid>
      </Grid>
      <Snackbar
        open={openAlertError}
        autoHideDuration={5000}
        onClose={handleAlertErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          variant="filled"
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          severity="error"
          onClose={handleAlertErrorClose}
        >
          You must select a date in the simulator
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertSuccess}
        autoHideDuration={5000}
        onClose={handleAlertSuccessClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
          onClose={handleAlertSuccessClose}
        >
         Purchase completed successfully
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Cart;
