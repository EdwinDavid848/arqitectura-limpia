// Funciones auxiliares (guardar token)

export function saveToken(token) {
    localStorage.setItem('auth_token', token);
}

export function getToken() {
    return localStorage.getItem('auth_token');
}

export function removeToken() {
    console.log("Se está ejecutando removeToken() inesperadamente");
    localStorage.removeItem('auth_token');

}


export function saveEmail(email){
    localStorage.setItem("user_email", email); 
}

export function getEmail(){
    return localStorage.getItem('user_email')
}

export function removeEmail(){
    console.log("Se está ejecutando removeEmail() inesperadamente");
    localStorage.removeItem('user_email');
}