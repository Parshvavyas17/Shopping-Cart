import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch(`https://shopping-cart-redux-ab310-default-rtdb.firebaseio.com/cartItems.json`)
            const data = await res.json();
            return data;
        }
        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));
        } catch(err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Fetch Data Request Failed',
                type: 'error'
            }));
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: 'Sending Request',
            type: 'warning'
        }));
        const sendRequest = async () => {
            // dispatch(uiActions.showNotification({
            //   open: true,
            //   message: 'Sending Request',
            //   type: 'warning'
            // }));
            const res = await fetch(`https://shopping-cart-redux-ab310-default-rtdb.firebaseio.com/cartItems.json`, {
              method: 'PUT',
              body: JSON.stringify(cart)
            });
            await res.json();
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Request Sent Successfully',
              type: 'success'
            }))
        }
        try {
            await sendRequest();
        } catch(e) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Request Failed',
                type: 'error'
            }));
        }
    }
}