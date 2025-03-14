// Funciones auxiliares (guardar token)

export function saveToken(token) {
    localStorage.setItem('auth_token', token);
}

export function getToken() {
    return localStorage.getItem('auth_token');
}

export function removeToken() {
    return localStorage.removeItem('auth_token');
}