import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './EventDetails.css';
import * as eventsAction from "../../store/events";
import * as cartActions from "../../store/cart";
import {  Descriptions, Image, Button  } from 'antd';


function EventDetails () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const sessionCart = useSelector(state=>state.session.cart);
    const params = useParams();
    const { eventId } = params;
    const [errors, setErrors] = useState([]);
    const [event, setEvent] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [sessionInfo, setSessionInfo] = useState({
        user: sessionUser,
        cart: sessionCart,
        event: eventId,
    });


    useEffect( () => {
        setErrors([]);
        dispatch(eventsAction.getdetails({eventId}))
            .then(async (res) => {
                const data = await res;
                setEvent(data);
                setIsLoaded(true);
                if (data && data.errors) setErrors(data.errors);
            })
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(cartActions.register({sessionInfo}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (

        <>

        <Descriptions>

            <Descriptions.Item>
            <Image
                width={800}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            </Descriptions.Item>
        </Descriptions>

        {isLoaded && (
        <Descriptions title="Event Information">
            <Descriptions.Item label="Event Title">{event.events.eventTitle}</Descriptions.Item>
            <Descriptions.Item label="Club Name">{event.events.clubName}</Descriptions.Item>
            <Descriptions.Item label="Ticket Inventory">{event.events.ticketInventory}</Descriptions.Item>
            <Descriptions.Item label="Date">{event.events.date}</Descriptions.Item>
            <Descriptions.Item label="Location">{event.events.location}</Descriptions.Item>
            <Descriptions.Item label="Description">{event.events.description}</Descriptions.Item>
        </Descriptions>
        )}
        <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>Register</Button>

        </>

    )
}

export default EventDetails;
