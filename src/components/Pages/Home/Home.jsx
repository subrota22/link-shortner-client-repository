import React from 'react';
import FirstHomeSection from './FirstHomeSection/FirstHomeSection';
import { Helmet } from "react-helmet";
const Home = () => {
    return (
        <>
            <Helmet><title>Home page</title></Helmet>
            <FirstHomeSection></FirstHomeSection>
        </>
    );
};

export default Home;