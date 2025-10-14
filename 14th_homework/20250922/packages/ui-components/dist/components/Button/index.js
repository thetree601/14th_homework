import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Button.module.css';
const Button = ({ children, variant = 'primary', size = 'medium', disabled = false, loading = false, fullWidth = false, type = 'button', onClick, className = '', }) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        disabled || loading ? styles.disabled : '',
        className,
    ].filter(Boolean).join(' ');
    return (_jsxs("button", { type: type, className: buttonClasses, disabled: disabled || loading, onClick: onClick, children: [loading && _jsx("span", { className: styles.spinner }), _jsx("span", { className: loading ? styles.loadingText : '', children: children })] }));
};
export default Button;
