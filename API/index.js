const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require('bcrypt');
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);

//5guvRtu3PS6X5VFL

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async(req, res) => {
  const { name, email, password } = req.body;


  try {
    const userDoc = await User.create({ 
        name,
         email, 
         password:bcrypt.hashSync(password,bcryptSalt),  
        });
        res.json(userDoc);
  }
  catch(e){
    res.status(422).json(e);

  }

 


  
});

app.listen(4000);
