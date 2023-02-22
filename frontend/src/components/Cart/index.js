import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Avatar, List, Space, Button,Pagination  } from 'antd';
import * as cartActions from "../../store/cart";
import "./Cart.css"



function Cart () {
    const sessionCart = useSelector(state=>state.session.cart);
    console.log(sessionCart);
    const [errors, setErrors] = useState([]);
    const [datasource, setDatasource] = useState('')
    const dispatch = useDispatch();


    useEffect( () => {
        setErrors([]);
        dispatch(cartActions.getcart(sessionCart.id))
            .then(async (res) => {
                const data = await res;
                console.log(data.registered_event)
                setDatasource(data.registered_event);
                if (data && data.errors) setErrors(data.errors);
            })
    },[]);


    // console.log({data});
    const data  = Array.from(datasource);
    console.log(data)
    if (!data) return;
    const datalist = data.map((_, i)=>({
        title: data[i]['eventTitle'],
        // avatar: 'https://joeschmoe.io/api/v1/random',
        club: data[i]['clubName'],
        date: data[i]['date'],
        location: data[i]['location']
    })
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(cartActions.clearcart(sessionCart.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }



    return (
        <div class='cart'>
        <div className="cart_box">
          <h2>My Cart Events</h2>
          <div className="carts_list">
            {
              datalist.map((item,index)=>{
                return(
                  <a href='javaScript:;'>
                    <img
                      className="cartPhoto"
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                    <div className="content">
                        <p className="title">{item.title}</p>
                        <p className="pdescription">{item.description}</p>
                        <p>Club: {item.club}</p>
                        <p>location: {item.location}</p>
                        <p>Date: {item.date.slice(0,10)}</p>
                    </div>
                  </a>
                )
              })
            }
          </div>
          <dv className='clear'>
            <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>Clear My Events</Button>
          </dv>
          <div class='pro'>
            <Pagination defaultCurrent={1} total={datalist.length} />
          </div>
        </div>

{/*
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
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
              title={<a >{item.title}</a>}
              description={item.description}
            />
              <div>Club: {item.club}</div>
              <div>location: {item.location}</div>
              <div>Date: {item.date.slice(0,10)}</div>
          </List.Item>

        )}

      />
      <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>Clear My Events</Button>
       */}
      </div>

      );
}


export default Cart;
