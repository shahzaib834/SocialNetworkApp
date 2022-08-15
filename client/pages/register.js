import React from 'react';
import styles from '../styles/register.module.css';

const register = () => {
  return (
    <>
      <div className='row py-5 bg-secondary text-light'>
        <h1 className='col text-center'>Register</h1>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <label>Your name</label>
          <input
            placeholder='Enter name'
            className='form-control'
            type='text'
          />

          <label>Email Address</label>
          <input
            placeholder='example123@example.com'
            className='form-control'
            type='email'
          />

          <label>Password</label>
          <input
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
            placeholder='Write your answer here'
            className='form-control'
            type='password'
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
