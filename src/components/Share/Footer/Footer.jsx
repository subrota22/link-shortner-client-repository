import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../../assets/link-shortner.png" ;
const Footer = () => {
    return (
        <>
            <footer className="footer p-10 bg-base-200 text-base-content shadow-lg">
                <div>
                <img src={logo} alt="logo" className='w-14 rounded-full'/>
                    <p>Learn with fun.<br />Providing reliable tech since 2020</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <NavLink to="/" className="link link-hover">Branding</NavLink>
                    <NavLink to="/" className="link link-hover">Design</NavLink>
                    <NavLink to="/" className="link link-hover">Marketing</NavLink>
                    <NavLink to="/" className="link link-hover">Advertisement</NavLink>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <NavLink to="/" className="link link-hover">About us</NavLink>
                    <NavLink to="/" className="link link-hover">Contact</NavLink>
                    <NavLink to="/" className="link link-hover">Jobs</NavLink>
                    <NavLink to="/" className="link link-hover">Press kit</NavLink>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <NavLink to="/" className="link link-hover">Terms of use</NavLink>
                    <NavLink to="/" className="link link-hover">Privacy policy</NavLink>
                    <NavLink to="/" className="link link-hover">Cookie policy</NavLink>
                </div>
            </footer>
        </>
    );
};

export default Footer;