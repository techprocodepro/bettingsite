import React, { useState, useEffect } from 'react';
import "../Styles/Home.css";
import GamesDropDown from './GamesDropDown';
import Wallet from './Wallet';
import Container from './Container';
import UserBetHistory from './UserBetHistory';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, fetchUserData } from '../Redux/Slice';
import axios from "axios"

const Home = () => {
    const dispatch = useDispatch();
    const [isGamesClicked, setIsGamesClicked] = useState(false);
    const [isHistoryClicked, setIsHistoryClicked] = useState(false);
    const session = localStorage.getItem("accessToken"); // fix later => use this to make api call to get user data
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    useEffect(() => {
        const login = async () => {
            try {
                const response = await axios.post("http://localhost:3001/loginAuth", {
                    userName: "root",
                    password: "root",
                });

                if (response.status === 200) {
                    console.log("Login successful:", response.data);
                    dispatch(fetchUserData(response.data));
                    localStorage.setItem("accessToken", response.data._id);
                } else {
                    console.log("Login failed. Please try again.");
                }
            } catch (err) {
                console.error("Login failed:", err);

            }
        };
        if (session) {
            login();
        }

    }, []);




    const handleLogout = () => {
        localStorage.removeItem("accessToken");  // Remove token from localStorage
        dispatch(logoutUser());  // Dispatch the logout action to Redux store
    };

    return (
        <div className='home'>
            <header className='head'>
                <center>
                    <Wallet />
                </center>
            </header>
            <div style={{ display: "flex" }}>

                <nav className='navbar'>
                    <div className='navbar-btn-container'>
                        <Link to="/" className='navbar-btn' style={{ textDecoration: "none" }}>
                            <div className='arrow-down-empty'></div>Home<div className='arrow-down-empty'></div>
                        </Link>
                        <div className='navbar-btn' onClick={() => setIsGamesClicked(!isGamesClicked)}>
                            <div className='arrow-down-empty'></div>Games
                            <div className={`arrow-down ${isGamesClicked ? "rotated" : ""}`} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="30" height="30">
                                    <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" fill="#090c19" />
                                </svg>
                            </div>
                        </div>
                        <div className={`drop-down ${isGamesClicked ? "clicked" : ""}`}><GamesDropDown /></div>

                        <div className='navbar-btn' onClick={() => setIsHistoryClicked(!isHistoryClicked)}>
                            <div className='arrow-down-empty'></div>History
                            <div className={`arrow-down ${isHistoryClicked ? "rotated" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="30" height="30">
                                    <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" fill="#090c19" />
                                </svg>
                            </div>
                        </div>
                        <div className={`drop-down ${isHistoryClicked ? "clicked" : ""}`}><UserBetHistory /></div>

                        <div className='navbar-btn'>
                            <div className='arrow-down-empty'></div>About us<div className='arrow-down-empty'></div>
                        </div>
                        <div style={{flex:1}}></div>
                        <div className='navbar-btn' onClick={handleLogout}>
                            <div className='arrow-down-empty'></div>
                            {isLoggedIn ? "Logout" : "Login"}
                            <div className='arrow-down-empty'></div>
                        </div>
                    </div>
                </nav>

                <div className='container'>
                    <Container />
                </div>
            </div>
        </div>
    );
}

export default Home;
