

import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../.env") });

import express from "express";
import { User } from "./entity/User";
// import bearerToken from "../src/moddleware.js"
let jwt = require('jsonwebtoken');
import { createConnection, getMongoManager, getMongoRepository } from "typeorm";
const app = express();

require("./middleware")(app);

createConnection({
  type: "mongodb",
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [User],
})
  .then(() => console.log("connected to DB"))
  .catch((err) => console.error(err));





app.post("/api/post", async (req, res) => {
  const data = req.body
  try{
      const user = new User() 
      user.description = data.description
      user.assignee = data.assignee
      user.due_date = data.due_date
      user.status = data.status
      
      await User.save(user)
  }catch(err){
      console.log(err);
  }
  
  });

app.get("/api/get",  async(req, res) => {
 try{
 
    const user = getMongoRepository(User);
    let member = await user.findOne({
        description : "Abhi",
      assignee : "Abhi",
      status : "asd",
      due_date: "20Sep"
    });
    return res.status(200).send(User)
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/update/:id", async (req, res) => {
  const id = req.params;
  const data = req.body;

  let ObjectFound = false ;
  for( let i = 0 ; i < User.length; i++){
    let element = User[i] ;
    if(element.id === id){
      element.data = data;
      ObjectFound = true ;
      break
    }
  }

})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server is unser port :", PORT));

