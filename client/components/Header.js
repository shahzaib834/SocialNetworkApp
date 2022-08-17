import React from 'react';

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg bg-dark navbar-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand'>Brand Name</a>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div id='navbarSupportedContent' className='collapse navbar-collapse'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  Cart
                </a>
              </li>

              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
