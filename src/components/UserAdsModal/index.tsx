import { useNavigate } from 'react-router-dom';
import { ModalArea } from './styled';
import { useApi } from '../../helpers/useApi';
import React, { useEffect, useState } from 'react';
import { UserAdsType } from '../../types/UserAdsType';
import { CategoryType } from '../../types/CategoryType';
import { SingleImgType } from '../../types/SingleImgType';
import { ErrorMessage } from '../MainComponents';
import MaskedInput from 'react-text-mask';
import { BACKENDPORT } from '../../routes/Routes';
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask';

type Props = {
    userAdsModalOpen: boolean;
    setUserAdsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userAds: UserAdsType[];
    adIndex: number;
}

export const UserAdsModal = (props: Props) => {
    const api = useApi();
    const navigate = useNavigate();
    const fileField = React.createRef<HTMLInputElement>();
    const imgIndexes: number[] = []

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
    const [confirmAdDelete, setConfirmAdDelete] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        if (!props.userAdsModalOpen) {
            setError('');
            setConfirmAdDelete(false);
        }
    }, [props.userAdsModalOpen]);

    useEffect(() => {
        setTitle(props.userAds[props.adIndex]?._doc.title);
        setPrice(props.userAds[props.adIndex]?._doc.price);
        setPriceNegotiable(props.userAds[props.adIndex]?._doc.priceNegotiable);
        setDescription(props.userAds[props.adIndex]?._doc.description);
        setStatus(props.userAds[props.adIndex]?._doc.status);
        setCategory(props.userAds[props.adIndex]?._doc.category);
        setCategoryName(props.userAds[props.adIndex]?._doc.categoryName);
        setCategoryValue(props.userAds[props.adIndex]?._doc.category);
        setAdImages(props.userAds[props.adIndex]?._doc.images);
        imgIndexes.length = 0;
    }, [props.adIndex]);

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains('modalBg')) {
            props.setUserAdsModalOpen(false);
        }
    }

    const handleAdsCancel = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDisabled(true);
        props.setUserAdsModalOpen(false);
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

        imgIndexes.sort((a, b) => b - a);

        if (imgIndexes.length > 0) {
            for (let i of imgIndexes) {
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

        const json = await api.editAd(props.userAds[props.adIndex]._doc._id, fData);

        if (json.error) {
            setError(json.error);
        } else {
            navigate(`/ad/${props.userAds[props.adIndex]._doc._id}`);
        }
        setDisabled(false);
    }

    const handleImageDelete = (e: React.MouseEvent<HTMLImageElement>, index: number) => {
        const target = e.target as HTMLImageElement;

        if (imgIndexes.includes(index)) {
            target.style.border = '0';
            const imgIndex = imgIndexes.findIndex(n => n === index);
            imgIndexes.splice(imgIndex, 1);
            return;
        }
        
        imgIndexes.push(index);
        target.style.border = '2px solid #F00';
    }

    const handleAdDeleteTry = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setConfirmAdDelete(!confirmAdDelete);
    }

    const handleAdDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        await api.deleteAd(props.userAds[props.adIndex]._doc._id);
        
        props.setUserAdsModalOpen(false);
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
        <ModalArea
            userAdsModalOpen={props.userAdsModalOpen ?? false}
            onClick={handleModalClick}
            className='modalBg'
            confirmAdDelete={confirmAdDelete ?? false}
        >
            <div className='container'>
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
            </div>
        </ModalArea>
    );
}