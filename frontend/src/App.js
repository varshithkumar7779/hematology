import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import Home from './page/Home';
import './App.css';

function App() {  
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/Login" element={<Login/>}/>
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