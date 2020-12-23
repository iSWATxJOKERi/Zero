import * as CartApiUtil from '../util/cart_api_util';

export const RECEIVE_CART = "RECEIVE_CART";

const receiveCart = cart => {
    return {
        type: RECEIVE_CART,
        cart
    }
}

export const fetchCart = user_id => dispatch => {
    return CartApiUtil.fetchCart(user_id).then(cart => {
        dispatch(receiveCart(cart.data))
    })
}

export const addItem = (item, user_id) => dispatch => {
    return CartApiUtil.addItem(item, user_id).then(cart => {
        dispatch(receiveCart(cart.data))
    })
}

export const removeItem = (item, user_id) => dispatch => {
    return CartApiUtil.removeItem(item, user_id).then(cart => {
        dispatch(receiveCart(cart.data))
    })
}

export const createCart = user_id => dispatch => {
    return CartApiUtil.createCart(user_id).then(cart => {
        dispatch(receiveCart(cart.data))
    })
}