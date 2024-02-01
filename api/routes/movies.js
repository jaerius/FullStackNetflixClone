const router = require("express").Router();
const Movie = require("../models/Movie");
const { findByIdAndDelete } = require("../models/User");
const verify = require("../verifyToken")

//Create

router.post("/", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    if(req.user.isAdmin){ // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
        if(req.body.password){ // req.body 요청 본문에 password가 존재하는지 확인
            const newMovie = new Movie(req.body)
            try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch(err){
            res.status(500).json(err)
        }
        }
        
    }else{
        res.status(403).json("you can update only your account")
    }
})

//update

router.put("/find/:id", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    if(req.user.isAdmin){ // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
        
        try{
            const updatedMovie = await newMovie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true} );
            res.status(200).json(updatedMovie); //무언가를 더하면 201, 아니면 200
        } catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can update only your account")
    }
})

//Delete

router.delete("/:id", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    if(req.user.isAdmin){ // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
        
        try{
            await findByIdAndDelete(req.params.id)
            res.status(200).json("the movie has been deleted"); //무언가를 더하면 201, 아니면 200
        } catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can update only your account")
    }
})

//get
router.get("/random", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    
    const type = req.query.type;
    let movie;
    
    try{
            if(type==="series"){
                movie = await Movie.aggregate([
                    { $match: {isSeries: true}},
                    {$sample: {size:1}},
                ])
            } else{
                movie = await Movie.aggregate([
                    { $match: {isSeries: false}},
                    {$sample: {size:1}},
                ])
            }
            res.status(200).json()
        } catch(err){
            res.status(500).json(err)
        }
    
})

//getAll

router.get("/", verify, async (req,res)=> { //verify는 미들웨어 함수로 요청 처리 하기전에 확인
    if(req.user.isAdmin){ // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
        
        try{
            const movies = await Movie.find()
            res.status(200).json(movies.reverse()); //무언가를 더하면 201, 아니면 200
        } catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can update only your account")
    }
})
module.exports = router