import { csrfFetch } from "./csrf";

const ADD_TO_CART = 'cart/AddToCart';
export const AddToCart = (registeredevent) => {
    return {
        type: ADD_TO_CART,
        payload: registeredevent
    }
}

export const register = (params) => async dispatch => {
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


const cartReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case ADD_TO_CART:
            newState = Object.assign({}, state);
            newState.eventsincart[action.payload.registeredevent.id] = action.payload.registeredevent;
            return newState;
        default:
            return state;
    }
}


export default cartReducer;
