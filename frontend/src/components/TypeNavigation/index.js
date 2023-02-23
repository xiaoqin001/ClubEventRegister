import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventsAction from '../../store/events';
import {  Radio, Menu  } from 'antd';
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
    }, [sessionUser]);



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
        <div className='eventBox'>
            <img src={require('../../assets/images/arena.jpeg')} className='banner'/>
            <div class='eventType'>
                {/* <div className='tab_tap'>
                    <a href='javaScript:;' className='active'>ALL</a>
                    <a href='javaScript:;' className=''>Academic</a>
                    <a href='javaScript:;' className=''>Recreation</a>
                    <a href='javaScript:;' className=''>Sports</a>
                    <a href='javaScript:;' className=''>Others</a>
                </div> */}
                {/* <Radio.Group style={{display:'none'}} defaultValue="All" buttonStyle="solid" onChange={e =>{handleClick(e)}}> */}
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
    // const onClick = (e) => {
    //     console.log('click ', e);
    //     setCurrent(e.key);
    //   };
    // return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;}


export default TypeNavigation;
