import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsList.css';
import {  Avatar, List, Space,Pagination  } from 'antd';
const { createRoot } = 'ReactDOM';



function EventsList ({data}) {
    const [params, setParams] = useState({
        type:''
    })

    data = Array.from(data);
    if (!data) return;
    const datalist = data.map((_, i)=>({
        href: '/eventdetail/' + data[i]['id'],
        title: data[i]['eventTitle'],
        // avatar: 'https://joeschmoe.io/api/v1/random',
        club: data[i]['clubName'],
        date: data[i]['date'],
        description: data[i]['description'],
        location: data[i]['location']
    })
    )




    return (
      <>
      <div className="EventListBox">
        {
          datalist.map((item,index)=>{
            return(
              // <a href='javascript:;'>
              <a href={item.href}>
                <p className="item_img">
                  <img
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
                </p>
                <p className="item_title">
                  {item.title}
                </p>
                <p className="item_description">
                  {item.description}
                </p>
                <p className="t">Club: {item.club}</p>
                <p className="t">Location: {item.location}</p>
                <p className="t">Date: {item.date.slice(0,10)}</p>
              </a>
            )
          })
        }
      </div>
      <div class='pro'>
      <Pagination defaultCurrent={1} total={10} />
      </div>
        {/* <List
        itemLayout="vertical"s
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
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
                <div>Location: {item.location}</div>
                <div>Date: {item.date.slice(0,10)}</div>
          </List.Item>
        )}
      /> */}
      </>
      );
}


export default EventsList;
