import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeadingH1Com } from '../../components/heading';
import LayoutHome from '../../layouts/LayoutHome';

const AdminPage = () => {
    return (
        <LayoutHome>
            <HeadingH1Com>Admin Page</HeadingH1Com>

            <NavLink to="/admin/create-course">
                Create Course
            </NavLink>
        </LayoutHome>
    );
};

export default AdminPage;