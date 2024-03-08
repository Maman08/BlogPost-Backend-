const express=require("express");
const app=express();
const mongoose = require("mongoose");

require("dotenv").config();

// Load environment variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully"))
.catch(error => {
    console.log("Error connecting to database:", error);
    process.exit(1);
});

const blog=require("./routes/blog");
app.use("/api/v1",blog);

const handleDBConnect=require("./connection/index");
handleDBConnect();

app.listen(PORT,()=>{
    console.log("Server is runnig successfully");
})

app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to Home Page </h1>`)
})