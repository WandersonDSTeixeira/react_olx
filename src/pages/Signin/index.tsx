import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { ChangeEvent, useState } from 'react';
import { useApi } from '../../helpers/useApi';
import { doLogin } from '../../helpers/AuthHandler';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context';

const Signin = () => {
    const api = useApi();
    const navigate = useNavigate();
    const { refreshUser, setRefreshUser } = useAppContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            setRefreshUser(!refreshUser);
            navigate('/');
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                { error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='areaTitle'>Email</div>
                        <div className='areaInput'>
                            <input
                                type='e-mail'
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'>Senha</div>
                        <div className='areaInput'>
                            <input
                                type='password'
                                disabled={disabled}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'></div>
                        <div className='areaInput'>
                            <button disabled={ disabled }>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Signin;