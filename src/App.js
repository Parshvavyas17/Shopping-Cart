import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector, useDispatch } from 'react-redux';
import Notification from "./components/Notification";
import { sendCartData, fetchData } from './store/cartAction';

let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    dispatch(fetchData());
  }, [ dispatch ]);
  useEffect(() => {
    if(isFirstRender) {
      isFirstRender = false;
      return;
    }
    if(cart.changed) {
      dispatch(sendCartData(cart));
    }
    // const sendRequest = async () => {
    //   dispatch(uiActions.showNotification({
    //     open: true,
    //     message: 'Sending Request',
    //     type: 'warning'
    //   }));
    //   const res = await fetch(`https://shopping-cart-redux-ab310-default-rtdb.firebaseio.com/cartItems.json`, {
    //     method: 'PUT',
    //     body: JSON.stringify(cart)
    //   });
    //   const data = await res.json();
    //   dispatch(uiActions.showNotification({
    //     open: true,
    //     message: 'Request Sent Successfully',
    //     type: 'success'
    //   }))
    // }
    // sendRequest().catch(err => {
    //   dispatch(uiActions.showNotification({
    //     open: true,
    //     message: 'Request Failed',
    //     type: 'error'
    //   }));
    // });
  }, [ cart, dispatch ]);
  console.log(notification);
  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message}></Notification>}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
