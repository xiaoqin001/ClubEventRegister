import { csrfFetch } from "./csrf";

const ADD_EVENT = 'events/AddEvent';
export const AddEvent = (events) => {
    return {
        type: ADD_EVENT,
    }
}

export const addevent = (params) => async dispatch => {
    console.log(params);
    const response = await csrfFetch('api/event', {
        method: "POST",
        body: JSON.stringify({
            params
        }),
    });
    const data = await response.json();
    console.log(data)
    dispatch(AddEvent(data.data.events));
    return response;
}


const eventsReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case ADD_EVENT:
            newState = Object.assign({}, state);
            return newState;
        default:
            return state;
    }
}

export default eventsReducer;
