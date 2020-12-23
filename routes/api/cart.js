const express = require("express");
const Cart = require("../../models/Cart");
const router = express.Router();
const Cart = require('../../models/Cart');
const Item = require("../../models/Item");
const User = require("../../models/User");

router.get("/get/:user_id", (req, res) => {
    Cart.findOne({ user: req.params.user_id }).then(cart => {
        res.json(cart);
    })
})

router.post("/new/:user_id", (req, res) => {
    const newCart = new Cart({
        user: User.findById({ id: req.params.user_id }),
        items: []
    })
    newCart.save().then(cart => {
        return res.json(cart);
    });
})

router.patch("/add/:user_id", (req, res) => {
    Cart.findOne({ user: req.params.user_id }).then(cart => {
        let item = Item.findById({ id: req.body._id });
        cart.items.push(item);
        res.json(cart);
    })
})