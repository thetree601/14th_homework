import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
  name?: string;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  readOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  label,
  size = 'medium',
  fullWidth = false,
  className = '',
  inputClassName = '',
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onPressEnter,
  name,
  id,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  readOnly = false,
  ...props
}, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const containerClasses = [
    styles.inputContainer,
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.input,
    styles[size],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    inputClassName,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        className={inputClasses}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        onKeyUp={onKeyUp}
        {...props}
      />
      {error && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
