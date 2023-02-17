import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import * as eventsAction from '../../store/events';
import {  Radio  } from 'antd';
import EventsList from '../EventsList'


function TypeNavigation() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const [datasource, setDatasource] = useState('')
    const [params, setParams] = useState({
        eventType:''
    })

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
        <>
            <Radio.Group defaultValue="All" buttonStyle="solid" onChange={e =>{handleClick(e)}}>
                <Radio.Button value="All">All</Radio.Button>
                <Radio.Button value="Academic">Academic</Radio.Button>
                <Radio.Button value="Recreation">Recreation</Radio.Button>
                <Radio.Button value="Sports">Sports</Radio.Button>
                <Radio.Button value="Others">Others</Radio.Button>
            </Radio.Group>

            <EventsList data={datasource} />

        </>
    );}



export default TypeNavigation;
