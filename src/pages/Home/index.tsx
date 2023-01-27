import { PageArea, SearchArea } from './styles';
import { PageContainer } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { useApi } from '../../helpers/useApi';
import { Link } from 'react-router-dom';
import { StateType } from '../../types/StateType';
import { CategoryType } from '../../types/CategoryType';
import { AdItem } from '../../components/AdItem';
import { AdThumbType } from '../../types/AdThumbType';

const Home = () => {
    const api = useApi();

    const [stateList, setStateList] = useState<StateType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [adList, setAdList] = useState<AdThumbType[]>([]);

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
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: '8'
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method='GET' action='/ad/ads'>
                            <input type= 'text' name='q' placeholder='O que você procura?'></input>
                            <select name='state'>
                                <option></option>
                                {stateList.map((i, index) =>
                                    <option key={index} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className='categoryList'>
                        {categories.map((i, index) => 
                            <Link key={index} to={`/ad/ads?cat=${i._doc.slug}`} className='categoryItem'>
                                <img src={i.img} alt='' />
                                <span>{i._doc.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className='list'>
                        {adList.map((i, index) =>
                            <AdItem key={index} data={i} />
                        )}
                    </div>
                    <div className='seeAll'>
                        <Link to="/ad/ads" className='seeAllLink' >
                            Ver todos
                        </Link>
                    </div>
                </PageArea>
            </PageContainer>
        </>        
    );
}

export default Home;