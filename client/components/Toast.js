import React from 'react';
import { Toast } from 'react-bootstrap';

const CustomToast = ({ message, variant }) => {
  return (
    <Toast bg={variant.toLowerCase()} style={{ width: '100%' }}>
      <Toast.Body className={variant === 'Dark' && 'text-white'}>
        {message}
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
