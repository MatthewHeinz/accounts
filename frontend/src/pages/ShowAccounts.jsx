import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';

const ShowAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedAccount, setLoggedAccount] = useState(null);

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/accounts")
      .then((res) => {
        setAccounts(res.data);
        const loggedAccountId = loc.state.loggedAccount._id;
        const updatedLoggedAccount = res.data.find(acc => acc._id === loggedAccountId);
        setLoggedAccount(updatedLoggedAccount);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen bg-gray-800 gap-6'>
      <div className='flex justify-center items-center bg-black rounded-md gap-6 p-6'>
        <p className='text-white'>{loggedAccount ? `Logged in as ${loggedAccount.firstname} ${loggedAccount.lastname}` : 'Loading...'}</p>
        <button className='px-2 py-1 mr-2 bg-green-700 hover:bg-green-600 text-white' onClick={() => navigate('/')}>Logout</button>
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
      </div>
    </div>
  );
};

export default ShowAccounts;