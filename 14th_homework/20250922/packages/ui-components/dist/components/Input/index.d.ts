import React from 'react';
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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
//# sourceMappingURL=index.d.ts.map