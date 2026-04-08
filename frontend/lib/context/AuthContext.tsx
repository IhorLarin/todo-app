'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { login as loginApi, register as registerApi } from '../api/auth';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const getUserFromCookie = (): User | null => {
    if (typeof window === 'undefined') return null;
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(c => c.trim().startsWith('user='));
    if (!userCookie) return null;
    try {
        return JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
    } catch {
        return null;
    }
};

const setTokenCookie = (token: string) => {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
};

const setUserCookie = (user: User) => {
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${7 * 24 * 60 * 60}`;
};

const removeTokenCookie = () => {
    document.cookie = 'token=; path=/; max-age=0';
};

const removeUserCookie = () => {
    document.cookie = 'user=; path=/; max-age=0';
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => getUserFromCookie());

    const login = async (email: string, password: string) => {
        const data = await loginApi(email, password);
        setTokenCookie(data.token);
        setUserCookie(data.user);
        setUser(data.user);
    };

    const register = async (email: string, password: string) => {
        const data = await registerApi(email, password);
        setTokenCookie(data.token);
        setUserCookie(data.user);
        setUser(data.user);
    };

    const logout = () => {
        removeTokenCookie();
        removeUserCookie();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
