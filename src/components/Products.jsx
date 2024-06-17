import { useContext, useEffect, useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  Tooltip,
  CardActions,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { InfoContext } from "../context/InfoContext";

const API_PRODUCTS = "https://fakestoreapi.com";

const getApiProducts = async () => {
  const response = await fetch(`${API_PRODUCTS}/products`);
  const products = await response.json();
  return products;
};

const Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAlert, setAlert] = useState(false);

  const { addToCart, selectClient } = useContext(InfoContext);

  console.log("selectClient", selectClient)

  const handleAlertClick = () => {
    setAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const resp = await getApiProducts();
      setProducts(resp);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container justifyContent="center" sx={{ gap: 5, margin: "4rem 0" }}>
      {loading
        ? Array.from(Array(20).keys()).map((index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={300}
              height={400}
              animation="wave"
            />
          ))
        : products?.map((product) => (
            <Card key={product.id} sx={{ width: "300px" }} elevation={8}>
              <CardMedia
                component="img"
                alt="product"
                sx={{ height: "300px", objectFit: "contain", width: "100%" }}
                image={product.image}
              />
              <CardContent>
                <Tooltip title={product.title} placement="top">
                  <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Tooltip>
                <Typography textAlign="center">${product.price}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => {
                    addToCart(product);
                    if(selectClient){
                      handleAlertClick();
                    }
                  }}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          ))}
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={handleAlertClose}
        >
          A product was added to your shopping cart
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Products;
