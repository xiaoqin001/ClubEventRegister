import { csrfFetch } from "./csrf";

const ADD_EVENT = 'events/AddEvent';
const GET_EVENT = 'events/AddEvent';

export const AddEvent = (events) => {
    return {
        type: ADD_EVENT,
    }
}
export const GetEvent = (events) => {
    return {
        type: GET_EVENT,
    }
}

export const addevent = (params) => async dispatch => {
    const response = await csrfFetch('api/event', {
        method: "POST",
        body: JSON.stringify({
            params
        }),
    });
    const data = await response.json();
    dispatch(AddEvent(data.data.events));
    return response;
}

export const getevent = (params) => async dispatch => {
    const response = await csrfFetch('api/event'+'/'+params.params.eventType)
    const data = await response.json();
    dispatch(GetEvent(data.events));
    return data;
}


const eventsReducer = (state={}, action) => {
    let newState;
    switch (action.type) {
        case ADD_EVENT:
            newState = Object.assign({}, state);
            return newState;
        case GET_EVENT:
            newState = Object.assign({}, state);
            return newState;
        default:
            return state;
    }
}

export default eventsReducer;
