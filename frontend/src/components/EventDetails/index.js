import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../../store/cart";
import { Redirect } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './EventDetails.css';
import * as eventsAction from "../../store/events";
import {  Descriptions, Image, Button  } from 'antd';


function EventDetails () {
    const dispatch = useDispatch();
    const params = useParams();
    const { eventId } = params;
    const [errors, setErrors] = useState([]);
    const [event, setEvent] = useState('')


    useEffect( () => {
        setErrors([]);
        dispatch(eventsAction.getdetails({eventId}))
            .then(async (res) => {
                const data = await res;
                await setEvent(data);
                console.log('here')
                console.log(event);
                if (data && data.errors) setErrors(data.errors);
            })
    }, [eventId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(register(params))
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
                width={1000}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            </Descriptions.Item>
        </Descriptions>


        <Descriptions title="Event Information">
            <Descriptions.Item label="Event Title">{event.events.eventTitle}</Descriptions.Item>
            <Descriptions.Item label="Club Name">{event.events.clubName}</Descriptions.Item>
            <Descriptions.Item label="Ticket Inventory">{event.events.ticketInventory}</Descriptions.Item>
            <Descriptions.Item label="Date">{event.events.date}</Descriptions.Item>
            <Descriptions.Item label="Location">{event.events.location}</Descriptions.Item>
            <Descriptions.Item label="Description">{event.events.description}</Descriptions.Item>
        </Descriptions>
        <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>Register</Button>

        </>
    )
}

export default EventDetails;
