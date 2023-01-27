import Cookies from 'js-cookie';
import qs from 'qs';
import { AdFiltersType } from '../types/AdFiltersType';
import { BACKENDPORT } from '../routes/Routes';

export const useApi = () => ({
    login: async (email: string, password: string) => {
        const token = Cookies.get('token');
        const res = await fetch(`${BACKENDPORT}/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await res.json();    
        return json;
    },
    register: async (name: string, email: string, password: string, state: string) => {
        const token = Cookies.get('token');
        const res = await fetch(`${BACKENDPORT}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, state })
        });
        const json = await res.json();    
        return json;
    },
    getStates: async () => {
        const res = await fetch(`${BACKENDPORT}/states`);
        const json = await res.json();
        return json.states;
    },
    getCategories: async () => {
        const res = await fetch(`${BACKENDPORT}/categories`);
        const json = await res.json();
        return json.categories;
    },
    getAds: async (options: AdFiltersType) => {
        const res = await fetch(`${BACKENDPORT}/ad/ads?${qs.stringify(options)}`);
        const json = await res.json();
        return json;
    },
    getAd: async (id: string, other = false) => {
        const res = await fetch(`${BACKENDPORT}/ad/${id}?${qs.stringify(other)}`);
        const json = await res.json();
        return json;
    },
    addAd: async (fData: FormData) => {
        const token = Cookies.get('token');
        const res = await fetch(`${BACKENDPORT}/ad/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: fData
        });
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/user/signin';
            return;
        }
        return json;
    },
    getUserInfo: async () => {
        const token = Cookies.get('token');
        const res = await fetch(`${BACKENDPORT}/user/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/user/signin';
            return;
        }
        return json;
    },
    editUserInfo: async (name: string, email: string, password: string, state: string) => {
        const token = Cookies.get('token');
        if (!email && !password) {
            const res = await fetch(`${BACKENDPORT}/user/me?${qs.stringify({ state, name })}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await res.json();

            if (json.notallowed) {
                window.location.href = '/user/signin';
                return;
            }
            return json;
        }
        if (email && !password) {
            const res = await fetch(`${BACKENDPORT}/user/me?${qs.stringify({ state, name, email })}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await res.json();

            if (json.notallowed) {
                window.location.href = '/user/signin';
                return;
            }
            return json;
        }
        if (!email && password) {
            const res = await fetch(`${BACKENDPORT}/user/me?${qs.stringify({ state, name, password })}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await res.json();

            if (json.notallowed) {
                window.location.href = '/user/signin';
                return;
            }
            return json;
        }
        if (email && password) {
            const res = await fetch(`${BACKENDPORT}/user/me?${qs.stringify({ name, state, email, password })}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await res.json();

            if (json.notallowed) {
                window.location.href = '/user/signin';
                return;
            }
            return json;
        }
    },
    deleteAd: async (id: string) => {
        const token = Cookies.get('token');
        return await fetch(`${BACKENDPORT}/ad/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    editAd: async (id: string, fData: FormData) => {
        const token = Cookies.get('token');
        const res = await fetch(`${BACKENDPORT}/ad/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: fData
        });
        const json = await res.json();

        if (json.notallowed) {
            window.location.href = '/user/signin';
            return;
        }
        return json;
    }
});