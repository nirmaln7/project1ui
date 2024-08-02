import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getUser, getJwt } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import UserContext from "./context/UserContext";
import CartContext from "./context/CartContext";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (x) => x.product._id === product._id
    );
    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity });
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product added");
      })
      .catch((err) => {
        toast.error("Failed");
        setCart(cart);
      });
    //setCart([...cart, { product: product, quantity: quantity }]);
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went bad");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went bad");
        setCart(oldCart);
      });
    }
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      increaseProductAPI(id).catch((err) => {
        toast.error("Something went bad");
        setCart(oldCart);
      });
    }
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        {/* <div className="app">
          <Navbar />
          <ToastContainer />
          <main>
            <Routing />
          </main>
        </div> */}
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
