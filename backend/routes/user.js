const express = require("express")
const User = require("../models/user")
const router = express.Router()
const jwt = require("jsonwebtoken")



router.post("/signup", function (req, res) {
    var user = new User({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password,role:"user" })
    User.findOne({ email: req.body.email }).then(function (found) {
        if (found) {
            res.status(400).send({message:"User already exists with this given email"})
        } else {
            user.save().then(function (user) {
                if (user) {
                    res.status(200).send(user)
                } else {
                    res.status(500).send({message:"Something went wrong while signup"})
                }
            })
        }
    })

})

router.post("/login", function (req, res) {
    User.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            if (user.password === req.body.password) {
                const token = jwt.sign({ id: user._id, email: user.email }, "testkey")
                res.send({ data: user, token: token })
            }
            else {
                res.send("email/password wrong")
            }
        } else {
            res.send("User not found")
        }
    })
})

router.get("/allusers", function (req, res) {
    User.find().then(function(users){
        if (users) {
            res.send(users)
        } else {
            res.status(500).send("Something went wrong while fetching users list")
        }
    })
})

router.get("/:username/balance", function (req, res) {
    User.findOne({email:req.params.username}).then(function(user){
        if (user) {
            res.send(user)
        } else {
            res.status(500).send("Something went wrong while fetching leave")
        }
    })
})

module.exports = router;