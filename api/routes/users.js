const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken")

//Update

router.put("/:id", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    if(req.user.id == req.params.id || req.user.isAdmin){ // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
        if(req.body.password){ // req.body 요청 본문에 password가 존재하는지 확인
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new : true}) // req.params.id는 업데이트 할 문서의 번호, $set:req.body는 바꿀 것, new:true는 바꾼 것을 리턴
            res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can update only your account")
    }
})

//Delete

router.delete("/:id", verify, async (req,res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User ahs been deleted...");
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can delete only you account!")
    }
})

//get

router.get("/find/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc
        res.status(200).json(info);
    } catch(err) {
        res.status(500).json(err);
    }
})

//get all

router.get("/", verify, async (req,res) => {
    const query = req.query.new; //URL 쿼리 스트링에서 new 키의 값을 query 변수에 저장합니다. 예를 들어, /new?true 요청에서 query는 true가 됩니다.
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().limit(10) : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can delete only you account!")
    }
})

//get user stats

router.get("/stats", async (req,res)=> {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        "January",
        "December"
    ]

    try{
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month: "$createdAt"}
                }
            }, {
                $group: {
                    _id: "$month",
                    total: {$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = router