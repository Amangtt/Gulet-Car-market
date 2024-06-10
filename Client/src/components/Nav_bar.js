import react,{Component} from 'react'
import Nav_barcss from './Nav_barcss.css'
import React,{useState} from 'react'

 function Nav_bar(props) {
   
 
    const [ismobile,setismobile]=useState(false);  
  
  
 
    
      return (
        //nav_bar
<div className="home">
          <div className="head">
        <div className="nav"><nav>
        
          <ul className={ismobile ? "navmobile":"navdesktop"} onClick={()=>setismobile(false)}>
     
        <div className="HOME"><li><a href="/">HOME</a></li></div>
        <div className="VEHICLES"><li><a href="/cars">VEHICLES</a></li></div>
        <div className="BRAND"><li><a href="/loan">FINANCE</a></li></div>
        <div className="about"><li><a href="about.asp">About</a></li></div>
        <div className="LUXURY"><li><a href="/Filter">FILTER</a></li></div>
        <div className="LOGIN"><li><a href="/Login" >LOGIN</a></li></div>
      </ul> 
      <input type="image" src="list.png" className="butnav" onClick={()=>setismobile(!ismobile)} width="20px" height="20px"/>
      </nav></div>
      </div>

     
</div>
      )
    }

export default Nav_bar