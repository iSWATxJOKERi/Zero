const express = require("express");
const Item = require("../../models/Item");
const router = express.Router();
const validateItem = require('../../validation/items');

router.get("/all", (req, res) => {
    Item.find().then(items => {
        res.json(items)
    }).catch(() => res.status(404).json({ noitemsfound: 'No items found' }));
});

router.post("/new", (req, res) => {
    const { errors, isValid } = validateItem(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price
    })
    newItem.save().then(item => {
        return res.json(item);
    });
})

module.exports = router;