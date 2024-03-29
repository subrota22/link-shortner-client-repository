import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../../../assets/link-shortner.png";
import { AuthProvider } from '../../../UserContext/UserContext';
const Navbar = () => {
    const { user, signOutUser, setUser } = useContext(AuthProvider);
    const accountLogOut = () => {
        signOutUser();
        setUser({});
        toast.success("Your account log out successfully !! ");
    }
    const menu = <>
        {
            user.uid && <>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/short-links">Short links </NavLink></li>
                <li><button onClick={() => accountLogOut()} className='btn bg-red-400 text-white mx-8 text-md py-4 '> Log Out </button></li>
            </>
        }
        <> {
            !user.uid && <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </>
        } </>

    </>
    return (
        <>
            <div className="navbar text-lg font-bold shadow-lg py-5">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menu}
                        </ul>
                    </div>
                    <NavLink to="/" className="normal-case text-xl hidden lg:block py-2">
                        <img src={logo} alt="logo" className='w-14 rounded-full' />
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menu}
                    </ul>
                </div>

                {
                    user.uid &&
                    <>
                        <div className="tooltip float-end tooltip-left hidden lg:block ml-40" data-tip={user?.displayName}>
                            <div className="avatar  rounded-full">
                                <div className="w-14 mx-4 rounded-full  border-primary border-2">
                                    <img src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/RSCmwXf/imagenot.jpg"} alt='user' />
                                </div>
                            </div>
                        </div>
                    </>
                }


            </div>
        </>
    );
};

export default Navbar;