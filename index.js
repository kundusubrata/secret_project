//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// const correctPassword = "ILoveProgramming";
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended:true}));

function passwordCheck(req,res,next){
    const password = req.body["password"];
    if(password==="ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

//   app.post("/check", (req, res)=>{
//     const submittedPassword = req.body.password;
//     if(correctPassword === submittedPassword){
//         res.sendFile(__dirname + "/public/secret.html");
//     }
//     else{
//         // res.status(403).send("Access Denied: Incorrect Password");
//         res.sendFile(__dirname + "/public/index.html");
//     }
//   })
  app.post("/check", (req, res)=>{

    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        // res.status(403).send("Access Denied: Incorrect Password");
        // res.sendFile(__dirname + "/public/index.html");
        res.redirect("/")
    }
  })
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  