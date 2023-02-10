const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/Event');
const { Register } = require('../../db/Register');
const { RegisteredEvent } = require('../../db/RegisteredEvent');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const register = await Register.registerEvent(req.params);
        const params = req.params;
        params['registerID'] = register.id
        const registeredEvent = await RegisteredEvent.register(params);
        return res.json({registeredEvent});
    })
)


module.exports = router;
