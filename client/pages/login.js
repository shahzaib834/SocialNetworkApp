import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authReducer';

import { Spinner } from 'react-bootstrap';
import styles from '../styles/register.module.css';
import CustomToast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, loading, error, user } = useSelector(
    (state) => state.auth
  );

  // Hooks
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    dispatch(login(formData));

    // Redirect to Home Page.
    if (isAuthenticated) {
      setEmail('');
      setPassword('');
      router.push('/');
    }
  };

  return (
    <>
      <div className={styles.bg_image}>
        <h1 className='text-light'>Login</h1>
      </div>

      <div className={styles.container}>
        {error ? (
          <div className={styles.toastContainer}>
            <CustomToast message={error} variant='danger' />
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
