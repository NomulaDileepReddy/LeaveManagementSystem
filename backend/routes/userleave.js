const express = require("express")
const UserLeave = require("../models/userleave")
const User = require("../models/user")
const router = express.Router()




router.post("/apply", function (req, res) {
    var userLeave = new UserLeave({
        reason: req.body.reason,
        status: "pending",
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        username: req.body.username,
        leaveType: req.body.leaveType
    })
    userLeave.save().then(function(user){
        if (user) {
            res.send(user)
        } else {
            res.status(500).send("Something went wrong while appling leave")
        }
    })
})

router.get("/:username/myleave", function (req, res) {
    UserLeave.find({username:req.params.username}).then(function(leaves){
        if (leaves) {
            res.send(leaves)
        } else {
            res.status(500).send("Something went wrong while fetching leave")
        }
    })
})


router.get("/allleave", function (req, res) {
    UserLeave.find().then(function(leaves){
        if (leaves) {
            res.send(leaves)
        } else {
            res.status(500).send("Something went wrong while fetching leave")
        }
    })
})

router.put("/:leaveId/approvereject", function (req, res) {
    UserLeave.findByIdAndUpdate(req.params.leaveId,{status:req.body.status}).then(function(leave){
        console.log("Leave : ",leave)
        if (leave) {

            const difference = new Date(leave.endDate) - new Date(leave.startDate)

            const days = difference/(1000*60*60*24)

            User.findOneAndUpdate({email:leave.username},{approvedLeaveCount:Number(days)}).then(function(result){
                if(result){
                    res.send(result)
                }else{
                    return res.send("Error")
                }
            }) 
        } else {
            res.status(500).send("Something went wrong while approving leave")
        }
    })
})

module.exports = router;