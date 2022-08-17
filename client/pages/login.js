import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { Spinner } from 'react-bootstrap';
import styles from '../styles/register.module.css';
import CustomToast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [ok, setOk] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email,
          password,
        }
      );

      // Redirect to Home Page.

      setOk(true);
      setLoading(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setOk(false);
      setLoading(false);
      setResponseMessage(err.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.bg_image}>
        <h1 className='text-light'>Login</h1>
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

          <button
            type='submit'
            className='btn btn-primary'
            disabled={!password || !email}
          >
            {loading ? (
              <Spinner animation='border' size='sm' variant='info' />
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
