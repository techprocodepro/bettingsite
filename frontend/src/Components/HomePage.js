import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addWalletAmount, setRegister } from '../Redux/Slice';
import snoopDog from '../Assets/snoop.png'
import boxing from '../Assets/boxing.png'
import adSnoopDog from '../Assets/hero.a6ed58a2957284063d4d.jpg'
import { Link } from 'react-router-dom';
import profile from '../Assets/profile.jpg'
import GamesListContainer from './GamesListContainer';



const HomePage = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    return (
        <>
            <div style={{ display: "flex", background: "#191939", borderRadius: "30px", margin: "10px 0px 0px 0px" }}>
                <img
                    style={{ width: "100%", borderRadius: "25px", height: "25svh", flex: "5" }}
                    src={adSnoopDog}
                    alt=""
                />
                {isLoggedIn ? <div style={{ flex: "2", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><div style={{ height: "100px", width: "100px", borderRadius: "60px", background: "grey" }}><img src={profile} style={{ height: "100px", width: "100px", borderRadius: "60px" }} /></div><h3 style={{ color: "gold" }}>Hi!! Manoj</h3></div> : <div style={{ flex: "2", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Link to="/login" onClick={() => { dispatch(setRegister(true)) }} style={{ width: "100px", height: "40px", backgroundColor: "gold", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", borderRadius: "5px", fontWeight: "700", color: "" }}>Register</Link>
                    <p style={{ color: "#8f8f8f" }}>------------ or ------------</p>
                    <Link to="/login" onClick={() => { dispatch(setRegister(false)) }} style={{ width: "100px", height: "40px", backgroundColor: "gold", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", borderRadius: "5px", fontWeight: "700", color: "" }}>login</Link>
                </div>}
            </div>

            <div style={{ display: "flex", margin: "20px 0px 10px 0px", }}>
                <div className="ad">
                    <div className="ad-btn">
                        <div style={{ display: "flex" }}>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Get&nbsp;</h3>
                            <h3 style={{ fontSize: "24px", color: "#fec195" }}>100&nbsp;</h3>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Coins Free</h3>
                        </div>
                        <button
                            className="claim-btn1"
                            onClick={() => dispatch(addWalletAmount(100))}
                        >
                            Claim Now
                        </button>
                    </div>
                    <div className="ad-img">
                        <img src={snoopDog} alt="" style={{ height: "100%" }} />
                    </div>
                </div>
                <div className="ad nd">
                    <div className="ad-btn">
                        <div style={{ display: "flex" }}>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Get&nbsp;</h3>
                            <h3 style={{ fontSize: "24px", color: "#463e7a" }}>100&nbsp;</h3>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Coins Free</h3>
                        </div>
                        <button
                            className="claim-btn2"
                            onClick={() => dispatch(addWalletAmount(100))}
                        >
                            Claim Now
                        </button>
                    </div>
                    <div className="ad-img">
                        <img src={boxing} alt="" style={{ height: "100%" }} />
                    </div>
                </div>
            </div>
            <div>
                <h1 style={{ color: "white", margin: "0px 50px" }}>Games</h1>
                <div
                    className="games-container"
                    style={{ color: "white", width: "100%", display: "flex", overflow: "scroll" }}
                >
                    <GamesListContainer />
                </div>
            </div>
        </>
    );
};


export default HomePage