import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/userSlice';
import { useEffect } from 'react';

export const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('user');
    const user = JSON.parse(token);

    if (user) {
      dispatch(setUser(user));
      navigate('/');
    }
  }, [dispatch, location.search, navigate]);

  return <p>Vă rugăm așteptați...</p>;
};