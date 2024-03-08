const express= require("express");
const router= express.Router();

const {dummyLink,likePost,unlikePost}= require("../controllers/like");
const {createComment}=require("../controllers/comment");
const {createPost,getAllPosts} = require("../controllers/post");


router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment)
router.post("/post/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("likes/unlike",unlikePost);

module.exports=router;