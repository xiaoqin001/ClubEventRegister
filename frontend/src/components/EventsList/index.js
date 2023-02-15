import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventList.css';
const {  Card, Col, Row  } = antd


function EventsList () {
    const allEvents = useSelector(state=>state.events);

    return (
        <>
        {allEvents.map(({event}, i) => {
            return  (<Col span={8}>
                         <Card title={event.title} bordered={false}>
                            <p>{event.location}</p>
                            <p>{event.date}</p>
                        </Card>
                     </Col>
                    )
        })}
        </>

      );
}


export default EventsList;
