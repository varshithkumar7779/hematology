import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import './Home.css';
import Signup from "./Signup";
import Login from "./Login";
import axios from 'axios';
//import { render } from '@testing-library/react';


const Home=()=>{
    const location=useLocation()
    const [userEmail, setUserEmail] = useState(location.state?.id || 'Guest');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showtable, setShowtable] = useState(false);
    const [showtable_1, setShowtable_1] = useState(false);
    const [Gender, setGender] = useState('');
    const [Hemoglobin, setHemoglobin] = useState('');
    const [MCH, setMCH] = useState('');
    const [MCHC, setMCHC] = useState('');
    const [MCV, setMCV] = useState('');
    const [Result, setResult] = useState('');
    const [Twovalues, setTwovalues] = useState(true);
    const [Display, setDisplay] = useState(false);
    const [value, setValue] = useState('0');
    const [GroundTruth, setGroundTruth] = useState('');



    const twovalues=()=>{
      setTwovalues(false)
    }
    const twovalue=()=>{
      setTwovalues(true)
    }
    const handleChange = (e) => {
      setValue(e.target.value);
    };
    const logout=()=>{
      setShowtable(false);
      setShowtable_1(false);
      setDisplay(false);
      setUserEmail('Guest');
      var buttons = document.getElementsByTagName("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    }

    const openSignup = () => {
      setShowSignup(true);
      setShowLogin(false); 
      var buttons = document.getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
    };
    const openLogin = () => {
      setShowLogin(true);
      setShowSignup(false);
      var buttons = document.getElementsByTagName("button");
      for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
      }
      buttons[2].disabled = false;
    };
    async function find_result(e){
      e.preventDefault()
      let opt='';
      if(Twovalues===true){
          opt='0';
      }
      else{
          opt='1';
      }
      try{
        await axios.post("http://localhost:8000/values",{
        Gender: parseInt(Gender),
        Hemoglobin: parseInt(Hemoglobin),
        MCH: parseInt(MCH),
        MCHC: parseInt(MCHC),
        MCV: parseInt(MCV),
        opt: parseInt(opt)
      })
      .then((res) => {
          if(value==='0'){
            setGroundTruth(res.data.GroundTruth)
            delete res.data.GroundTruth;
            setResult(res.data)
          }
          else{
            setResult({[value]:res.data[value]})
          }
          alert("data received")
          setDisplay(true)
      })
      .catch((error) => {
        alert("Error printing values", error);
        console.log(error);
      });
      }
  catch(error){
    alert("Error sending values", error);
    console.log(error);
  }

};
let evaluate=(e)=>{
  const [gender,hemoglobin,mch,mchc,mcv]=e.target.value.split(' ');
    setGender(gender);setHemoglobin(hemoglobin);setMCH(mch);setMCHC(mchc);setMCV(mcv)
  }
  
    return(
        <>
        <nav>
            <ul>
              <h1 className="h1">Mykart</h1>
              <li>
                <button 
                onClick={openSignup}
                className="li_sub">
                  Signup
                </button>
              </li>
              <li>
                <button 
                 onClick={openLogin}
                 className="li_sub">
                  Login
                </button>
              </li>
              <li>
                <button
                onClick={logout}
                className="li_sub">
                  Logout
                </button>
              </li>
            </ul>
        </nav>
        <div className='user'>Hello<div className='user_color'>{userEmail} ,</div>welcome to the Mykart</div>
        {showSignup && <Signup setShowSignup={setShowSignup} setShowtable={setShowtable}/>}
        {showLogin && <Login setShowLogin={setShowLogin} setShowtable_1={setShowtable_1}/>}
        {(showtable || showtable_1) && (
          <>
          <br></br>
          <select className='select_value2' onChange={evaluate}>
                <option value="1 14.9 22.7 29.1 83.7">Gender:1 , Hemoglobin:14.9 , MCH:22.7 , MCHC:29.1 , MCV:83.7 ,Result:Non-Anemic</option>
                <option value="0 15.9 25.4 28.3 72">Gender:0 , Hemoglobin:15.9 , MCH:25.4 , MCHC:28.3 , MCV:72 ,Result:Non-Anemic</option>
                <option value="0 9 21.5 29.6 71.2">Gender:0 , Hemoglobin:9 , MCH:21.5 , MCHC:29.6 , MCV:71.2 ,Result:Anemic</option>
                <option value="0 14.9 16 31.4 87.5">Gender:0 , Hemoglobin:14.9 , MCH:16 , MCHC:31.4 , MCV:87.5 ,Result:Non-Anemic</option>
                <option value="1 14.7 22 28.2 99.5">Gender:1 , Hemoglobin:14.7 , MCH:22 , MCHC:28.2 , MCV:99.5 ,Result:Non-Anemic</option>
          </select>
          <div className='values'>
            <label>Gender : </label>
            <input
              className='values_1'
              type="number"
              placeholder={Hemoglobin}
              value={Gender}
              min='0'
              max='1'
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Hemoglobin : </label>
            <input
              className='values_1'
              type="number"
              placeholder={Hemoglobin}
              value={Hemoglobin}
              onChange={(e) => setHemoglobin(e.target.value)}
            />{ Twovalues &&(<>
                  <label>MCH : </label>
                  <input
                    className='values_1'
                    type="number"
                    placeholder={MCH}
                    value={MCH}
                    onChange={(e) => setMCH(e.target.value)}
                  />
                  <label>MCHC : </label>
                  <input
                    className='values_1'
                    type="number"
                    placeholder={MCHC}
                    value={MCHC}
                    onChange={(e) => setMCHC(e.target.value)}
                  />
            </>)}
            <label>MCV : </label>
            <input
              className='values_1'
              type="number"
              placeholder={MCV}
              value={MCV}
              onChange={(e) => setMCV(e.target.value)}
            />
            <label>Select :</label>
           <select className='select_value1' onChange={handleChange}>
                <option value="0">All</option>
                <option value="k-Nearest Neighbors">k-Nearest Neighbors</option>
                <option value="Gaussian Naive Bayes">Gaussian Naive Bayes</option>
                <option value="Random Forest">Random Forest</option>
                <option value="Support Vector Machine">Support Vector Machine</option>
                <option value="Logistic Regression">Logistic Regression</option>
                <option value="Decision Tree">Decision Tree</option>
          </select>
          <div class="container">
              <button className='btn_2' onClick={twovalue}>unoptimised</button>
              <button className='btn_2' onClick={twovalues}>optimised</button> 
          </div>
          <button onClick={find_result} className='btn_2' id='btn_submit'>submit</button>
          </div></>)}
          { Display && (
                      <>
                      <div className='table1'>
                          <table>
                            <thead>
                              <tr>
                                <th>Gender</th>
                                <th>Hemoglobin</th>
                                <th>MCH</th>
                                <th>MCHC</th>
                                <th>MCV</th>
                                <th>GroundTruth</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{Gender===0? "Male" : "Female"}</td>
                                <td>{Hemoglobin}</td>
                                <td>{MCH}</td>
                                <td>{MCHC}</td>
                                <td>{MCV}</td>
                                <td>    
                                  {GroundTruth === 0 && "Non-Anemic"}
                                  {GroundTruth === 1 && "Anemic"}
                                  {GroundTruth === 2 && "No match found"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      <div className='table'>
                       <table>
                         <thead>
                            <tr>
                              <th>Algorithm</th>
                              <th>Result</th>
                            </tr>
                         </thead>
                            <tbody>
                              {Object.entries(Result).map(([algorithm, value]) => (
                                <tr key={algorithm}>
                                  <td>{algorithm}</td>
                                  <td>{value===0? "Non-Anemic" : "Anemic"}</td>
                                </tr>
                              ))}
                            </tbody>
                        </table>
                      </div>
                    </>
                )}
            </>)}

export default Home
//nodemon '.\node server\index.js'
//".\node server\index.js"
//<div className='ground_truth'>
//<label>Ground Truth: </label>
//Anemic
//</div>