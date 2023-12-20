import React, { useState } from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
const Login = ({setShowLogin,setShowtable_1}) => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const close=()=>{
    setShowLogin(false);
    var buttons = document.getElementsByTagName("button");
          for (var i = 0; i < buttons.length; i++){
                  buttons[i].disabled = false;
            }
  }

async function handleLogin(e){
    e.preventDefault()
    try{
      await axios.post("/Login",{
       email,password
})
    .then(res=>{
      if(res.data==="exist"){
            alert('Login successful! Redirecting to home......');
            setShowLogin(false)
            history("/",{state:{id:email}})
            setShowtable_1(true)
      }
      else if(res.data==="notexist"){
        alert("you haven't signup")
      }
    })
    .catch((e)=>{
      alert("error occurred")
      console.log(e)
    })
  }
catch(e){
    console.log(e)
}
};

  return (
    <div className='box'>
      <button
        onClick={close}
        className='close'
        >X</button>
      <h1>Login</h1>
      <form>
        <label className='l1'>Email : </label>
        <input
        className='label_1'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <label className='l2'>Password : </label>
        <input
        className='label_1'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button className='btn' onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;