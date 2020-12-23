const express = require("express");
const Cart = require("../../models/Cart");
const router = express.Router();
const Item = require("../../models/Item");
const User = require("../../models/User");

router.get("/get", (req, res) => {
    Cart.findOne({ user: req.params.id }).then(cart => {
        return res.json(cart);
    })
})

router.post("/create", (req, res) => {
    User.findOne({ id: req.params.id }).then(cu => {
        const newCart = new Cart({
            user: cu._id,
            items: []
        })
        newCart.save().then(cart => {
            cu.cart = cart._id;
            return res.json(cart);
        });
    })
})

router.patch("/add", (req, res) => {
    console.log("in")
    Cart.findOne({ user: req.params.id }).then(cart => {
        if(cart) {
            let item = Item.findById({ id: req.body._id });
            console.log(item);
            cart.items.push(item._id);
            return res.json(cart);
        }
    })
})

module.exports = router;