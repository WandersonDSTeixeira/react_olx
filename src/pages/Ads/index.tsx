import { PageArea } from './styles';
import { PageContainer } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { useApi } from '../../helpers/useApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { StateType } from '../../types/StateType';
import { CategoryType } from '../../types/CategoryType';
import { AdItem } from '../../components/AdItem';
import { AdThumbType } from '../../types/AdThumbType';

let timer: NodeJS.Timeout;
const Ads = () => {
    const api = useApi();
    const navigate = useNavigate();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQueryString();

    const [q, setQ] = useState( query.get('q') ?? '' );
    const [cat, setCat] = useState( query.get('cat') ?? '' );
    const [state, setState] = useState( query.get('state') ?? '' );

    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState<StateType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [adList, setAdList] = useState<AdThumbType[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [loadingOpacity, setLoadingOpacity] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (adList.length > 0) {
            setPageCount( Math.ceil( adsTotal / adList.length ))
        }
    }, [adsTotal]);

    useEffect(() => {
        let queryString = [];
        if (q) queryString.push(`q=${q}`);
        if (cat) queryString.push(`cat=${cat}`);
        if (state) queryString.push(`state=${state}`);

        navigate({
            search: `?${queryString.join('&')}`
        });

        if (timer) clearTimeout(timer);
        timer = setTimeout(getAdsList, 2000);
        setLoadingOpacity(true);
        setCurrentPage(1);
    }, [q, cat, state]);

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
        setLoadingOpacity(true);
        getAdsList();
    }, [currentPage]);

    const getAdsList = async () => {
        setLoading(true);
        let offset = ((currentPage - 1) * 9).toString();

        const json = await api.getAds({
            sort: 'desc',
            limit: '9',
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setLoadingOpacity(false);
        setLoading(false);
    }

    const handleResetBtn = () => {
        setCat('');
        setState('');
        setQ('');
    }

    let pagination = [];
    for (let i = 1; i <= pageCount; i++) pagination.push(i);

    return (
        <PageContainer>
            <PageArea
                loadingOpacity={loadingOpacity}
            >
                <div className='leftSide'>
                    <form method='GET'>
                        <input
                            type='text'
                            name='q'
                            placeholder='O que você procura?'
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />
                        <div className='filterName'>Estado:</div>
                        <select
                            name='state'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        >
                            <option></option>
                            {stateList.map((i, index) =>
                                <option key={index} value={i.name}>{i.name}</option>
                            )}
                        </select>
                        <div className='filterName'>Categoria:</div>
                        <ul>
                            {categories.map((i, index) =>
                                <li
                                    key={index}
                                    className={cat === i._doc.slug ? 'categoryItem active' : 'categoryItem'}
                                    onClick={()=>setCat(i._doc.slug)}
                                >
                                    <img src={i.img} alt='' />
                                    <span>{i._doc.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                    <button className='resetBtn' onClick={handleResetBtn}>Limpar</button>      
                </div>
                <div className='rightSide'>
                    <h2>Resultados</h2>

                    {loading && adList.length === 0 &&
                        <div className='listWarning'>Carregando...</div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className='listWarning'>Nenhum resultado encontrado</div>
                    }
                    
                    <div className='list'>
                        {adList.map((i, index) =>
                            <AdItem key={index} data={i} />
                        )}
                    </div>
                    
                    <div className='pagination'>
                        {pagination.map((i, index) =>
                            <div
                                key={index}
                                onClick={() => setCurrentPage(i)}
                                className={i === currentPage ? 'pagItem active' : 'pagItem'}
                            >{i}</div>
                        )}
                    </div>
                </div>
            </PageArea>            
        </PageContainer>
    );
}

export default Ads;