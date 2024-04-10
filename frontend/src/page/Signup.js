import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [opt1, setopt1] = useState('');
  const [opt2, setopt2] = useState('');
  const [otp, setotp] = useState('');
  const [otpinput, setotpinput] = useState(false);


async function opts(e) {
    if(opt1 || opt2){
    //alert(`opt1: ${opt1}, opt2: ${opt2}`)
    setopt1(null)
    setopt2(null)
    setotpinput(true)
    if(opt1){
      try {
        await axios.post("http://localhost:8000/otp", {
            email
        });
        } 
      catch(error) {
        alert("Error sending OTP:", error);
    }
    }
    else if(opt2){
      try {
        await axios.post("/otpnum", {
            number
        });
        } 
      catch(error) {
        alert("Error sending OTP:", error);
    }
    }
  }
    else{
      alert('please select the option')
    }
}

async function handleSignup(e){

    e.preventDefault();
    try{
      
      await axios.post("http://localhost:8000/Signup",{
          name,number,email,password,otp
      })
      .then(res=>{
        if(res.data==="exist"){
            alert("user already exists")
        }
        else if(res.data==="notexist"){
            alert('Signup successful! Redirecting to home......');
        }
        else if(res.data==="otpfailed"){
          alert('OTP verification failed');
        }
        else{
          alert("error")
        }
      })
      .catch((e)=>{
        alert("error occured")
        console.log(e)
      })
   }
   catch(e){
       console.log(e)
   }
  }
  return (
    <>
    <div className='box'>
      <h2>Sign Up</h2>
      <form className='input-container'>
        <label className='s1'>Name : </label>
        <input
          className='input_1'
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <label>Mobile Number : </label>
        <input
          className='input_1'
          type="number"
          placeholder="Mobile number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br/>
        <label className='s3'>Email : </label>
        <input
          className='input_1'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <label className='s4'>Password : </label>
        <input
          className='input_1'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <br></br>
        <div>
        <label>Choose the type of verification method</label>
        <br></br>
        <input 
        type="radio"
        id="first"
        value='email'
        name='opt'
        className='opt'
        onChange={(e) => setopt1(e.target.value)}/>
        <label for="first" id='id_1'>email</label>
        <br></br>     

        <input
        type="radio"
        id="second"
        value='phone number'
        name='opt'
        className='opt'
        onChange={(e) => setopt2(e.target.value)}/>
        <label for="second" id='id_1'>phone number</label>
      </div>
      <br></br>
      <button onClick={opts} className='opt_submit'>Submit</button>
      <br></br>
      {otpinput && (
          <div>
              <input
              className='input_1'
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setotp(e.target.value)}/>
          </div>
      )}
      <div className='btn_flex'>
          <button className='btn_1' onClick={handleSignup}>Signup</button>
      </div>
      <div>Already signed up? <Link to="/Login">Login</Link></div>
    </div>
    </>
  );
}

export default Signup;