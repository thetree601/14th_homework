import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import styles from './Input.module.css';
const Input = forwardRef(({ type = 'text', placeholder, value, defaultValue, disabled = false, required = false, error = false, errorMessage, label, size = 'medium', fullWidth = false, className = '', inputClassName = '', onChange, onBlur, onFocus, onKeyDown, onKeyUp, onPressEnter, name, id, autoComplete, maxLength, minLength, pattern, readOnly = false, ...props }, ref) => {
    const handleKeyDown = (e) => {
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
    return (_jsxs("div", { className: containerClasses, children: [label && (_jsxs("label", { htmlFor: id, className: styles.label, children: [label, required && _jsx("span", { className: styles.required, children: "*" })] })), _jsx("input", { ref: ref, type: type, id: id, name: name, placeholder: placeholder, value: value, defaultValue: defaultValue, disabled: disabled, required: required, readOnly: readOnly, autoComplete: autoComplete, maxLength: maxLength, minLength: minLength, pattern: pattern, className: inputClasses, onChange: onChange, onBlur: onBlur, onFocus: onFocus, onKeyDown: handleKeyDown, onKeyUp: onKeyUp, ...props }), error && errorMessage && (_jsx("div", { className: styles.errorMessage, children: errorMessage }))] }));
});
Input.displayName = 'Input';
export default Input;
