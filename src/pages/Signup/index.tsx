import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { useApi } from '../../helpers/useApi';
import { doLogin } from '../../helpers/AuthHandler';
import { StateType } from '../../types/StateType';

const Signup = () => {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stateList, setStateList] = useState<StateType[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getStates = async () => {
            const stList = await api.getStates();
            setStateList(stList);
        }
        getStates();
    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword) {
            setError('As senhas não batem!');
            setDisabled(false);
            return;
        }

        const json = await api.register(name, email, password, stateLoc);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                { error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className='areaTitle'>Nome Completo</div>
                        <div className='areaInput'>
                            <input
                                type='text'
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'>Estado</div>
                        <div className='areaInput'>
                            <select value={stateLoc} onChange={e => setStateLoc(e.target.value)} required>
                                <option></option>
                                {stateList.map((i, index)=>
                                    <option key={index} value={i.name}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
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
                        <div className='areaTitle'>Confirmar Senha</div>
                        <div className='areaInput'>
                            <input
                                type='password'
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'></div>
                        <div className='areaInput'>
                            <button disabled={ disabled }>Fazer Cadastro</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Signup;