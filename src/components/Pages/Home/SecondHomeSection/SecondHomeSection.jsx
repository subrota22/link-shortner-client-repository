import React from 'react';
import { NavLink } from 'react-router-dom';

const SecondHomeSection = () => {
    return (
        <>
    <div className="hero min-h-screen  transform scale-95 rounded-xl  my-10 shadow-2xl">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold"> Short your full url</h1>
      <p className="py-6 text-2xl font-bold">You must have to login first to short your url, You can not short your url untill you are login in this website. 
      So, what are you waiting for, go for login and then you can short your any url. </p>
      <NavLink className="btn btn-primary w-56" to="/login">Get Started</NavLink>
    </div>
  </div>
</div>
        </>
    );
};

export default SecondHomeSection;