import logo from './logo.svg';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Nav_bar from './components/Nav_bar'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import All_cars from './components/AllCars'
import Loan from './components/Loan'
import Filter from './components/Filter'
function App() {
  return (
    <div className="App">
      <Router>
      <Nav_bar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cars" element={<All_cars/>}/>
        <Route path="/loan" element={<Loan/>}/>
        <Route path="/filter" element={<Filter/>}/>
      </Routes>
      <Footer/>
      </Router>
   
    </div>
  );
}

export default App;
