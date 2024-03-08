const Post= require("../models/post");
const Like = require("../models/like");

exports.likePost=async(req,res)=>{
    try{
        const {post,user}=req.body;
        const like = new Like({
            post,user,
        });
        const savedLike= await like.save();
        const updatedPost= await Post.findByIdAndUpdate(post,
            {$push:{likes:savedLike._id},},{new:true}) .populate("likes").exec();
            res.json({
                post:updatedPost,
            });
    }
    catch(error){
      return res.status(400).json({
        error:"Error while liking post",
      })
    }    
}


exports.unlikePost=async(req,res)=>{
    try{
        const {post,like}=req.body; 
        const deleteLike = await Like.findOneAndDelete({post:post,_id:like});
        const updatedPost= await Post.findByIdAndDelete(post,
            {$pull:{likes:deleteLike._id}},{new:true});
            res.json({
                post:updatedPost,
            })
    }
    catch(error){
        return res.status(400).json({
            error:"Some Error occur while desliking",
        })
    }
}

exports.dummyLink=(req,res)=>{
    res.send("This is Your Dummy Page")
}