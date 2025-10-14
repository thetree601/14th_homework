"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { graphql } from '@/commons/graphql/gql';
import { authManager } from '@/lib/auth';
import styles from './LoginForm.module.css';

// GraphQL mutation 정의
const LOGIN_USER = graphql(`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`);

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const validateForm = () => {
    let isValid = true;
    
    // 이메일 유효성 검사
    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요');
      isValid = false;
    } else {
      setEmailError('');
    }

    // 비밀번호 유효성 검사
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginUser({
        variables: {
          email: email.trim(),
          password: password.trim()
        }
      });

      if (result.data?.loginUser?.accessToken) {
        const token = result.data.loginUser.accessToken;
        
        // JWT 토큰을 authManager에 저장 (메모리와 쿠키에 자동 저장)
        authManager.setToken(token);
        
        // 게시글 목록 페이지로 이동
        router.push('/boards');
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      // 에러 메시지 표시 (실제 에러 메시지에 따라 조정)
      if (error.message.includes('이메일')) {
        setEmailError('이메일을 확인해주세요');
      } else if (error.message.includes('비밀번호')) {
        setPasswordError('비밀번호를 확인해주세요');
      } else {
        setEmailError('로그인에 실패했습니다');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    router.push('/auth/signup');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.logo}>
          <img src="/images/logo_area.png" alt="TRIP TRIP" className={styles.logoImage} />
        </div>
        
        <div className={styles.welcomeText}>
          트립트립에 오신걸 환영합니다.
        </div>
        
        <div className={styles.loginInstruction}>
          트립트립에 로그인 하세요.
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요."
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              disabled={isLoading}
            />
            {emailError && <div className={styles.errorMessage}>{emailError}</div>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요."
              className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
              disabled={isLoading}
            />
            {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleSignUpClick}
          className={styles.signUpButton}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
