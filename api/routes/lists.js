const router = require("express").Router();
const List = require("../models/List");
const { findByIdAndDelete } = require("../models/User");
const verify = require("../verifyToken")

//Create

router.post("/", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    if(req.user.isAdmin){ // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
        if(req.body.password){ // req.body 요청 본문에 password가 존재하는지 확인
            const newList = new List(req.body)
            try{
            const savedList = await newList.save();
            res.status(201).json(savedMovie);
        } catch(err){ 
            res.status(500).json(err)
        }
        }
        
    }else{
        res.status(403).json("you can update only your account")
    }
})


module.exports = router