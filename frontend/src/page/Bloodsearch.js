import React from 'react'
import { useState } from 'react';

const Bloodsearch = () => {
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  /*
    const filterBloodBanks = () => {
      const filteredBloodBanks = bloodBanksData.filter(bloodBank => {
        return bloodBank.address.state === selectedState && bloodBank.address.district === selectedDistrict && bloodBank.availability[selectedBloodGroup] > 0;
      });
      console.log(filteredBloodBanks);
    };*/
  
    return (
      <>
      <div className='container'>
        <div className='camp_reg'>Search Blood Stock</div>
        <div className="searchbloodstock">
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          <option value="Telangana">Telangana</option>
        </select>
        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="">Select District</option>
          <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
          <option value="Khammam">Khammam</option>
        </select>
        <select value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A+">A-</option>
          <option value="A+">B+</option>
          <option value="A+">B-</option>
        </select>
        </div>
      </div>
      <button className='btn_search'>Search</button>
      <div>
            {true && (
                <table>
                    <thead className='table_data'>
                        <tr  className='table_data'>
                            <th>S.No.</th>
                            <th>Blood Bank</th>
                            <th>Category</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody className='list_data'>
                        {searchResults.map((result, index) => (
                            <tr key={index}>
                                <td>{result.bloodbankname}, {result.address.streetAddress}, {result.address.city}, {result.address.district}, {result.address.state}</td>
                                <td>{selectedBloodGroup}</td>
                                <td>{result.availability[selectedBloodGroup]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
          )}
      </div>
    </>
    );
}

export default Bloodsearch