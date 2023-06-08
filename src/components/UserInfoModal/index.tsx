import React, { useEffect, useState } from 'react';
import { ModalArea } from './styled';
import { useAppContext } from '../../context';
import { StateType } from '../../types/StateType';
import { useApi } from '../../helpers/useApi';
import { ErrorMessage } from '../MainComponents';

type Props = {
    userInfoModalOpen: boolean;
    setUserInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserInfoModal = (props: Props) => {
    const api = useApi();
    const { user, setUser, refreshUser, setRefreshUser } = useAppContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stateList, setStateList] = useState<StateType[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await api.getUserInfo();
            setUser({ name: userInfo.name, email: userInfo.email, state: userInfo.state });
            setName(user?.name as string);
            setState(user?.state as string);
        }
        getUserInfo();
    }, [refreshUser]);
    
    useEffect(() => {
        const getStates = async () => {
            const stList = await api.getStates();
            setStateList(stList);
        }
        getStates();
    }, []);

    useEffect(() => {
        if (!props.userInfoModalOpen) {
            setError('');
            setName(user?.name as string);
            setState(user?.state as string);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }, [props.userInfoModalOpen]);

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains('modalBg')) {
            props.setUserInfoModalOpen(false);
        }
    }

    const handleUserCancel = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDisabled(true);
        props.setUserInfoModalOpen(false);
        setDisabled(false);
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if(password !== confirmPassword) {
            setError('As senhas não batem!');
            setDisabled(false);
            return;
        }

        const json = await api.editUserInfo(name as string, email, password, state as string);

        if (json.error) {
            setError(json.error);
        } else {
            setUser({ name, email, state });
            setRefreshUser(!refreshUser);
            props.setUserInfoModalOpen(false);
        }
        setDisabled(false);
    }


    return (
        <ModalArea
            open={props.userInfoModalOpen ?? false}
            onClick={handleModalClick}
            className='modalBg'
        >
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    { error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }
                    <label className='area'>
                        <div className='areaTitle'>Nome Completo</div>
                        <div className='areaInput'>
                            <input
                                type='text'
                                disabled={disabled}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
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
                                placeholder={`${user?.email} (email atual)`}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'>Estado</div>
                        <div className='areaInput'>
                            <select onChange={e => setState(e.target.value)}>
                                <option>{user?.state}</option>
                                {stateList.map((i, index)=>
                                    <option key={index} value={i.name}>{i.name}</option>
                                )}
                            </select>
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
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'>
                            <div className='cancelBtn' onClick={handleUserCancel}>Cancelar</div>
                        </div>
                        <div className='areaInput'>
                            <button disabled={disabled}>Enviar</button>
                        </div>
                    </label>
                </form>
            </div>
        </ModalArea>
    );
}