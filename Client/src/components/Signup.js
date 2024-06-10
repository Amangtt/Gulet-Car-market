import React,{useState}from 'react'
import axios from 'axios'
import Signupcss from './Signupcss.css'
function Signup() {
    const [email ,setEmail]=useState("");
    const [username ,setUsername]=useState("");
    const [password ,setPassword]=useState("");
    const [firstname ,setFirstname]=useState("");
    const [lastname ,setLastname]=useState("");
    const [contact ,setContact]=useState("");
    const submit=()=>{
        axios.post('http://localhost:8080/sign_in',{
            email:email,
            username:username,
            password:password,
            firstname:firstname,
            lastname:lastname,
            contact:contact
        }).then(alert("inserted"))
    }

    
  return (
    <div className="signup">
    <div id="area">
      <h1>Signup</h1>
      <div className="form">
        <div className="text_area">
      <input type="email" className="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
      <input type="text" className="username"placeholder="username"onChange={(e)=>setUsername(e.target.value)}/>
      <input type="password" className="password" placeholder="password"onChange={(e)=>setPassword(e.target.value)}/>
      <input type="text" className="firstname" placeholder="Firstname"onChange={(e)=>setFirstname(e.target.value)}/>
      <input type="text" className="lastname" placeholder="Lastname"onChange={(e)=>setLastname(e.target.value)}/>
      <input type="text" className="contact" placeholder="contact number"onChange={(e)=>setContact(e.target.value)}/>
      </div>
      <button className="but" onClick={submit}>SIGNUP</button>
      </div>
    </div>
    </div>
  )
}

export default Signup
