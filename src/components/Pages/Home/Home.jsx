import React, { useContext } from 'react';
import FirstHomeSection from './FirstHomeSection/FirstHomeSection';
import { Helmet } from "react-helmet";
import SecondHomeSection from './SecondHomeSection/SecondHomeSection';
import { AuthProvider } from '../../../UserContext/UserContext';
import PageLoader from '../../Share/PageLoader/PageLoader';
const Home = () => {
const {user, loading} = useContext(AuthProvider) ;
if(loading){
return <PageLoader></PageLoader>
}
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