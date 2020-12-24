const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle
    });
})
router.get("/test", (req, res) => res.json({ msg: "This is a users route" }));
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
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
                    newUser.save().then(user => {
                        const payload = { id: user.id, handle: user.handle };
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: '365d' }, (err, token) => { res.json({ success: true, token: 'Bearer ' + token })});
                    }).catch(err => console.log(err));
                })
            })
        }
    })
});
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const handle = req.body.handle;
    const password = req.body.password;

    User.findOne({ handle }).then(user => {
        if(!user) {
            errors.handle = 'User not found';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = { id: user.id, handle: user.handle };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: '365d' }, (err, token) => { res.json({ success: true, token: 'Bearer ' + token })})
            } else {
                errors.password = 'Incorrect password';
                return res.status(400).json(errors);
            }
        })
    })
})

module.exports = router;