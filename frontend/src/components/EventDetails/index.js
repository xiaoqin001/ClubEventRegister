import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../../store/cart";
import './EventDetails.css';

function EventDetails () {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault;
        setErrors([]);
        return dispatch(AddToCart())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

}

export default EventDetails;
