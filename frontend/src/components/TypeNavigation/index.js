import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventsAction from '../../store/events';
import {  Radio  } from 'antd';
import EventsList from '../EventsList'
import './TypeNavigation.css'


function TypeNavigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [errors, setErrors] = useState([]);
    const [datasource, setDatasource] = useState('');
    const [params, setParams] = useState({
        eventType:'All'
    });

    useEffect( () => {
        setErrors([]);
        dispatch(eventsAction.getevent({params}))
            .then(async (res) => {
                const data = await res;
                setDatasource(data.events);
                if (data && data.errors) setErrors(data.errors);
            })
    }, [sessionUser.id]);



    const handleClick = (e) => {
        e.preventDefault();
        setErrors([]);
        params.eventType = e.target.value;
        return dispatch(eventsAction.getevent({params}))
            .then(async (res) => {
                const data = await res;
                setDatasource(data.events);
                if (data && data.errors) setErrors(data.errors);
            })
    }


    return(
        <div >
            <div class='eventType'>
            <Radio.Group defaultValue="All" buttonStyle="solid" onChange={e =>{handleClick(e)}}>
                <Radio.Button value="All">All</Radio.Button>
                <Radio.Button value="Academic">Academic</Radio.Button>
                <Radio.Button value="Recreation">Recreation</Radio.Button>
                <Radio.Button value="Sports">Sports</Radio.Button>
                <Radio.Button value="Others">Others</Radio.Button>
            </Radio.Group>
            </div>
            <div class='eventList'>
            <EventsList data={datasource} />
            </div>
        </div>
    );}



export default TypeNavigation;
