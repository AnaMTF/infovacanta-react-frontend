import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/userSlice';
import { useEffect } from 'react';

export const GoogleAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('user');
        if (token) {
            dispatch(setUser(token));
            navigate('/');
        }
    }, [dispatch, location.search, navigate]);

    return <p>Vă rugăm așteptați...</p>;
};