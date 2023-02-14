import { csrfFetch } from "./csrf";

const ADD_EVENT = 'events/AddEvent';
export const AddEvent = (events) => {
    return {
        type: ADD_EVENT,
        payload: events
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


export default eventsProducer = (state={}, action) => {
    switch (action.type) {
        case ADD_EVENT:
            newState = Object.assign({}, state);
            // newState.events.forEach(events=>{
            //     newState[events.id] = events;
            // });
            newState[events.id] = events;
            return newState;
        default:
            return state;
    }
}
