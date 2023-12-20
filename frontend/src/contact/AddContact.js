import React from 'react';

const AddContact=()=>{
        return(
            <div className='ui main'>
                <h2>Add Contact</h2>
                <form>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Enter a Name'></input>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder='Enter your email'></input>
                    </div>
                    <button className='ui button blue'>Add</button>
                </form>
            </div>
            )
    }


export default AddContact