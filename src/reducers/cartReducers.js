const cartReducer = (cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...cart];
      const { product, quantity } = action.payload;

      const productIndex = updatedCart.findIndex(
        (x) => x.product._id === product._id
      );

      if (productIndex !== -1) {
        updatedCart[productIndex].quantity += quantity;
      } else {
        updatedCart.push({ product, quantity });
      }

      return updatedCart;

    case "GET_CART":
      return action.payload.products;
    case "REVERT_CART":
      return action.payload.cart;
    case "REMOVE_FROM_CART":
      const oldCart = [...cart];
      const newCart = oldCart.filter(
        (item) => item.product._id !== action.payload.id
      );
      return newCart;
  }
};

export default cartReducer;
