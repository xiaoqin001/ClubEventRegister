
const ADD_TO_CART = 'cart/AddToCart';
export const AddToCart = (params) => {
    return {
        type: ADD_TO_CART,
        payload: params
    }
}

export const cartReducer = (state={}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            newState = Object.assign({}, state);
            newState[params.id] = params;
            return newState;
        default:
            return state;
    }
}
