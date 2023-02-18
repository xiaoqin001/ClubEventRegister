import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './EventDetails.css';
import * as eventsAction from "../../store/events";
import * as cartActions from "../../store/cart";
import {  Descriptions, Image, Button, InputNumber, Form  } from 'antd';


function EventDetails () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const sessionCart = useSelector(state=>state.session.cart);
    const params = useParams();
    const history = useHistory();
    const { eventId } = params;
    const [errors, setErrors] = useState([]);
    const [event, setEvent] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [tickets, setTickets] = useState(1000)
    const [sessionInfo, setSessionInfo] = useState({
        user: sessionUser.id,
        cart: sessionCart.id,
        event: parseInt(eventId),
        amount: 1
    });


    useEffect( () => {
        setErrors([]);
        dispatch(eventsAction.getdetails({eventId}))
            .then(async (res) => {
                const data = await res;
                setEvent(data);
                setTickets(data.events.ticketInventory)
                setIsLoaded(true);
                if (data && data.errors) setErrors(data.errors);
            })
    },[tickets]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log(sessionInfo);
        dispatch(cartActions.register({sessionInfo}))
            .then(async (res) => {
                const data = await res;
                if (data) setTickets(data.id);
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
            <Descriptions.Item label="Date">{event.events.date.slice(0,10)}</Descriptions.Item>
            <Descriptions.Item label="Location">{event.events.location}</Descriptions.Item>
            <Descriptions.Item label="Description">{event.events.description}</Descriptions.Item>
        </Descriptions>
        )}
        {isLoaded && (
            <Form>
                <Form.Item label="Register number" rules={[{required: true},]}>
                    <InputNumber min={1} max={event.events.ticketInventory} onChange={value => {sessionInfo.amount = value}} />
                </Form.Item>
            </Form>
        )}
        <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>Register</Button>

        </>

    )
}

export default EventDetails;
