import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeadingH1Com } from '../../components/heading';

const AdminPage = () => {
    return (
        <>
            <HeadingH1Com>Admin Page</HeadingH1Com>

            <NavLink to="/admin/create-course">
                Create Course
            </NavLink>
        </>
    );
};

export default AdminPage;