import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const Layout = () => {
    const { user, loading } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return null;
    }

    return (
        <div>
            <div className='min-h-screen bg-gray-50'>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;