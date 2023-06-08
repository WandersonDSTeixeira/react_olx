import { UserAdsArea, UserInfoArea } from './styles';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import { useState, useEffect } from 'react';
import { useApi } from '../../helpers/useApi';
import { AdItem } from '../../components/AdItem';
import { UserAdsType } from '../../types/UserAdsType';
import { UserInfoModal } from '../../components/UserInfoModal';
import { UserAdsModal } from '../../components/UserAdsModal';
import { useAppContext } from '../../context';

const UserPage = () => {
    const api = useApi();
    const { user, setUser, refreshUser, setRefreshUser } = useAppContext();

    const [userAds, setUserAds] = useState<UserAdsType[]>([]);
    const [adIndex, setAdIndex] = useState<number>(9999);
    const [userInfoModalOpen, setUserInfoModalOpen] = useState<boolean>(false);
    const [userAdsModalOpen, setUserAdsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await api.getUserInfo();
            setUser({ name: userInfo.name, email: userInfo.email, state: userInfo.state });
            setUserAds(userInfo.ads);
        }
        getUserInfo();
    }, [refreshUser]);

    useEffect(() => {
        if (!userAdsModalOpen) {
            setAdIndex(9999);
            setRefreshUser(!refreshUser);
        }
    }, [userAdsModalOpen]);

    const handleEditButton = (index: number) => {
        let i = index;
        setAdIndex(i);
        setUserAdsModalOpen(true);
    }

    return (
        <>
            <UserInfoArea>
                <PageContainer>
                    <PageTitle>Minha conta</PageTitle>
                    <div className='userInfo'>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'>Nome:</div>
                            <div className='userInfoData'>{user?.name}</div>
                        </div>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'>Email:</div>
                            <div className='userInfoData'>{user?.email}</div>
                        </div>
                        <div className='userInfoBox'>
                            <div className='userInfoTitle'>Estado:</div>
                            <div className='userInfoData'>{user?.state}</div>
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
                            userInfoModalOpen={userInfoModalOpen}
                            setUserInfoModalOpen={setUserInfoModalOpen}
                        />
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
                        userAdsModalOpen={userAdsModalOpen}
                        setUserAdsModalOpen={setUserAdsModalOpen}
                        userAds={userAds}
                        adIndex={adIndex}
                    />
                </UserAdsArea>
            </PageContainer>
        </>        
    );
}

export default UserPage;