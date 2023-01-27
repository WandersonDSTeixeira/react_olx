import { UserAdsArea, UserInfoArea } from './styles';
import { ErrorMessage, PageContainer, PageTitle } from '../../components/MainComponents';
import React, { useState, useEffect } from 'react';
import { useApi } from '../../helpers/useApi';
import { StateType } from '../../types/StateType';
import { CategoryType } from '../../types/CategoryType';
import { AdItem } from '../../components/AdItem';
import { UserAdsType } from '../../types/UserAdsType';
import { UserInfoModal } from '../../components/UserInfoModal';
import { UserAdsModal } from '../../components/UserAdsModal';
import MaskedInput from 'react-text-mask';
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask';
import { BACKENDPORT } from '../../routes/Routes';
import { SingleImgType } from '../../types/SingleImgType';

const UserPage = () => {
    const api = useApi();
    const fileField = React.createRef<HTMLInputElement>();
    const imgIndexes: number[] = []

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userState, setUserState] = useState('');
    const [stateList, setStateList] = useState<StateType[]>([]);
    const [name, setName] = useState(userName);
    const [email, setEmail] = useState('');
    const [state, setState] = useState(userState);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userAds, setUserAds] = useState<UserAdsType[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState<boolean>(false);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [status, setStatus] = useState<boolean>(true);
    const [adImages, setAdImages] = useState<SingleImgType[]>([]);
    const [adIndex, setAdIndex] = useState<number>(9999);

    const [userInfoModalOpen, setUserInfoModalOpen] = useState<boolean>(false);
    const [userAdsModalOpen, setUserAdsModalOpen] = useState<boolean>(false);
    const [confirmAdDelete, setConfirmAdDelete] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await api.getUserInfo();
            setUserName(userInfo.name);
            setUserEmail(userInfo.email);
            setUserState(userInfo.state);
            setUserAds(userInfo.ads);
        }
        getUserInfo();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            const stList = await api.getStates();
            setStateList(stList);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const updateModalInfo = (): void => {
            setName(userName);
            setState(userState);
        }
        updateModalInfo();
    }, [userName, userState]);

    useEffect(() => {
        if (!userAdsModalOpen) {
            setError('');
            setName(userName);
            setState(userState);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }, [userInfoModalOpen]);

    const handleUserCancel = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDisabled(true);
        setUserInfoModalOpen(false);
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

        const json = await api.editUserInfo(name, email, password, state);

        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/user/me';
        }
        setDisabled(false);
    }

    useEffect(() => {
        if (!userAdsModalOpen) {
            setAdIndex(9999);
            setConfirmAdDelete(false);
            setError('');
        }
    }, [userAdsModalOpen]);

    useEffect(() => {
        const handleAdsModalInfo = () => {
            setTitle(userAds[adIndex]?._doc.title);
            setPrice(userAds[adIndex]?._doc.price);
            setPriceNegotiable(userAds[adIndex]?._doc.priceNegotiable);
            setDescription(userAds[adIndex]?._doc.description);
            setStatus(userAds[adIndex]?._doc.status);
            setCategory(userAds[adIndex]?._doc.category);
            setCategoryName(userAds[adIndex]?._doc.categoryName);
            setCategoryValue(userAds[adIndex]?._doc.category);
            setAdImages(userAds[adIndex]?._doc.images);
            imgIndexes.length = 0;
        };
        handleAdsModalInfo();
    }, [adIndex]);

    const handleEditButton = (index: number) => {
        let i = index;
        setAdIndex(i);
        setUserAdsModalOpen(true);
    }
  
    const handleAdDeleteTry = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setConfirmAdDelete(!confirmAdDelete);
    }

    const handleAdDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        await api.deleteAd(userAds[adIndex]._doc._id);
        
        window.location.href = '/user/me';
        setDisabled(false);
    }

    const handleImageDelete = (e: React.MouseEvent<HTMLImageElement>, index: number) => {
        imgIndexes.push(index);
        const target = e.target as HTMLImageElement;
        target.style.border = '2px solid #F00';
    }

    const handleAdsCancel = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDisabled(true);
        setUserAdsModalOpen(false);
        setDisabled(false);
        setConfirmAdDelete(false);
    }

    const handleAdsSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const fData = new FormData();
        fData.append('title', title);
        fData.append('price', price);
        fData.append('priceneg', priceNegotiable.toString());
        fData.append('cat', category);
        fData.append('desc', description);
        fData.append('status', status.toString());

        const adImages2 = [...adImages]
        
        const uniqueIndexes: number[] = [];
        imgIndexes.forEach((u) => {
            if (!uniqueIndexes.includes(u)) {
                uniqueIndexes.push(u);
            }
        })

        uniqueIndexes.sort((a, b) => b - a);

        if (uniqueIndexes.length > 0) {
            for (let i of uniqueIndexes) {
                adImages2.splice(i, 1);
            }
        }
        if (adImages2.length > 0) {
            for (let i = 0; i < adImages2.length; i++){
                fData.append('images', adImages2[i].url.toString());
            }
        }
        
        if (fileField.current?.files) {
            if (fileField.current?.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }
        }      

        const json = await api.editAd(userAds[adIndex]._doc._id, fData);

        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = `/ad/${userAds[adIndex]._doc._id}`;
        }
        setDisabled(false);
    }

    const priceMask = CreateNumberMask({
        prefix: 'R$ ',
        includeThousandSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return (
        <>
            <UserInfoArea>
                <PageContainer>
                    <PageTitle>Minha conta</PageTitle>
                    <div className='userInfo'>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'>Nome:</div>
                            <div className='userInfoData'>{userName}</div>
                        </div>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'>Email:</div>
                            <div className='userInfoData'>{userEmail}</div>
                        </div>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'>Estado:</div>
                            <div className='userInfoData'>{userState}</div>
                        </div>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'></div>
                            <div className='userInfoData btn'>
                                <button
                                    className='userInfoBtn'
                                    onClick={() => setUserInfoModalOpen(true)}
                                >Editar</button>
                            </div>
                        </div>
                        
                        <UserInfoModal
                            open={userInfoModalOpen}
                            setOpen={setUserInfoModalOpen}
                        >
                            
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
                                            placeholder={`${userEmail} (email atual)`}
                                        />
                                    </div>
                                </label>
                                <label className='area'>
                                    <div className='areaTitle'>Estado</div>
                                    <div className='areaInput'>
                                        <select onChange={e => setState(e.target.value)}>
                                            <option>{userState}</option>
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
                        </UserInfoModal>
                    </div>
                </PageContainer>
            </UserInfoArea>
            <PageContainer>
                <UserAdsArea>
                    <h2>Meus Anúncios</h2>
                    {userAds.length === 0 &&
                        <div>Você ainda não tem anúncios.</div>
                    }
                    <div className='list'>
                        {userAds.map((i, index) =>
                            <div key={index} className='adBox'>
                                <button className='button' onClick={() => handleEditButton(index)}>Editar</button>
                                <AdItem data={i._doc} img={i.image}/>
                            </div>
                        )}
                    </div>

                    <UserAdsModal
                        open={userAdsModalOpen}
                        setOpen={setUserAdsModalOpen}
                        confirmDeletion={confirmAdDelete}
                    >
                        <form onSubmit={handleAdsSubmit}>
                            { error &&
                                <ErrorMessage>{error}</ErrorMessage>
                            }
                            <label className='area'>
                                <div className='areaTitle'>Título</div>
                                <div className='areaInput'>
                                    <input
                                        type='text'
                                        disabled={disabled}
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>Categoria</div>
                                <div className='areaInput'>
                                    <select
                                        disabled={disabled}
                                        onChange={e => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value={categoryValue}>{categoryName}</option>
                                        {categories.map((i, index) =>
                                            <option key={index} value={i._doc.slug}>{i._doc.name}</option>
                                        )}
                                    </select>
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>Preço</div>
                                <div className='areaInput'>
                                    <MaskedInput
                                        mask={priceMask}
                                        placeholder='R$'
                                        disabled={disabled || priceNegotiable}
                                        value={price}
                                        onChange={e=>setPrice(e.target.value)}
                                        required={!priceNegotiable}
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>Preço Negociável</div>
                                <div className='areaInput'>
                                    <input
                                        type='checkbox'
                                        disabled={disabled}
                                        checked={priceNegotiable}
                                        onChange={e => setPriceNegotiable(!priceNegotiable)}
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>Descrição</div>
                                <div className='areaInput'>
                                    <textarea
                                        disabled={disabled}
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>Remover Imagens</div>
                                <div className='areaInput'>
                                    {adImages?.map((i, index) =>
                                        <img
                                            key={index}
                                            src={`${BACKENDPORT}/media/${i.url}`}
                                            alt=''
                                            onClick={e => handleImageDelete(e, index)}
                                        />
                                    )}
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaImgTitle'>
                                    <div className='areaTitle areaImgTitle1 '>Adicionar Imagem</div>
                                    <div className='areaTitle areaImgTitle2'>(até 10)</div>
                                </div>
                                <div className='areaInput'>
                                    <input
                                        type='file'
                                        disabled={disabled}
                                        multiple
                                        ref={fileField}
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>Ativo</div>
                                <div className='areaInput'>
                                    <input
                                        type='checkbox'
                                        disabled={disabled}
                                        checked={status}
                                        onChange={e => setStatus(!status)}
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='areaTitle'>
                                        <div className='cancelBtn' onClick={handleAdsCancel}>Cancelar</div>
                                </div>
                                <div className='areaInput'>
                                    <div className='areaBtn'>
                                        <button disabled={disabled} className='editBtn'>Enviar</button>
                                        <button
                                            disabled={disabled}
                                            className='deleteBtn'
                                            onClick={handleAdDeleteTry}
                                        >Excluir</button>
                                        <button
                                            disabled={disabled}
                                            className='confirmDelBtn'
                                            onClick={handleAdDelete}
                                        >Quero excluir</button>
                                        <button
                                            disabled={disabled}
                                            className='cancelDelBtn'
                                            onClick={handleAdDeleteTry}
                                        >Não quero excluir</button>
                                    </div>
                                </div>
                            </label>
                        </form>
                    </UserAdsModal>
                </UserAdsArea>
            </PageContainer>
        </>        
    );
}

export default UserPage;