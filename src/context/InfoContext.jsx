import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { parse, isSameDay, isSameMonth, parseISO } from "date-fns";

const specialDates = ["20-08-2024", "21-08-2024", "22-08-2024"];

export const InfoContext = createContext({});

export const InfoProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [selectClient, setSellectClient] = useState(
    JSON.parse(localStorage.getItem("selectClient")) || null
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSpecialDate, setIsSpecialDate] = useState(false);
  const [cartState, setCartState] = useState("commonCart");

  const addToCart = (item) => {

    const itemExists = cartItems.find((el) => el.id === item.id);
    if (itemExists) {
      const updatedCartItems = cartItems.map((el) =>
        el.id === item.id ? { ...el, amount: el.amount + 1 } : el
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      setCartItems([...cartItems, { ...item, amount: 1 }]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { ...item, amount: 1 }])
      );
    }
  };

  const deleteProductUnit = (item) => {
    const updatedCartItems = cartItems.map((el) =>
      el.id === item.id && el.amount > 1 ? { ...el, amount: el.amount - 1 } : el
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeProduct = (item) => {
    const filterProduct = cartItems.filter((product) => product.id !== item.id);
    setCartItems(filterProduct);
    localStorage.setItem("cartItems", JSON.stringify(filterProduct));
  };

  const deleteCart = () => {
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const totalProducts = cartItems?.reduce(
    (total, item) => total + item.amount,
    0
  );

  const isVip = (customer) => {
    const shoppingHistoryJson = localStorage.getItem(customer?.id);
    const shoppingHistory = JSON.parse(shoppingHistoryJson);
    const filterPurchasesByMonthAndYear = shoppingHistory?.filter((buy) => {
      const dateBuy = parseISO(buy.date);
      return isSameMonth(dateBuy, currentDate);
    });
    const sumarCompras = filterPurchasesByMonthAndYear?.reduce(
      (total, item) => total + item.total,
      0
    );
    return sumarCompras > 10000;
  };

  const login = (customer) => {
    setSellectClient(customer);
    localStorage.setItem("selectClient", JSON.stringify(customer));
  };

  const logout = () => {
    setSellectClient(null);
    setCartItems([]);
    localStorage.removeItem("selectClient");
    localStorage.removeItem("cartItems");
  };

  const getCartType = () => {
    const isPromotionDate = specialDates.some((date) => {
      const convertStringToDate = parse(date, "dd-MM-yyyy", new Date());
      return isSameDay(convertStringToDate, currentDate);
    });
    setIsSpecialDate(isPromotionDate);

    if (isVip(selectClient)) {
      return setCartState("vipCart");
    } else if (isPromotionDate && selectClient) {
      return setCartState("specialDateCart");
    } else {
      return setCartState("CommonCart");
    }
  };

  useEffect(() => {
    getCartType();
  }, [selectClient, currentDate]);

  return (
    <InfoContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteProductUnit,
        removeProduct,
        selectClient,
        currentDate,
        setCurrentDate,
        isSpecialDate,
        cartState,
        totalProducts,
        deleteCart,
        login,
        isVip,
        getCartType,
        logout,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

InfoProvider.propTypes = {
  children: PropTypes.node,
};

export default InfoProvider;
