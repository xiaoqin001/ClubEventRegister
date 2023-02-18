import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsList.css';
import {  Avatar, List, Space  } from 'antd';
const { createRoot } = 'ReactDOM';



function EventsList ({data}) {
    const [params, setParams] = useState({
        type:''
    })

    console.log({data});
    data = Array.from(data);
    if (!data) return;
    const datalist = data.map((_, i)=>({
        href: '/eventdetail/' + data[i]['id'],
        title: data[i]['eventTitle'],
        // avatar: 'https://joeschmoe.io/api/v1/random',
        club: data[i]['clubName'],
        date: data[i]['date'],
        description: data[i]['description'],
    })
    )




    return (
        <List
        itemLayout="vertical"
        size="large"
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: 3,
        // }}
        dataSource={datalist}
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
        renderItem={(item) => (
          <List.Item
            key={item.title}

            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
            //   avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
                <div>Club: {item.club}</div>
                <div>Date: {item.date.slice(0,10)}</div>
          </List.Item>
        )}
      />

      );
}


export default EventsList;
