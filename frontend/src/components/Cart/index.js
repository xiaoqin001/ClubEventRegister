import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import './Cart.css';

function Cart () {
    const sessionUser = useSelector(state => state.session.user);
    const sessionCart = useSelector(state => state.cart)

    if (!sessionUser) {
        return (
            <Redirect to='/login' />
        );
    }

    const cartEvents = Object.values(sessionCart)
    .map(item => {
      return {
        ...item,
        ...events[item.id]
      };
    });

    useEffect(()=>{
        aysnc
    }
    )


}
