import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventList.css';

function EventsList () {
    const events = useSelector(state=>state.events)
}


export default EventsList;
