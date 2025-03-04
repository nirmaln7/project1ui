import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getUser, getJwt } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  decreaseProductAPI,
  increaseProductAPI
} from "./services/cartServices";
import UserContext from "./context/UserContext";
import CartContext from "./context/CartContext";
import cartReducer from "./reducers/cartReducers";
import { object } from "zod";
import useData from "./hooks/useData";
import useAddToCart from "./hooks/cart/useAddToCart";
import useRemoveFromCart from "./hooks/cart/removeFromCart";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  useEffect(() => {
    if (cartData) {
      dispatchCart({ type: "GET_CART", payload: { products: cartData } });
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

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
    dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });
    addToCartMutation.mutate(
      { id: product._id, quantity: quantity },
      {
        onError: (error) => {
          toast.error("Something went bad");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        },
      }
    );
    // dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });
    // addToCartAPI(product._id, quantity)
    //   .then((res) => {
    //     toast.success("Product added");
    //   })
    //   .catch((err) => {
    //     toast.error("Failed");
    //     dispatchCart({ type: "REVERT_CART", payload: { cart } });
    //   });
    //setCart([...cart, { product: product, quantity: quantity }]);
  };
  const deleteCart = () => {
    dispatchCart({ type: "DELETE_CART" });

  };
  const removeFromCart = (id) => {
    dispatchCart({ type: "REMOVE_FROM_CART", payload: { id } });
    removeFromCartMutation.mutate(
      { id },
      {
        onError: () => {
          toast.error("Something went bad");
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        },
      }
    );
    // removeFromCartAPI(id).catch((err) => {});
  };

  const updateCart = (type, id) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      dispatchCart({ type: "GET_CART", payload: { products: updatedCart } });

      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went bad");
        dispatchCart({ type: "REVERT_CART", payload: { cart } });
      });
    }
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      dispatchCart({ type: "GET_CART", payload: { products: updatedCart } });

      increaseProductAPI(id).catch((err) => {
        toast.error("Something went bad");
        dispatchCart({ type: "REVERT_CART", payload: { cart } });
      });
    }
  };

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, deleteCart }}
      >
         <div className="app">
          <Navbar />
          <ToastContainer />
          <main>
            <Routing />
          </main>
        </div> 
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
