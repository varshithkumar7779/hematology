import React, { useState } from 'react';
import './Bloodcamp.css';

const Bloodcamp = () => {
  const [campData, setCampData] = useState({
    organisationName: '',
    organiserEmail: '',
    campName: '',
    state: '',
    city: '',
    campProposeDate: '',
    estimatedParticipants: '',
    mobileNo: '',
    campAddress: '',
    district: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(campData);
    setCampData({
      organisationName: '',
      organiserEmail: '',
      campName: '',
      state: '',
      city: '',
      campProposeDate: '',
      estimatedParticipants: '',
      mobileNo: '',
      campAddress: '',
      district: '',
      startTime: '',
      endTime: ''
    });
  };

  const handleReset = () => {
    setCampData({
      organisationName: '',
      organiserEmail: '',
      campName: '',
      state: '',
      city: '',
      campProposeDate: '',
      estimatedParticipants: '',
      mobileNo: '',
      campAddress: '',
      district: '',
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div className="container">
      <div className='camp_reg'>Camp Registration</div>
      <form>
      <div className="form-section">
        <div className="left-section">
          <label htmlFor="organisationName">Organisation Name:</label>
          <input type="text" id="organisationName" name="organisationName" value={campData.organisationName} onChange={handleChange} required/>

          <label htmlFor="organiserEmail">Organiser Email:</label>
          <input type="text" id="organiserEmail" name="organiserEmail" value={campData.organiserEmail} onChange={handleChange} required/>

          <label htmlFor="campName">Camp Name:</label>
          <input type="text" id="campName" name="campName" value={campData.campName} onChange={handleChange} required/>

          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={campData.state} onChange={handleChange} required/>

          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={campData.city} onChange={handleChange} required/>

          <label htmlFor="campProposeDate">Camp Propose Date:</label>
          <input type="date" id="campProposeDate" name="campProposeDate" value={campData.campProposeDate} onChange={handleChange} required/>

          <label htmlFor="estimatedParticipants">Estimated Participants:</label>
          <input type="text" id="estimatedParticipants" name="estimatedParticipants" value={campData.estimatedParticipants} onChange={handleChange} required/>
        </div>
        <div className="right-section">
          <label htmlFor="mobileNo">Mobile No:</label>
          <input type="text" id="mobileNo" name="mobileNo" value={campData.mobileNo} onChange={handleChange} required/>

          <label htmlFor="campAddress">Camp Address:</label>
          <input type="text" id="campAddress" name="campAddress" value={campData.campAddress} onChange={handleChange} required/>

          <label htmlFor="district">District:</label>
          <input type="text" id="district" name="district" value={campData.district} onChange={handleChange} required/>

          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" value={campData.startTime} onChange={handleChange} required/>

          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" value={campData.endTime} onChange={handleChange} required/>
        </div>
      </div>
      <div onSubmit={handleSubmit} className='btns'>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} className='reset-button'>Reset</button>
      </div>
      </form>
    </div>
  );
};

export default Bloodcamp;
