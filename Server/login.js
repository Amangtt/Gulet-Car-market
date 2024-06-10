const cors= require("cors")
const mysql=require("mysql")
const express=require("express")
const bodyparser=require("body-parser")
const bcrypt=require("bcrypt")
const { response } = require("express")
const sessions=require("express-session")
const cookieparser=require("cookie-parser")

const app=express()
const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'aman123708',
    database: 'cars'

});
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true,
}))
app.use(sessions({
    key:"userid",
    secret:"amangt",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60*60*24,
    }
}))
app.use(cookieparser())
app.use(bodyparser.urlencoded({extended:true})) 
//signup

app.post('/sign_in', (req,res)=>{
    const email=req.body.email
    const username=req.body.username 
    const password=req.body.password 
    const firstname=req.body.firstname 
    const lastname=req.body.lastname 
    const contact=req.body.contact


    const sqlInsert="INSERT INTO user(email,username,password,first_name,last_name,contact)VALUES(?,?,?,?,?,?)"
    db.query(sqlInsert,[email,username,password,firstname,lastname,contact],(err,result)=>{
        if(err){console.log(err)}
        console.log(result);
    });
});   



//login
app.post('/login',(req,res)=>{
    const usernamelog=req.body.usernamelog
    const passwordlog=req.body.passwordlog
   
    
    db.query(
        "SELECT USERNAME,PASSWORD FROM user WHERE USERNAME=? ;",
        usernamelog,(err,result,)=>{
        if(err)
        {res.send({err:err})}
        
      if(result.length > 0)
      { req.session.user=result
                  res.send(req.session.user) 
                  console.log(req.session.user) 
      }
      else{ res.send({message:"user not found"})}    
    
    })
})
app.get('/login',(req,res)=>{
 if(req.session.user){
     res.send({loggedin:true, user:req.session.user})
     
 }
 else{
     res.send({loggedin:false,message:"not loged in"})
 }
})
app.listen(4001,(err)=>{
    if(err){console.log("err at listening")}
   console.log("connected")
});