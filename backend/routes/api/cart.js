const express = require('express');
const asyncHandler = require('express-async-handler');
const { Cart } = require('../../db/models');
const { RegisteredEvent } = require('../../db/models');

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const UserID = req.body.userid;
        const cart = await Cart.getCart(UserID);
        const registered_event = await RegisteredEvent.getRegisteredEvent(UserID);
        let newobject = {};
        newobject['cart'] = cart;
        newobject['registered_event'] = registered_event
        results = [];
        results.push(newobject);


        return res.json({
            data: results
         });
    })
);

router.post(
    '/',
    asyncHandler(async (req, res, next)  => {
        const UserID = req.body;
        const cart = await Cart.createCart(UserID);

        return res.json({ data: cart });
    })
)

// router.put();
// router.delete();

module.exports = router;
