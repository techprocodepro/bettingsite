import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addWalletAmount, setRegister } from '../Redux/Slice';
import snoopDog from '../Assets/snoop.png'
import boxing from '../Assets/boxing.png'
import adSnoopDog from '../Assets/hero.a6ed58a2957284063d4d.jpg'
import { Link, useNavigate } from 'react-router-dom';
import profile from '../Assets/profile.jpg'
import GamesListContainer from './GamesListContainer';
import axios from 'axios'
import "../Styles/Container.css"



const HomePage = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const userName = useSelector(state => state.userName)
    const navigate = useNavigate();
    const [error, setError] = React.useState('')

    const handleClaimNow = async () => {
        if (isLoggedIn) {
            try {
                const response = await axios.post("https://bettingsite-1.onrender.com/add-wallet-amount", { userName, newAmount: 100 });

                if (response.status === 200) {
                    console.log("money claimed");
                    dispatch(addWalletAmount(response.data.walletAmount));
                } else {
                    setError("not succesfully claimed");
                }
            } catch (err) {
                console.error("claiming failed:", err);
                setError(err.response?.data?.message || "An unexpected error occurred.");
            }
        } else {
            alert('Please log in first to claim the reward.')
            navigate('/login')
        }
    };

    return (
        <>
            <div style={{ display: "flex", background: "#191939", borderRadius: "30px", margin: "10px 0px 0px 0px" }}>
                <img
                    style={{ width: "100%", borderRadius: "25px", height: "25svh", flex: "5" }}
                    src={adSnoopDog}
                    alt=""
                />
                {isLoggedIn ? <div style={{ flex: "2", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><div style={{ height: "100px", width: "100px", borderRadius: "60px", background: "grey" }}><img src={profile} style={{ height: "100px", width: "100px", borderRadius: "60px" }} /></div><h3 style={{ color: "gold" }}>Hi!! {userName}</h3></div> : <div style={{ flex: "2", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
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
                            onClick={handleClaimNow}
                        >
                            Claim Now
                        </button>
                    </div>
                    <div className="ad-img">
                        <img src={snoopDog} alt="" style={{ height: "100%" }} />
                    </div>
                </div>
                <div className="ad nd">
                    <div className="ads-btn">
                        <div style={{ display: "flex" }}>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Get&nbsp;</h3>
                            <h3 style={{ fontSize: "24px", color: "#463e7a" }}>100&nbsp;</h3>
                            <h3 style={{ fontSize: "18px", color: "white" }}>Coins Free</h3>
                        </div>
                        <button
                            className="claim-btn2"
                            onClick={handleClaimNow}
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