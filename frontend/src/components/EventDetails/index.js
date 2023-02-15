import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../../store/cart";
import { Redirect } from "react-router-dom";
import './EventDetails.css';
import * as sessionActions from "../../store/session";

function EventDetails () {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state=>state.session.user);
    const sessionCart = useSelector(state=>state.session.cart);
    const [params, setParams] = useState({
        userID: sessionUser.userID,
        cartID: sessionUser.cartID
    });




    const handleSubmit = (e) => {
        e.preventDefault;
        if (!sessionUser) {
            return (
                <Redirect to='/login' />
            );
        }
        setErrors([]);
        return dispatch(register(params))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

}

export default EventDetails;
