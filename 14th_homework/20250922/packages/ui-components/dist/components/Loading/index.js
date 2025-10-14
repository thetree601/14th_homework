import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Loading({ size = 'medium', message = '로딩 중...' }) {
    return (_jsxs("div", { className: "loadingContainer", children: [_jsx("div", { className: `loadingSpinner ${size}` }), _jsx("div", { className: "loadingMessage", children: message })] }));
}
