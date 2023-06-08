import { HeaderArea } from './styled';
import { Link, useNavigate } from 'react-router-dom';
import { doLogout } from '../../helpers/AuthHandler';
import { useAppContext } from '../../context';
import { useEffect } from 'react';
import { useApi } from '../../helpers/useApi';
import Cookies from 'js-cookie';

const Header = () => {
    const api = useApi();
    const navigate = useNavigate();
    const { user, setUser, refreshUser } = useAppContext();

    useEffect(() => {
        const getUserInfo = async () => {
            const token = Cookies.get('token');
            if (token) {
                const userInfo = await api.getUserInfo();
                setUser({ name: userInfo.name, email: userInfo.email, state: userInfo.state });
            }
        }
        getUserInfo();
    }, [refreshUser]);

    const handleLogout = () => {
        doLogout();
        setUser(null);
        navigate('/');
    }

    return (
        <HeaderArea>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'>
                        <span className='logo-1'>O</span>
                        <span className='logo-2'>L</span>
                        <span className='logo-3'>X</span>                        
                    </Link>
                </div>
                <nav>
                    <ul>
                        {user &&
                            <>
                                <li>
                                    <Link to='/user/me'>Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to='/ad/add' className='button'>Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!user &&
                            <>
                                <li>
                                    <Link to='/user/signin'>Login</Link>
                                </li>
                                <li>
                                    <Link to='/user/signup'>Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to='/user/signin' className='button'>Poste um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;