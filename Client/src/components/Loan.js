import './Loan.css';
import {useEffect, useState} from "react";
import ReactDom from 'react-dom';
import axios from "axios";

function Find_loan() {

  const [stock,setstock] = useState()
  const [price,setPrice] = useState()
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
  
  const handlestock = (event) => {
    setstock(document.getElementById("stock").value)
    //setstock(event.target.value)
    axios.post(`http://localhost:8080/Loan/${stock}`)
    alert(stock);
    setResult([...result,{
        price:price,color:color,drive_train:drive_train,MPG:MPG,
        fuel_type:fuel_type, transmition:transmition,
        engine_type:engine_type,VIN:VIN,stock_no:stock_no,
        model:model,year:year,make:make,
        style_type:style_type,feature:feature,image_id:image_id},])
  }

  useEffect(()=>{
    axios.get(`http://localhost:8080/Loan/${stock}`).then((response)=>{
      setResult(response.data)
    })
  },[result])

  
  const handlepay = (event) => {
    var rate= (( parseInt(event.target.value))/2.5)/100 
    var final= (result[0].price)*rate
    final= (result[0].price)+final
    
    document.getElementById("b1").value=final
}

  return (
    
    <div className="Find_loan">        
        <div id="div1">
    <div className="stockdiv">
        <h3> ENTER CAR STOCK NUMBER</h3>
          
            <input id="stock" type="number" placeholder="stock number"/> 
            <input type="button" value= "FIND" onClick={handlestock} />                
            
            </div>
        <nav id="nav5">
        {result.map((val)=>{
          return( 
            <h1 className="res">
              {val.price}|{val.color}|{val.drive_train}|{val.MPG}|
              {val.fuel_type}| {val.transmition}|
              {val.engine_type}|{val.VIN}|{val.stock_no}|
              {val.model}|{val.year}|{val.make}|
              {val.style_type}|{val.feature}|{val.image_id}
            </h1>)
               
        })}
        </nav>
            
        <h3 className="h3"> HOW DO YOU WANT TO PAY</h3>
            <nav id="nav2b">
            <input type="button" value="5" onClick={handlepay} />
            <input type="button" value="10" onClick={handlepay} />
            <input type="button" value="20" onClick={handlepay} />
            <input type="button" value="25" onClick={handlepay} />
            <input type="button" value="30" onClick={handlepay} />    
            </nav>
            
        <h3 className="total"> THE TOTAL PRICE</h3>

            <nav id="nav3">
            <input id="b1" type="button" />
            </nav>

        </div>
      <div>      
      </div>
  
    </div>
  );
}







export default Find_loan;