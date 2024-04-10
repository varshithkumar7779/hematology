import React, { useState } from 'react';

const Donorlogin = () => {
  const [a, setA] = useState(false);
  const handleGenerateOTP = () => {
    setA(true)
  };
  const changeopt = () => {
    setOpt(!opt);
  };
  const [donorlogindata, setDonorlogindata] = useState({
    mobile: '',
    email: ''
  });
  const [opt, setOpt] = useState(false);
  const [donorData, setDonorData] = useState({
    name: '',
    gender: '',
    mobile: '',
    state: '',
    address: '',
    age: '',
    fatherName: '',
    email: '',
    district: '',
    pincode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorData({
      ...donorData,
      [name]: value
    });
  };
  const handleloginchange = (e) => {
    const { name, value } = e.target;
    setDonorData({
      ...donorlogindata,
      [name]: value
    });
  };
  const handlelogin = (e) => {
    e.preventDefault();
    console.log(donorlogindata);
    setDonorlogindata({
        mobile: '',
        email: ''
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(donorData);
    setDonorData({
        name: '',
        gender: '',
        mobile: '',
        state: '',
        address: '',
        age: '',
        fatherName: '',
        email: '',
        district: '',
        pincode: ''
      });
  };
  const handleReset = () => {
    setDonorData({
        name: '',
        gender: '',
        mobile: '',
        state: '',
        address: '',
        age: '',
        fatherName: '',
        email: '',
        district: '',
        pincode: ''
    });
  };
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    {opt && (
    <div className="container">
      <div className='camp_reg'>Donor Sign-Up</div>
      <form>
      <div className="form-section">
        <div className="left-section">
            <label>Name:</label>
            <input type="text" name="name" value={donorData.name} onChange={handleChange} required/>
            <label>Gender:</label>
            <select name="gender" value={donorData.gender} onChange={handleChange}required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <label>Mobile:</label>
            <input type="text" name="mobile" value={donorData.mobile} onChange={handleChange} required/>
            <label>State:</label>
            <input type="text" name="state" value={donorData.state} onChange={handleChange} required/>
            <label>Address:</label>
            <textarea name="address" value={donorData.address} onChange={handleChange} required></textarea>
         </div>
         <div className="right-section">
            <label>Age:</label>
            <input type="text" name="age" value={donorData.age} onChange={handleChange} required/>
            <label>Father's Name:</label>
            <input type="text" name="fatherName" value={donorData.fatherName} onChange={handleChange} required/>
            <label>Email:</label>
            <input type="email" name="email" value={donorData.email} onChange={handleChange} required/>
            <label>District:</label>
            <input type="text" name="district" value={donorData.district} onChange={handleChange} required/>
            <label>Pincode:</label>
            <input type="text" name="pincode" value={donorData.pincode} onChange={handleChange}required/>
      </div>
     </div>
    </form>
    <div onSubmit={handleSubmit} className='btns'>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} className='reset-button'>Reset</button>
          <button onClick={changeopt}>Login</button>
      </div>
  </div>
  )}
{!opt && (
    <div className="container">
      <div className='camp_reg'>Donor Login</div>
      <form>
      <div className="form-section">
        <div className="left-section">
            <label>Mobile:</label>
            <input type="text" name="mobile" value={donorlogindata.mobile} onChange={handleloginchange} required/>
            <label>Email:</label>
            <input type="email" name="email" value={donorlogindata.email} onChange={handleloginchange} required/>
            <button onClick={handleGenerateOTP}>Generate OTP</button>
            {a &&
              <input type="text" name="otp" value={donorlogindata.otp} onChange={handleloginchange} required/>
            }
         </div>
         <div className="right-section">
          <div className='abc'>Register Now</div>
          <div className='abcd'><i class="fa-solid fa-check"></i><label>View/Add your Donations</label></div>
          <div className='abcd'><i class="fa-solid fa-check"></i><label>Update your Profile</label></div>
          <div className='abcd'><i class="fa-solid fa-check"></i><label>Manage your Account</label></div>
          <button onClick={changeopt}>Register Now</button>
      </div>
     </div>
    </form>
    <div onSubmit={handleloginchange} className='btns'>
          <button type="submit">Submit</button>
    </div>
  </div>
  )}
</>
  );
};

export default Donorlogin;
