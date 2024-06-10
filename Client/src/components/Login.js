import React,{useEffect, useState} from 'react'
import Logincss from './Logincss.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Nav_bar from './Nav_bar';

function Login() {
  
    const [usernamelog ,setUsernamelog]=useState("");
    const [passwordlog ,setPasswordlog]=useState("");
    const [logstat,setlogstat]=useState("");
   axios.defaults.withCredentials=true;
    const login_b =()=>{
     axios.post('http://localhost:8080/login',
      {
        usernamelog:usernamelog,
        passwordlog:passwordlog,
        
      }).then((res)=>{if(res.data.message){
        setlogstat(res.data.message)
      }else{
        setlogstat(res.data[0].USERNAME)
      } 
    })
    }
    useEffect(()=>{
      axios.get('http://localhost:8080/login').then((res)=>{
      if(res.data.loggedin == true){ 
      setlogstat(res.data.user[0].USERNAME)
     
      } console.log(res)
      })
    },[])
    return (
    <div className="loginpage">
    <div className="login">
      <h1>{logstat}</h1>
        <h1>Login</h1>
        
        <div className="formlog">
          <div className="text_feild">
        <input type="text" className="username" placeholder="enter username" onChange={(e)=>setUsernamelog(e.target.value)}/>
        <input type="password" className="password"placeholder="enter password" onChange={(e)=>setPasswordlog(e.target.value)}/>
        </div>
      <button className="log" onClick={()=>login_b()} >LOGIN</button><br/>
      
      <div className="link">
     Not a member?<a href="/signup">Signup</a>
     
     </div>
     </div>    
    </div>
    </div>
  )
}

export default Login
