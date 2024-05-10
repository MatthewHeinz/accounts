import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

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

  const tryLogin = (firstnameParam, lastnameParam) => {
    const isFirstNameExisting = accounts.some(account => account.firstname === firstnameParam);
    const isLastNameExisting = accounts.some(account => account.lastname === lastnameParam);

    if (isFirstNameExisting && isLastNameExisting) {
      document.getElementById('firstnameInput').value = '';
      document.getElementById('lastnameInput').value = '';
      
      const loggedAccount = accounts.find(account => account.firstname === firstnameParam && account.lastname === lastnameParam);
      navigate(`/accounts/show/${loggedAccount._id}`, {state: {loggedAccount}});
    } else {
      document.getElementById('firstnameInput').value = '';
      document.getElementById('lastnameInput').value = '';
      
      if (firstnameParam === '' || lastnameParam === ''){
        setErrorMessage('Ensure both fields are filled!');
      } else if (!isFirstNameExisting || !isLastNameExisting){
        setErrorMessage('Unknown person! ಠ_ಠ');
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <Spinner />
          <p className='text-white text-xl'>Loading...</p>
    </div>
      ) : (
        <div className='flex justify-center items-center h-screen w-screen bg-gray-800'>
          <div className='flex flex-col justify-center items-center w-1/4 h-1/2 rounded-xl bg-black'>
            <Link to={"/Register"} className='text-white font-mono my-6 hover:text-yellow-300'>Not registered?</Link>
            <p className='text-white font-mono my-2'>Firstname</p>
            <input type='text' className='bg-white mb-4' id='firstnameInput'></input>
            <p className='text-white font-mono my-2'>Lastname</p>
            <input type='text' className='bg-white mb-4' id='lastnameInput'></input>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-mono my-2 p-2' onClick={() => tryLogin(document.getElementById('firstnameInput').value, document.getElementById('lastnameInput').value)}>Login</button>
            {errorMessage && (
              <p className='text-red-500 font-mono my-2'>{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;