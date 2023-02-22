import React, { useContext } from 'react';
import FirstHomeSection from './FirstHomeSection/FirstHomeSection';
import { Helmet } from "react-helmet";
import SecondHomeSection from './SecondHomeSection/SecondHomeSection';
import { AuthProvider } from '../../../UserContext/UserContext';
const Home = () => {
const {user} = useContext(AuthProvider) ;
    return (
        <>
            <Helmet><title>Home page</title></Helmet>
            <>
            {
                user.uid ?   <FirstHomeSection></FirstHomeSection> :  
                <SecondHomeSection></SecondHomeSection>
            }
            </>
       
        </>
    );
};

export default Home;