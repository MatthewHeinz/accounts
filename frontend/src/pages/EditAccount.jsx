import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';

const EditAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(true);
  
  const navigate = useNavigate();
  const loc = useLocation();
  const displayedAcc = loc.state.displayedAcc;
  const loggedAccount = loc.state.loggedAccount;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/accounts")
      .then((res) => {
        setAccounts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const confirmChanges = () => {
    const updatedAcc = {
      firstname: document.getElementById('newFirstname').value,
      lastname: document.getElementById('newLastname').value,
      age: document.getElementById('newAge').value,
    }
    setLoading(true);
    axios
      .put(`http://localhost:3000/accounts/edit/${displayedAcc._id}`, updatedAcc)
      .then(() => {
        navigate(`/accounts/show/${loggedAccount._id}`, {state: {loggedAccount}});
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen bg-gray-800 gap-6'>
      <div className='flex justify-center items-center bg-black rounded-md gap-6 p-6'>
        <p className='text-white'>Logged in as {loggedAccount.firstname} {loggedAccount.lastname}</p>
        <button className='px-2 py-1 mr-2 bg-green-700 hover:bg-green-600 text-white'>Logout</button>
      </div>
      <div className='flex flex-col justify-center items-center bg-black rounded-md'>
        {loading ? (
          <div>
            <Spinner />
            <p className='text-white text-xl'>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 m-6">
            {accounts.map(displayedAcc => (
              <div key={displayedAcc._id} className="flex justify-center items-center w-full bg-gray-700 p-4 rounded-md px-40 text-white ">
                <div className='flex justify-center items-center w-full'>
                  <div className='my-2'>Firstname: {displayedAcc.firstname}</div>
                  <div className='my-2'>Lastname: {displayedAcc.lastname}</div>
                  <div className='my-2'>Age: {displayedAcc.age}</div>
                </div>
                <div className='flex justify-center items-center w-full'>
                  <button className='px-2 py-1 mr-2 bg-yellow-600 hover:bg-yellow-500 text-white' onClick={() => navigate(`/accounts/edit/${displayedAcc._id}`, {state: {displayedAcc, loggedAccount}})}>Edit</button>
                  <button className='px-2 py-1 mr-2 bg-red-700 hover:bg-red-600 text-white' onClick={() => navigate(`/accounts/delete/${displayedAcc._id}`, {state: {displayedAcc, loggedAccount}})}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editMode && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-black p-4 rounded-md border border-blue-400 flex flex-col justify-center items-center gap-4">
              <p className='text-white'>Editing {displayedAcc.firstname} now</p>
              <div className='grid grid-rows-3 grid-cols-2 gap-6'>
                <p className='text-white'>Firstname: </p>
                <input id='newFirstname' type='text'></input>
                <p className='text-white'>Lastname: </p>
                <input id='newLastname' type='text'></input>
                <p className='text-white'>Age: </p>
                <input id='newAge' type='text'></input>
              </div>
              <div>
                <button className='px-2 py-1 mx-1 bg-green-700 hover:bg-green-600 text-white' onClick={() => confirmChanges()}>Finish Edit</button>
                <button className='px-2 py-1 mx-1 bg-red-700 hover:bg-red-600 text-white' onClick={() => navigate(`/accounts/show/${loggedAccount._id}`, {state: {loggedAccount}})}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAccount;
