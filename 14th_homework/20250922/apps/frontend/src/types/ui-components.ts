// 공통 타입 정의

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
