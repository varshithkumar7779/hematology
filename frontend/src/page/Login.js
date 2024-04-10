import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

async function handleLogin(e){
    e.preventDefault()
    try{
      await axios.post("http://localhost:8000/Login",{
       email,password
})
    .then(res=>{
      if(res.data.status==="exist"){
            alert('Login successful! Redirecting to home......');
            navigate('/Home', { state: {
              name: res.data.name,
              number: res.data.number,
              email: res.data.email,
              password: res.data.password
            }});
          }
      else if(res.data.status==="notexist"){
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