import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/userSlice';
import { useEffect } from 'react';

export const GoogleAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('location: ', location);
        console.log('location.search: ', location.search);

        const query = new URLSearchParams(location.search);
        console.log('query: ', query);

        const token = query.get('user');
        console.log('query.get(\'user\') -> token: ', token);

        const user = JSON.parse(token);
        console.log(user);

        if (user) {
            dispatch(setUser(user));
            navigate('/');
        }
    }, [dispatch, location.search, navigate]);

    return <p>Vă rugăm așteptați...</p>;
};