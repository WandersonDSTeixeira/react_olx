import React from 'react';
import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../helpers/useApi';
import MaskedInput from 'react-text-mask';
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask';
import { CategoriesType } from '../../types/CategoriesType';

const AddAd = () => {
    const api = useApi();
    const fileField = React.createRef<HTMLInputElement>();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [description, setDescription] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        
        const fData = new FormData();
        fData.append('title', title);
        fData.append('price', price);
        fData.append('priceneg', priceNegotiable.toString());
        fData.append('cat', category);
        fData.append('desc', description);

        if (fileField.current?.files) {
            if (fileField.current?.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++){
                    fData.append('img', fileField.current.files[i]);
                }
            }
        }      

        const json = await api.addAd(fData);
        if (!json.error) {
            return navigate(`/ad/${json._id}`);
        } else {
            setError(json.error);
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
        <PageContainer>
            <PageTitle>Poste um anúncio</PageTitle>
            <PageArea>
                { error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
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
                                <option></option>
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
                        <div className='areaTitle'>Imagens (até 10)</div>
                        <div className='areaInput'>
                            <input
                                type='file'
                                disabled={disabled}
                                multiple
                                ref={fileField}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='areaTitle'></div>
                        <div className='areaInput'>
                            <button disabled={ disabled }>Adicionar anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default AddAd;