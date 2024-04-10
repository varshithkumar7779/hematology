import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Check from './page/Check';
import Signup from './page/Signup';
import Login from './page/Login';
import Checkdl from './page/Checkdl';
import Bloodcamp from './page/Bloodcamp';
import Donorlogin from './page/Donorlogin';
import Bloodsearch from './page/Bloodsearch';
import Bloodbank from './page/Bloodbank';
import Bloodcampsearch from './page/Bloodcampsearch';
import Cart from './page/Cart';
import './App.css';      

function App() {  
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Check" element={<Check/>} />
          <Route path="/Checkdl" element={<Checkdl/>} />
          <Route path='/Bloodcamp' element={<Bloodcamp/>}/>
          <Route path='/Donorlogin' element={<Donorlogin/>}/>
          <Route path="/Bloodsearch" element={<Bloodsearch/>} />
          <Route path="/Bloodbank" element={<Bloodbank/>} />
          <Route path="/Bloodcampsearch" element={<Bloodcampsearch/>} />
          <Route path='/Cart' element={<Cart/>}/>
        </Routes>
    </Router>
    </>)
}

export default App

/*import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './contact/Header'
import AddContact from './contact/AddContact'
import ContactList from './contact/ContactList'
import './App.css';

function App() {
  const contacts=[
    {
      id:'1',
      name:'abc',
      email:'abc@gmail.com'
    },
    {
        id:'2',
        name:'def',
        email:'def@gmail.com'
      }
  ]
  return (
    <>
    <div className='ui container'>
      <Header />
      <AddContact />
      <ContactList contacts={contacts}/>
    </div>
    </>)
}

export default App;*/