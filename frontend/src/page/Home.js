import React from 'react';
import './Home.css';
import { useState} from 'react';
import { useLocation } from 'react-router-dom';


const Home=()=>{
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
return(
        <>
        <nav>
            <ul>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
            <i class="fa-solid fa-droplet"></i>
              <h1 className="h1">HOME</h1>
              <h1 className="h2">ABOUT US</h1>
              <a href='Bloodsearch'><h1 className="h2">LOOKING FOR BLOOD</h1></a>
              <a href='Donorlogin'><h1 className="h2">WANT TO DONATE BLOOD</h1></a>
              <a href=''><h1 className="h2">BLOOD BANK LOGIN</h1></a>
              <div className='cart'><a href='Cart'><i class="fa-solid fa-cart-shopping"></i></a></div>
              <i class="fa-solid fa-circle-user" onClick={toggleMenu}></i>
            </ul>
        </nav>
        <div class="welcome-message">
          <ul>Hematology Web Lab</ul>
          <ul>Check your Anemic status</ul>
          <a href='Check'>
            <button>Check</button>
          </a>
          <ul>Image prediction with dl</ul>
          <a href='Checkdl'>
            <button>Predict</button>
          </a>
        </div>
        <div className="additional-boxes">
        <a href='Bloodsearch'>
            <div className="box1 blood-availability">
              <i class="fa-solid fa-hand-holding-droplet"></i>
              <h2>Blood Availability Search</h2>
            </div>
        </a>
        <a href='Bloodbank'>
            <div className="box1 blood-bank-directory">
              <i class="fa-regular fa-hospital"></i>
              <h2>Blood Bank Directory</h2>
            </div>
        </a>
        <a href='Bloodcampsearch'>
            <div className="box1 blood-donation-camps">
             <i class="fa-regular fa-clock"></i>
              <h2>Blood Donation Camps</h2>
            </div>
        </a>
        <a href='Donorlogin'>
              <div className="box1 blood-donate">
                <i class="fa-regular fa-circle-user"></i>
                <h2>Donor<br/>Login</h2>
              </div>
        </a>
        <a href='Bloodcamp'>
            <div className="box1 blood-bank-login">
              <i class="fa-regular fa-circle-user"></i>
              <h2>Register Voluntary Blood Camp</h2>
            </div>
        </a>
        </div>
        <img src="Screenshot (163).png" alt='image_alternate'/>

    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <i class="fa-solid fa-square-xmark"  onClick={toggleMenu}></i>
      <i class="fa-solid fa-circle-user" id='sidebar_i1'></i>
      <ul className="menu">
        <div><i class="fa-solid fa-house"></i>About us</div>
        <div><i class="fa-solid fa-phone"></i>Contact</div>
        <div><i class="fa-solid fa-question"></i>Support</div>
      </ul>
      <div>
    <div className='form-data'>
          <p>Name : {state.name}</p>
          <p>Number : {state.number}</p>
          <p>Email : {state.email}</p>
          <p>Password : {state.password}</p>
    </div>
    <div className='logout_btn'>
    <i class="fa-solid fa-arrow-right-from-bracket"></i>Log out
    </div>
  </div>
</div>
        </>
      )}

export default Home
//nodemon '.\node server\index.js'
//".\node server\index.js"