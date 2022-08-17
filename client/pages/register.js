import React, { useState } from 'react';
import axios from 'axios';

import { Spinner, Image } from 'react-bootstrap';
import styles from '../styles/register.module.css';
import CustomToast from '../components/Toast';

const register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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
      setOk(true);

      setLoading(false);
      setName('');
      setEmail('');
      setPassword('');
      setSecret('');
    } catch (err) {
      setOk(false);
      setLoading(false);
      setResponseMessage(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.bg_image}>
        <h1 className='text-light'>Register</h1>
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

          <button
            type='submit'
            className='btn btn-primary'
            disabled={!name || !password || !secret || !email}
          >
            {loading ? (
              <Spinner animation='border' size='sm' variant='info' />
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default register;
