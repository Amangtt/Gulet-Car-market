import './AllCars.css';
import {useEffect, useState} from "react";
import ReactDom from 'react-dom';
import axios from "axios";

function All_cars() {
  
  const [car_type,setCar_type] = useState("PICKUP")
  const [price,setPrice] = useState("")
  const [color,setColor] = useState("")
  const [drive_train,setDrive_train] = useState("")
  const [MPG,setMPG] = useState("")
  const [fuel_type,setFuel_type] = useState("")
  const [transmition,setTransmition] = useState("")
  const [engine_type,setEngine_type] = useState("")
  const [VIN,setVIN] = useState("")
  const [stock_no,setStock_no] = useState("")
  const [model,setModel] = useState("")
  const [year,setYear] = useState("")
  const [make,setMake] = useState("")
  const [style_type,setStyle_type] = useState("")
  const [feature,setFeature] = useState("")
  const [image_id,setImage_id] = useState("")

  const [result,setResult]= useState([])
  


  const handleclick = (event) => {
        

      setCar_type(event.target.value)
      axios.get(`http://localhost:8080/All_vehicles/${car_type}`).then((response)=>{
      setResult(response.data)
    })
  }

  //useEffect(()=>{
  //  axios.get(`http://localhost:8080/All_vehicles/${car_type}`).then((response)=>{
  //    setResult(response.data)
  //  })
 // },[result])

  const handleclick_all = () => {
    
      
      axios.post("http://localhost:8080/all").then((response)=>{
      setResult(response.data)
    })
  }

  return (
    <div className="All_cars">
      <div className="type">
      <nav id="nav1">
        <ul className="carc">
        <li> <input type="button" value="PICKUP" onClick={handleclick} /></li> 
        <li><input type="button" value= "HATCHBACK" onClick={handleclick} /></li>
        <li><input type="button" value="SUV" onClick={handleclick} />     </li>
        <li><input type="button" value="SEDAN" onClick={handleclick} /></li>
        <li><input type="button" value="MINIVAN" onClick={handleclick} /> </li>
        <li><input type="button" value="COUP" onClick={handleclick} /></li>
        <li><input type="button" value="ALL CARS" onClick={handleclick_all} /></li>
        </ul>     
      </nav>
      </div>
      <nav id="nav2">
        {result.map((val)=>{
          return( 
            
            <li className="inm">
              <img src={val.image_id} className="imgin" /> 
              <h1>{val.make}</h1> <h4>{val.model}</h4>   
              <p>{val.fuel_type}|{val.transmition}</p>
              <h1>{val.price} BIRR</h1>
              <br></br>
              <p>{val.color}|{val.drive_train}|{val.MPG}|
               {val.transmition}|{val.engine_type}|{val.VIN}|
               {val.stock_no}|{val.year}|{val.style_type}</p>
            </li>)
        })}
      </nav>  
    </div>
  );
}


export default All_cars;