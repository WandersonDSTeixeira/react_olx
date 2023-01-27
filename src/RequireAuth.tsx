import { Navigate } from 'react-router-dom';
import { isLogged } from './helpers/AuthHandler';

type Props = {
    children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
    const logged = isLogged();
    if (!logged) return <Navigate to='/user/signin' />;
    return children;
}