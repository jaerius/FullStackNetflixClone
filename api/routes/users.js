const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//Update

router.put("/:id", async (req,res)=> {
    if(req.user.id == req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body})
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can update only your account")
    }
})

//Delete

//get

//get all

//get user stats