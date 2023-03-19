import React from 'react';
import Alert from '@mui/material/Alert';
import { notification } from 'antd';

const AlertMessage = (message, type, title = 'Hooray! 🚀') => {
  title = type === 'error' ? 'Oops 😓' : 'Hooray! 🚀';
  console.log(message, type);
  notification[type]({
    message: title,
    description: message
  });
};

export default AlertMessage;
