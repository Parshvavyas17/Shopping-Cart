import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cart.totalQuantity);
  const showCart = () => {
    dispatch(cartActions.setShowCart());
  }
  return (
    <div className="cartIcon">
      <h3 onClick={showCart}>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;
