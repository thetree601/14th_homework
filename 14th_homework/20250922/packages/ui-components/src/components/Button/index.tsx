import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled || loading ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <span className={styles.spinner} />}
      <span className={loading ? styles.loadingText : ''}>{children}</span>
    </button>
  );
};

export default Button;
