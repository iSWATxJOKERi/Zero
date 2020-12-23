const express = require("express");
const Cart = require("../../models/Cart");
const router = express.Router();
const Item = require("../../models/Item");
const User = require("../../models/User");

router.get("/get", (req, res) => {
    User.findOne({ id: req.params.id }).then(cu => {
        Cart.findOne({ user: cu._id }).then(cart => {
            return res.json(cart);
        })
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
    // debugger
    User.findOne({ id: req.params.id }).then(cu => {
        // console.log(cu);
        // debugger
        Cart.findOne({ user: cu._id }).then(cart => {
            // debugger
            if(cart) {
                cart.items.push(req.body);
                cart.save();
                // console.log(cart)
                return res.json(cart);
            }
        })
    })
})

router.patch("/remove", (req, res) => {
    // debugger
    User.findOne({ id: req.params.id }).then(cu => {
        // console.log(cu);
        // debugger
        Cart.findOne({ user: cu._id }).then(cart => {
            // debugger
            if(cart) {
                for(let i = 0; i < cart.items.length; i++) {
                    // console.log(req.body._id == cart.items[i])
                    if(cart.items[i] == req.body._id) {
                        cart.items = cart.items.slice(0, i).concat(cart.items.slice(i + 1));
                        cart.save();
                        return res.json(cart);
                    }
                }
                cart.save();
                // console.log(cart)
                return res.json(cart);
            }
        })
    })
})


module.exports = router;