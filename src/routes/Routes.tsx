import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import AdPage from '../pages/AdPage';
import AddAd from '../pages/AddAd';
import Ads from '../pages/Ads';
import UserPage from '../pages/UserPage';
import { RequireAuth } from '../RequireAuth';

export const BACKENDPORT = 'http://localhost:3001';

export default () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/signin' element={<Signin />} />
            <Route path='/user/signup' element={<Signup />} />
            <Route path='/user/me' element={<RequireAuth><UserPage /></RequireAuth>} />
            <Route path='/ad/add' element={<RequireAuth><AddAd /></RequireAuth>} />
            <Route path='/ad/ads' element={<Ads />} />
            <Route path='/ad/:id' element={<AdPage />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}