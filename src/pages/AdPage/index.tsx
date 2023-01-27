import { BreadCrumb, Fake, OthersArea, PageArea } from './styles';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '../../helpers/useApi';
import { PageContainer } from '../../components/MainComponents';
import { AdType } from '../../types/AdType';
import { Slide } from 'react-slideshow-image';
import "react-slideshow-image/dist/styles.css";
import { AdItem } from '../../components/AdItem';

const AdPage = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<AdType>();

    useEffect(() => {
        const getAdInfo = async (id: string) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id as string);
    }, []);

    const formatDate = (date: string) => {
        const cDate = new Date(date);

        const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        const cDay = cDate.getDate();
        const cMonth = cDate.getMonth();
        const cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    const formatPrice = (price: number) => (
        price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
    }));

    return (
        <PageContainer>
            <BreadCrumb>
                Você está aqui:
                <Link to={'/'}>Home</Link>
                /
                <Link to={`/ad/ads?state=${adInfo?.stateName.name}`}>{adInfo?.stateName.name}</Link>
                /
                <Link to={`/ad/ads?state=${adInfo?.stateName.name}&cat=${adInfo?.category.slug}`}>{adInfo?.category.name}</Link>
                / {adInfo?.title}
            </BreadCrumb>
            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImage'>
                            {loading && <Fake height={300} />}
                            {adInfo?.images &&
                                <Slide>
                                    {adInfo.images.map((img, index) =>
                                        <div key={index} className='eachSlide'>
                                            <img src={img} alt='' />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20} />}
                                {adInfo?.title && 
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo?.dateCreated && 
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100} />}
                                {adInfo?.description}
                                <hr />
                                {adInfo?.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box boxPadding'>
                        {loading && <Fake height={20} />}
                        {adInfo?.priceNegotiable &&
                            'Preço Negociável'
                        }
                        {!adInfo?.priceNegotiable && adInfo?.price &&
                            <div className='price'>Preço: <span>{formatPrice(adInfo.price)}</span></div>
                        }
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo?.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className='contactSellerLink'>
                                Fale com o vendedor
                            </a>
                            <div className='createdBy box boxPadding'>
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>Email: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName.name}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adInfo?.others && adInfo?.others.length > 0 &&
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className='list'>
                        {adInfo.others.map((i, index) =>
                            <AdItem key={index} data={i} />
                        )}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>
    );
}

export default AdPage;