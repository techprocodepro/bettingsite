import React, { useState, useEffect } from 'react'
import Rocket from './Rocket'
import { useDispatch, useSelector } from 'react-redux';
import { addWalletAmount } from '../../Redux/Slice';
import nightSky from '../../Assets/7qJhD8bS.jpg'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const socket = io('https://bettingsite-1.onrender.com');

const CrashGame = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const walletAmount = useSelector(state => state.walletAmount)
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const userName = useSelector(state => state.userName)
    const [error, setError] = useState('')


    // const [progress, setProgress] = useState(0);
    // const [isCrashed, setIsCrashed] = useState(false);
    // const [isBetStarted, setIsBetStarted] = useState(false)
    // const name = useSelector(state => state.userName)
    // var interval;

    const [message, setMessage] = useState('')
    const [multiplier, setMultiplier] = useState(0);
    const [gameStatus, setGameStatus] = useState(1); // 1 = waiting, 2 = in-progress, 3 = crashed
    const [betAmount, setBetAmount] = useState(100);
    const [players, setPlayers] = useState([]);
    const [winnings, setWinnings] = useState(null);
    const [crashMultiplier, setCrashMultiplier] = useState(null);


    useEffect(() => {
        socket.on('multiplierUpdate', (newMultiplier) => {
            setMultiplier(newMultiplier);
            console.log(newMultiplier, 'from socket multiplier')
        });

        socket.on('gameStatus', (gameStatus) => {
            setGameStatus(gameStatus);
            // setPlayers(gameState.players);
            console.log(gameStatus, "from socket game status")
        });

        socket.on('gameCrashed', (crashMultiplier) => {
            setGameStatus(3);
            setCrashMultiplier(crashMultiplier);
            console.log(crashMultiplier, "from socket crash multiplier")
        });

        return () => {
            socket.off('gameCrashed');
            socket.off('multiplierUpdate');
            socket.off('gameState');
        };
    }, []);

    const placeBet = async () => {
        if (isLoggedIn) {

            if (betAmount > 0 && !isNaN(betAmount) && /^[0-9]+(\.[0-9]+)?$/.test(betAmount)) {
                if (walletAmount >= betAmount) {
                    if (gameStatus === 1 || gameStatus === 3) {
                        try {
                            const response = await axios.post("https://bettingsite-1.onrender.com/deduct-wallet-amount", { userName, newAmount: betAmount });

                            if (response.status === 200) {
                                console.log("money deducted");
                                dispatch(addWalletAmount(response.data.walletAmount));
                            } else {
                                setError("not deducted succesfully ");
                            }
                        } catch (err) {
                            console.error("deduction failed:", err);
                            setError(err.response?.data?.message || "An unexpected error occurred.");
                        }
                        setMessage("bet placed succesfully")
                    } else {
                        setMessage('place bet in next game')
                    }
                }
                else {
                    setMessage('insufficient wallet balance')
                }
            } else {
                setMessage('enter valid Amount')
            }
        } else {
            alert('Please log in first to claim the reward.')
            navigate('/login')
        }
    };


    const cashOut = async () => {
        if (gameStatus === 2) {
            // socket.emit('cashOut');
            // socket.on('cashOutSuccess', (newWinnings) => {
            //     setWinnings(newWinnings);
            //     dispatch(addWalletAmount(~~newWinnings))
            //     setMessage(`You cashed out! Winnings: ${~~newWinnings}`);
            // });
            const winAmount = betAmount * multiplier;
            if (isLoggedIn) {
                try {
                    const response = await axios.post("https://bettingsite-1.onrender.com/add-wallet-amount", { userName, newAmount: ~~winAmount });

                    if (response.status === 200) {
                        console.log("money added");
                        dispatch(addWalletAmount(response.data.walletAmount));
                    } else {
                        setError("not succesfully added");
                    }
                } catch (err) {
                    console.error("claiming failed:", err);
                    setError(err.response?.data?.message || "An unexpected error occurred.");
                }
            } else {
                alert('Please log in first to claim the reward.')
                navigate('/login')
            }
        }
    };





    return (
        <div style={{ width: "100%", height: "100%", borderRadius: "30px", padding: "3px" }}>
            <div style={{ width: "100%", height: "70%", display: "flex", borderRadius: "30px", backgroundColor: "#463e7a", zIndex: "100" }}>

                <div className='bet-console' style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#191939", borderRadius: "30px", margin: "10px 5px" }}>

                    <input type='number' min={0} value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} style={{ width: "80%", height: "5%", border: "2px solid gold", borderRadius: "5px", margin: "10px auto", backgroundColor: "#0f0f0f", color: "white" }} />
                    <button onClick={placeBet} style={{ width: "80%", height: "10%", background: "", color: "black", borderRadius: "5px", border: "2px solid black" }}>
                        place bet
                    </button>
                    <div style={{ width: "80%", margin: "5px" }}></div>
                    <button onClick={cashOut} style={{ width: "80%", height: "10%", background: "", color: "black", borderRadius: "5px", border: "2px solid black" }}> Cash Out</button>
                    <p style={{ color: "orange" }}>{message}</p>
                </div>
                {/* ============================================================================================================ */}

                <div className='game-console' style={{ flex: 2, position: "relative", backgroundImage: `url(${nightSky})`, backgroundPositionY: `${(multiplier * 60) + (-710)}px`, backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: "30px", margin: "10px 5px" }}>
                    <h1 style={{ color: "white", margin: "45px 0px 0px 25px" }}>$ {multiplier.toFixed(2)}X</h1>
                    <h1 style={{ color: "red", margin: "5px 0px 0px 25px" }}>{(() => {
                        switch (gameStatus) {
                            case 1:
                                return <p style={{ color: "white", fontSize: "18px" }}> "Place bets, the game starts in a few seconds."</p>;
                            case 3:
                                return "Crashed";
                            default:
                                return "";
                        }
                    })()}</h1>
                    <div style={{ border: "1px solid red", position: "absolute", bottom: `${Math.min((multiplier * 430) + 100, 300)}px`, right: "50%" }}>
                        <Rocket isCrashed={gameStatus === 3} isBetStarted={gameStatus === 2} />
                    </div>
                </div>

            </div>
            <div style={{ flex: 1, position: "relative", background: "#090909", height: "25svh", zIndex: "5" }}></div>
        </div>
    )
}

export default CrashGame

// const PlaceBet = () => {

//     if (isCrashed) {
//         setIsCrashed(false)
//         setProgress(0)
//         setIsBetStarted(false)
//     }
//     else if (walletAmount >= betAmount) {

//         if (betAmount !== 0) {
//             dispatch(deductWalletAmount(betAmount))

//             var crashTime = Math.random() * 9000;

//             setIsBetStarted(true);

//             if (!isCrashed) {
//                 interval = setInterval(() => {
//                     setProgress((prev) => Math.min(prev + 0.05, 10));
//                 }, 50);

//                 setTimeout(() => {
//                     setIsCrashed(true);
//                     clearInterval(interval);
//                 }, crashTime);
//             }

//             return () => clearInterval(interval);
//         }
//         else {
//             alert('Bet Amount Cannot Be 0')
//         }
//     } else {
//         alert('Insufficient wallet balance!');
//     }
// }

// const CheckOut = () => {
//     if (!isCrashed) {
//         dispatch(addWalletAmount(~~(progress * betAmount)))
//         console.log(~~(progress * betAmount))
//         setBetAmount(0)
//         setIsCrashed(false)
//     }
// }