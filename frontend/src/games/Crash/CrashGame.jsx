import React, { useState, useEffect } from 'react'
import Rocket from './Rocket'
import { useDispatch, useSelector } from 'react-redux';
import { deductWalletAmount, addWalletAmount } from '../../Redux/Slice';
import nightSky from '../../Assets/7qJhD8bS.jpg'
import io from 'socket.io-client'

const socket = io('https://bettingsite-1.onrender.com');

const CrashGame = () => {

    const dispatch = useDispatch();
    const walletAmount = useSelector(state => state.walletAmount)
    // const [progress, setProgress] = useState(0);
    // const [isCrashed, setIsCrashed] = useState(false);
    // const [isBetStarted, setIsBetStarted] = useState(false)
    // const name = useSelector(state => state.userName)
    // var interval;

    const [multiplier, setMultiplier] = useState(0);
    const [gameStatus, setGameStatus] = useState('waiting');
    const [betAmount, setBetAmount] = useState(100);
    const [players, setPlayers] = useState([]);
    const [winnings, setWinnings] = useState(null);
    const [crashMultiplier, setCrashMultiplier] = useState(null);


    useEffect(() => {
        // Listen for multiplier updates
        socket.on('multiplierUpdate', (newMultiplier) => {
            setMultiplier(newMultiplier);
            console.log(newMultiplier, 'from socket')
        });

        // Listen for game state updates
        socket.on('gameState', (gameState) => {
            setGameStatus(gameState.gameStatus);
            setPlayers(gameState.players);
        });

        socket.on('gameCrashed', (crashMultiplier) => {
            setGameStatus('crashed');
            setCrashMultiplier(crashMultiplier);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('gameCrashed');
            socket.off('multiplierUpdate');
            socket.off('gameState');
        };
    }, []);

    const placeBet = () => {
        if (betAmount !== 0) {
            if (walletAmount >= betAmount) {
                if (gameStatus === 'waiting') {
                    socket.emit('placeBet', betAmount);
                    dispatch(deductWalletAmount(betAmount));
                    alert(`Bet of ${betAmount} placed!`);
                } else {
                    alert('place bet in next game')
                }
            }
            else {
                alert('insufficient wallet balance')
            }
        } else {
            alert('enter valid Amount')
        }
    };

    const cashOut = () => {
        if (gameStatus === 'in-progress') {
            socket.emit('cashOut');
            socket.on('cashOutSuccess', (newWinnings) => {
                setWinnings(newWinnings);
                dispatch(addWalletAmount(newWinnings))
                alert(`You cashed out! Winnings: ${newWinnings}`);
            });
        }
    };


    
    
    
    return (
        <div style={{ width: "100%", height: "100%", borderRadius: "30px", padding: "3px" }}>
            <div style={{ width: "100%", height: "70%", display: "flex", borderRadius: "30px", backgroundColor: "#463e7a", zIndex: "100" }}>

                <div className='bet-console' style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#191939", borderRadius: "30px", margin: "10px 5px" }}>

                    <input value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} style={{ width: "80%", height: "5%", border: "2px solid gold", borderRadius: "5px", margin: "10px auto", backgroundColor: "#0f0f0f", color: "white" }} />
                    <button onClick={placeBet} style={{ width: "80%", height: "10%", background: "", color: "black", borderRadius: "5px", border: "2px solid black" }}>
                        place bet
                    </button>
                    <div style={{ width: "80%", margin: "5px" }}></div>
                    <button onClick={cashOut} style={{ width: "80%", height: "10%", background: "", color: "black", borderRadius: "5px", border: "2px solid black" }}> Cash Out</button>
                </div>
                {/* ============================================================================================================ */}

                <div className='game-console' style={{ flex: 2, position: "relative", backgroundImage: `url(${nightSky})`, backgroundPositionY: `${(multiplier * 25) + (-710)}px`, backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: "30px", margin: "10px 5px" }}>
                    <h1 style={{ color: "white", margin: "45px 0px 0px 25px" }}>$ {multiplier.toFixed(2)}X</h1>
                    {(gameStatus === 'crashed') && <h1 style={{ color: "red", margin: "5px 0px 0px 25px" }}>Crashed</h1>}
                    <div style={{ border: "1px solid red", position: "absolute", bottom: `${Math.min((multiplier * 130) + 100, 300)}px`, right: "50%" }}>
                        <Rocket isCrashed={gameStatus === 'crashed'} isBetStarted={gameStatus === 'in-progress'} />
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