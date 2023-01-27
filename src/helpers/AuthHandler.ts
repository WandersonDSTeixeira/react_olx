import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

export const doLogin = (token: string, rememberPassword: boolean = false ) => {
    Cookies.set('token', token);
}

export const doLogout = () => {
    Cookies.remove('token');
}