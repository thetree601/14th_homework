"use client";

import React from 'react';
import SignupForm from './SignupForm';
import styles from './SignupPage.module.css';

const SignupPage: React.FC = () => {
  return (
    <div className={styles.signupPage}>
      <SignupForm />
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

export default SignupPage;
