import React, { useState } from 'react';
import axios from 'axios';

import styles from '../styles/register.module.css';
import CustomToast from '../components/Toast';

const register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [ok, setOk] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/auth/register',
        {
          name,
          email,
          password,
          secret,
        }
      );

      setResponseMessage(data.message);
      console.log(data);
      setOk(true);
    } catch (err) {
      setOk(false);
      setResponseMessage(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <div className='py-5 bg-secondary text-light'>
        <h1 className='text-center'>Register</h1>
      </div>

      <div className={styles.container}>
        {responseMessage ? (
          <div className={styles.toastContainer}>
            <CustomToast
              message={responseMessage}
              variant={ok ? 'success' : 'danger'}
            />
          </div>
        ) : (
          <></>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter name'
            className='form-control'
            type='text'
          />

          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='example123@example.com'
            className='form-control'
            type='email'
          />

          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            className='form-control'
            type='password'
          />

          <label>Pick a question</label>
          <select className='form-control'>
            <option>What is your favourite color?</option>
            <option>Next Question</option>
          </select>
          <label>You can use this to reset your password if forgotten</label>

          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder='Write your answer here'
            className='form-control'
            type='text'
          />

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default register;
