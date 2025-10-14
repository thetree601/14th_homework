"use client";

import React from 'react';
import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
      <div 
        className={styles.backgroundImage}
        style={{
          backgroundImage: 'url(/images/login.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
};

export default LoginPage;
