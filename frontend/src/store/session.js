import { csrfFetch } from "./csrf";


const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await response.json();
    console.log(data.data[0])
    dispatch(setUser(data.data[0]));
    return response;
};

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();

    dispatch(setUser(data.data[0]));
    // dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async dispatch => {
    const { username, email, password } = user;
    console.log(user)
    const response = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.data[0]));
    return response;
};





const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload.user;
            newState.cart = action.payload.cart;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            newState.cart = null;
            return newState;
        default:
            return state;
    }
};


export default sessionReducer;
