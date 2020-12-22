const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');

router.get("/test", (req, res) => res.json({ msg: "This is a users route" }));
router.post("/register", (req, res) => {
    User.findOne({ handle: req.body.handle }).then(user => {
        if(user) {
            return res.status(400).json({ handle: "A user already has this name."})
        } else {
            const newUser = new User({
                handle: req.body.handle,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                })
            })
        }
    })
});
router.post("/login", (req, res) => {
    const handle = req.body.handle;
    const password = req.body.password;

    User.findOne({ handle }).then(user => {
        if(!user) {
            return res.status(404).json({ handle: "This user does not exist"});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                res.json({ msg: 'Success'});
            } else {
                return res.status(400).json({ credentials: 'Incorrect Password or Handle'});
            }
        })
    })
})

module.exports = router;