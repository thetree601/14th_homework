import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorOutline } from "@mui/icons-material";
export default function Error({ message = '오류가 발생했습니다.', onRetry }) {
    return (_jsxs("div", { className: "errorContainer", children: [_jsx(ErrorOutline, { className: "errorIcon" }), _jsx("div", { className: "errorMessage", children: message }), onRetry && (_jsx("button", { className: "retryButton", onClick: onRetry, children: "\uB2E4\uC2DC \uC2DC\uB3C4" }))] }));
}
