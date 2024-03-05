const express=require("express");
const fs = require("fs");
const mongoose=require("mongoose");
const users=require("./MOCK_DATA.json");
const app=express();
const PORT=8000;

//Connectiong mongoose
mongoose.connect('mongodb://127.0.0.1:27017/AmanData')
.then(()=>console.log("Database connected"))
.catch((err)=>console.log("Some Error occured",err));


//defining Schema
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
});


//creating model
const user = mongoose.model('user',userSchema);


app.use(express.urlencoded({extended:false}));



app.get('/users', async(req, res) => {
    const allDbUsers= await user.find({});
    const html = `<ul>${allDbUsers.map(user => `<li>${user.firstName}---${user.email}</li>`).join('')}</ul>`;
    return res.send(html);
});

app.get('/api/users',async(req,res)=>{
    const allDbUsers=await user.find({});
     res.setHeader("X-MyName","Aman Singh");
    return res.json(allDbUsers)
})


app.route('/api/users/:id')
.get(async(req,res)=>{
    const User= await user.findById(req.params.id);
    if(!User) return res.status(404).json({error:"User Not Found"})
    return res.json(User);
})
.patch(async(req,res)=>{
    await user.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
    return res.json({status:"Success"});
})
.delete(async(req,res)=>{
    await user.findByIdAndDelete(req.params.id)
    return res.json({status:"success"});
});

app.post("/api/users",async(req,res)=>{
    const body= req.body;
    if(!body || !body.firstName || !body.email){
        return res.status(400).json({msg: "Fill necessay fields..."});
    }
    const result=await user.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.jobTitle,
    })
    return res.status(201).json({msg:"Success"});
});

app.listen(PORT,()=> console.log(`Server started at Port ${PORT}`))