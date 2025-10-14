"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
export default function Navigation({ isLoggedIn = false, user, onLogin, onLogout }) {
    return (_jsxs("header", { className: "header", children: [_jsxs("div", { className: "header-logo-and-nav", children: [_jsx(Image, { src: "/images/logo_area.png", alt: "Triptalk Logo", width: 70, height: 40, className: "header-logo" }), _jsxs("nav", { className: "header-nav", children: [_jsx("a", { href: "#", children: "\uD2B8\uB9BD\uD1A0\uD06C" }), _jsx("a", { href: "#", children: "\uC219\uBC15\uAD8C \uAD6C\uB9E4" }), _jsx("a", { href: "#", children: "\uB9C8\uC774 \uD398\uC774\uC9C0" })] })] }), isLoggedIn ? (
            // 로그인 상태: 프로필 사진 표시
            _jsx("div", { className: "user-profile", children: _jsx(Image, { src: user?.picture || "/images/profile_basic.png", alt: "User Profile", width: 36, height: 36, className: "user-avatar", onClick: onLogout }) })) : (
            // 로그아웃 상태: 로그인 버튼 표시
            _jsx("div", { className: "login-section", children: _jsxs(Link, { href: "/auth/login", className: "login-button", onClick: onLogin, children: ["\uB85C\uADF8\uC778", _jsx("span", { className: "login-arrow", children: "\u2192" })] }) }))] }));
}
