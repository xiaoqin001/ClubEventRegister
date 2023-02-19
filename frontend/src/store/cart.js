import { csrfFetch } from "./csrf";

const ADD_TO_CART = 'cart/AddToCart';
const GET_CART = 'cart/GetCart';

export const AddToCart = (registeredevent) => {
    return {
        type: ADD_TO_CART,
        payload: registeredevent
    }
}
export const GetCart = () => {
    return {
        type: GET_CART,
    }
}

export const register = (params) => async dispatch => {
    console.log(params);
    const response = await csrfFetch('/api/register', {
        method: "POST",
        body: JSON.stringify({
            params
        }),
    });

    const data = await response.json();
    dispatch(AddToCart(data));
    return response;
}

export const getcart = (params) => async dispatch => {
    const response = await csrfFetch('/api/users/cart/'+params)
    const data = await response.json();
    dispatch(GetCart());
    return data;
}

export const clearcart = (cartid) => async dispatch => {
    const response = await csrfFetch('/api/users/cart/'+cartid, {
        method: 'DELETE',
    })
    const data = await response.json();
    dispatch(GetCart());
    return data;
}


const cartReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case ADD_TO_CART:
            newState = Object.assign({}, state);
            return newState;
        case GET_CART:
            newState = Object.assign({}, state);
            return newState;
        default:
            return state;
    }
}


export default cartReducer;
