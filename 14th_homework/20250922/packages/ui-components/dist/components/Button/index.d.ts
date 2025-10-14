import React from 'react';
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
declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=index.d.ts.map