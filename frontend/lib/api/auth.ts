import request from './client';

interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

export const register = (email: string, password: string) =>
    request<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

export const login = (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
