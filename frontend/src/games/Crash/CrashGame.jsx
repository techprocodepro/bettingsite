import React, { useState } from 'react'
import Rocket from './Rocket'
import { useDispatch, useSelector } from 'react-redux';
import { deductWalletAmount, addWalletAmount } from '../../Redux/Slice';
import nightSky from '../../Assets/7qJhD8bS.jpg'

const CrashGame = () => {

    const dispatch = useDispatch();
    const walletAmount = useSelector(state => state.walletAmount)
    const [progress, setProgress] = useState(0);
    const [isCrashed, setIsCrashed] = useState(false);
    const [betAmount, setBetAmount] = useState(10);
    const [isBetStarted, setIsBetStarted] = useState(false)
    const name = useSelector(state=> state.userName)
    var interval;


    const PlaceBet = () => {

        if (isCrashed) {
            setIsCrashed(false)
            setProgress(0)
            setIsBetStarted(false)
        }
        else if (walletAmount >= betAmount) {

            if (betAmount !== 0) {
                dispatch(deductWalletAmount(betAmount))

                var crashTime = Math.random() * 9000;

                setIsBetStarted(true);

                if (!isCrashed) {
                    interval = setInterval(() => {
                        setProgress((prev) => Math.min(prev + 0.05, 10));
                    }, 50);

                    setTimeout(() => {
                        setIsCrashed(true);
                        clearInterval(interval);
                    }, crashTime);
                }

                return () => clearInterval(interval);
            }
            else {
                alert('Bet Amount Cannot Be 0')
            }
        } else {
            alert('Insufficient wallet balance!');
        }
    }

    const CheckOut = () => {
        if (!isCrashed) {
            dispatch(addWalletAmount(~~(progress * betAmount)))
            console.log(~~(progress * betAmount))
            setBetAmount(0)
            setIsCrashed(false)
        }
    }



    return (
        <div style={{ width: "100%", height: "100%", borderRadius: "30px", padding: "3px" }}>
            <div style={{ width: "100%", height: "70%", display: "flex", borderRadius: "30px", backgroundColor:"#463e7a",zIndex:"100"}}>

                <div className='bet-console' style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#191939", borderRadius: "30px", margin:"10px 5px" }}>

                    <input value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} style={{ width: "80%", height: "5%", border: "2px solid gold", borderRadius: "5px", margin: "10px auto", backgroundColor: "#0f0f0f", color: "white" }} />
                    <button onClick={PlaceBet} style={{ width: "80%", height: "10%", background: "", color: "black", borderRadius: "5px", border: "2px solid black" }}>
                        {isCrashed ? "restart" : "place bet"}
                    </button>
                    <div style={{ width: "80%", margin: "5px" }}></div>
                    <button onClick={CheckOut} style={{ width: "80%", height: "10%", background: "", color: "black", borderRadius: "5px", border: "2px solid black" }}> CheckOut</button>
                </div>
                {/* ============================================================================================================ */}

                <div className='game-console' style={{ flex: 2, position: "relative", backgroundImage: `url(${nightSky})`, backgroundPositionY: `${(progress * 25) + (-710)}px`, backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: "30px", margin:"10px 5px" }}>
                    <h1 style={{ color: "white", margin:"45px 0px 0px 25px" }}>$ {progress.toFixed(2)}X</h1>
                    {isCrashed && <h1 style={{ color: "red", margin:"5px 0px 0px 25px" }}>Crashed</h1>}
                    <div style={{ border: "1px solid red", position: "absolute", bottom: `${Math.min((progress * 130) + 100, 300)}px`, right: "50%" }}>
                        <Rocket isCrashed={isCrashed} isBetStarted={isBetStarted} />
                    </div>
                </div>

            </div>
            <div style={{flex:1,position:"relative", background:"#090909", height:"25svh", zIndex:"5"}}></div>
        </div>
    )
}

export default CrashGame