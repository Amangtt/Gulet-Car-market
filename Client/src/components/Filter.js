import './Filter1.css';
import {useEffect, useState} from "react";
import ReactDom from 'react-dom';
import axios from "axios";

function Filter() {
  
  const [search,setSearch] = useState("ford")

  const [price,setPrice] = useState()
  const [color,setColor] = useState()
  const [drive_train,setDrive_train] = useState()
  const [MPG,setMPG] = useState()
  const [fuel_type,setFuel_type] = useState()
  const [transmition,setTransmition] = useState()
  const [engine_type,setEngine_type] = useState()
  const [VIN,setVIN] = useState()
  const [stock_no,setStock_no] = useState()
  const [model,setModel] = useState()
  const [year,setYear] = useState()
  const [make,setMake] = useState()
  const [style_type,setStyle_type] = useState()
  const [feature,setFeature] = useState()
  const [image_id,setImage_id] = useState()

  const [result,setResult]= useState([])
  const [result2,setResult2]= useState([])
  
  const [temp1,setTemp1]= useState(0)

  
  const handleChangef = (event) => {
    setFuel_type(event.target.value)
  }
  
  const handleSubmit = () => {
    
    axios.post("http://localhost:8080/search",{
      search:search, price:price,color:color, 
      fuel_type:fuel_type, year:(year.substr(0,4)), style_type:style_type
    }).then((response)=>{
      setResult(response.data)
      setTemp1(response.data.length)
    })
  
  }
  
  
  const handlefind = () => {
    var search_value= document.getElementById("search").value    
    setSearch(search_value)
    
    setResult([...result,{
      price:price,color:color,drive_train:drive_train,MPG:MPG,
      fuel_type:fuel_type, transmition:transmition,
      engine_type:engine_type,VIN:VIN,stock_no:stock_no,
      model:model,year:year,make:make,
      style_type:style_type,feature:feature,image_id:image_id},])

    axios.get(`http://localhost:8080/finds/${search}`).then((response)=>{
      setResult(response.data)
      setTemp1(response.data.length)
    })  
  }

  function printout(){
    if (temp1!=0){
      return(result.map((val)=>{
        return( 
          <li className="fil">
            <img src={val.image_id} width="300px" height="250px" /> 
            <h1>{val.make}</h1>
            <h4>{val.model}</h4>
            <p>{val.fuel_type}|{val.transmition}</p>
            <br></br>
            <h1>{val.price} BIRR</h1>
          </li>)
        }))
    }else{
      return(
        <h1>"NO MATCH FOUND"</h1>
      )
    }
  }
  useEffect(()=>{
    axios.post("http://localhost:8080/all")
    .then((response)=>{
      console.log(response.data)
      setResult2(response.data)
      setTemp1(response.data.length)
    })
  },[])

  return (
    <div className="Find_car">
      
      <div class="div1">
        <input type="search" id="search" placeholder="Search cars using brand names" />
        <input id="find_button" type="button" value="FIND" onClick= {handlefind} />
      </div>
            
      
        <form> 
        <div className="div2">
          <lable> <h2>fuel type</h2></lable><br></br>
          <label ><h2>petrol</h2></label>
            <input type= "radio" name= "fuel_type" value= "GASOLINE" onChange= {handleChangef} />
          <label ><h2>diesel</h2></label>
            <input type= "radio" name= "fuel_type" value= "DIESEL" onChange= {handleChangef} />
          <label ><h2>hybrid</h2></label>
            <input type= "radio" name= "fuel_type" value= "HYBRID" onChange= {handleChangef} />
          <label ><h2>electric</h2></label>
            <input type= "radio" name= "fuel_type" value= "ELECTRIC" onChange= {handleChangef} />
          <br></br>
          </div>
          <div className="div3">
          <label><h2>price range</h2></label><br></br>
          <label><h2>max</h2></label>
            <input type= "number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/> 
          <br></br>
          <label><h2>color</h2></label><br></br>
            <input type="text" name= "color" value={color} onChange={(e) => setColor(e.target.value)} />
          <br></br>
          <label><h2>year</h2></label><br></br>
            <input type="date" name= "year" value={year} onChange={(e) =>  setYear(e.target.value)} />
          <br></br>
          <label><h2>style</h2></label><br></br>
            <input type="text" name= "style" value={style_type} onChange={(e) => setStyle_type(e.target.value)} />
          <br></br>
            <input id="filter_button" type="button" value="FILTER" onClick={handleSubmit} /> 
        </div>
        </form>
      
      
      <div class="div3">
        <nav>
          <ul>
            {printout()}
          </ul>
        </nav>
      </div>

    </div>
  );
}



export default Filter;