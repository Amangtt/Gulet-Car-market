const express= require("express")
const app= express()
const cors= require("cors")
const mysql= require("mysql")
const bodyparser = require("body-parser");
const multer = require("multer")
const path = require("path")
const sessions=require("express-session")
const cookieparser=require("cookie-parser")
//////////////////////////////////////////////
var db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aman123708',
    database: 'cars'
});
db.connect();
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
app.use(express.json())

/////////////////////////////////////////////////

//////////////////////////////////////search
app.get("/search",(req,res) => {
    const make= req.body.search
    const price =req.body.price
    const color= req.body.color
    const fuel_type= req.body.fuel_type
    const year= req.body.year
    const style_type= req.body.style_type
    //console.log(price,color,fuel_type,year,make,style_type)    
    const sqlsearch= "SELECT * FROM car WHERE price=? && color=? && fuel_type=? && year=? && make=? && style_type=? "
    db.query(sqlsearch,[price,color,fuel_type,year,make,style_type], (err,result)=>{
        if(err) throw(err)
        console.log(result)
    })
})
app.post("/search", (req,res) => {
    const price =req.body.price
    const color= req.body.color
    const fuel_type= req.body.fuel_type
    const year= req.body.year
    const make= req.body.search
    const style_type= req.body.style_type
    console.log(price,color,fuel_type,year,make,style_type)
    const sqlsearch= "SELECT * FROM car WHERE price=? && color=? && fuel_type=? && year=? && make=? && style_type=? "
    db.query(sqlsearch,[price,color,fuel_type,year,make,style_type], (err,result)=>{
        if(err) throw(err)
        console.log(result)
        res.send(result)
    })
})
///////////////////////////////////////////////

///////////////////////////////////////////
app.post("/find/:search",(req,res) => {
    const make= req.params.search
    const sqlsearch= "SELECT * FROM car WHERE make=?"
    db.query(sqlsearch,make, (err,result)=>{
        if(err) throw(err)
        console.log(result)
    })
})
app.get("/finds/:search",(req,res) => {
    const make= req.params.search
    const sqlsearch= "SELECT * FROM car WHERE make=?"
    db.query(sqlsearch,make, (err,result)=>{
        if(err) throw(err)
        res.send(result)
        console.log(result)
    })
})
///////////////////////////////////////////////

///////////////////////////////////////////////////
app.post("/All_vehicles/:car_type",(req,res) => {
    const car_type= req.params.car_type
    const sql_car_type= "SELECT * FROM car WHERE style_type=?"
    db.query(sql_car_type,car_type, (err,result)=>{
        if(err) throw(err)
        console.log(result)
    })
})
app.get("/All_vehicles/:car_type",(req,res) => {
    const car_type= req.params.car_type
    const sql_car_type= "SELECT * FROM car WHERE style_type=?"
    db.query(sql_car_type,car_type, (err,result)=>{
        if(err) throw(err)
        res.send(result)
    })
})
////////////////////////////////////////////////////

/////////////////////////////////////////////////////
app.post("/Loan/:stock",(req,res) => {
    const stock_no1= req.params.stock
    const sql_car_type= "SELECT * FROM car WHERE stock_no=?"
    db.query(sql_car_type,stock_no1, (err,result)=>{
        if(err) throw(err)
        console.log(result)
    })
})
app.get("/Loan/:stock",(req,res) => {
    const stock_no2= req.params.stock
    const sql_car_type= "SELECT * FROM car WHERE stock_no=?"
    db.query(sql_car_type,stock_no2, (err,result)=>{
        if(err) throw(err)
        res.send(result)
    })
})
////////////////////////////////////////////////////

///////////////////////////////////////image upload
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer ({
    storage: storage,
    
})
app.use('/profile', express.static('upload/images'))

app.post("/upload", upload.single('profile'),(req,res)=>{
    const image_name= `http://localhost:8080/profile/${req.file.filename}`
    const sql_image= "INSERT INTO car_image(image_name) values (?)"
    db.query(sql_image,image_name, (err,result)=>{
        if(err) throw(err)
        res.send(result)
        console.log(req.file)
    })
    
})
app.get("/upload/:id",(req,res) =>{
    const image_id= req.params.id
    const sql_f= "select image_name from car_image where image_id=?"
    db.query(sql_f,image_id,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
///////////////////////////////////////////

///////////////////////////////////////////
app.post("/all",(req,res) =>{
    const sql_f= "SELECT * FROM CAR"
    db.query(sql_f,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
///////signup


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
     res.send({loggedin:false,message:"not logged in"})
 }
})



///////////////////////////////////////////
app.listen('8080',()=>{
    console.log("running on port sth...")
})