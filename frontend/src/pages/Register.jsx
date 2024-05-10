import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Register = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const createAccount = () => {
        const newAcc = {
            firstname: document.getElementById('firstnameInput').value,
            lastname: document.getElementById('lastnameInput').value,
            age: document.getElementById('ageInput').value,
        }
        setLoading(true);
        axios
        .post('http://localhost:3000/accounts/Register', newAcc)
        .then(() => {
            navigate('/')
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

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
                    <p className='text-white font-mono my-2'>Firstname: </p>
                    <input type='text' className='bg-white mb-4' id='firstnameInput'></input>
                    <p className='text-white font-mono my-2'>Lastname: </p>
                    <input type='text' className='bg-white mb-4' id='lastnameInput'></input>
                    <p className='text-white font-mono my-2'>Age: </p>
                    <input type='text' className='bg-white mb-4' id='ageInput'></input>
                    <div className='flex justify-center items-center'>
                        <button className='my-2 p-2 mx-2 bg-red-700 hover:bg-red-600 text-white font-mono' onClick={() => navigate('/')}>Cancel</button>
                        <button className='my-2 p-2 mx-2 bg-blue-500 hover:bg-blue-400 text-white font-mono' onClick={() => createAccount()}>Register</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Register
