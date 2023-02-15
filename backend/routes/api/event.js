const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/models');

const router = express.Router();

router.get(
    '/',
    asyncHandler (async (req, res, next) => {
        const events = await Event.getEvent(req.params.Type);
        return res.json({ data: events });

    })
);

router.post(
    '/',
    asyncHandler (async (req, res, next) => {
        const events  = await Event.addEvent(req.params);
        return res.json({ data: events});
    })
);

// router.update();
// router.delete();




module.exports = router;
