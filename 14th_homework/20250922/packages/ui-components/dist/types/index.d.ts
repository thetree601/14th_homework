export interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onChangePage: (page: number) => void;
}
export interface NavigationProps {
    isLoggedIn?: boolean;
    user?: {
        picture?: string;
        name?: string;
    };
    onLogin?: () => void;
    onLogout?: () => void;
}
export interface BannerProps {
    images?: Array<{
        src: string;
        alt: string;
    }>;
    autoplay?: boolean;
    autoplayDelay?: number;
}
export interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}
export interface ErrorProps {
    message?: string;
    onRetry?: () => void;
}
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
//# sourceMappingURL=index.d.ts.map