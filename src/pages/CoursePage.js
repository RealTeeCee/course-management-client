import React from 'react';
import { HeadingH1Com } from '../components/heading';
import LayoutHome from '../layouts/LayoutHome';
import { formatNumber } from '../utils/helper';
const CoursePage = () => {
    return (
        <LayoutHome>
            <HeadingH1Com number={formatNumber(190298)}>My Courses</HeadingH1Com>
        </LayoutHome>
    );
};

export default CoursePage;