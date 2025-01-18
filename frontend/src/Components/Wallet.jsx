import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import protocol from '../Assets/protocol.png'
import { CountUp } from 'countup.js'

const Wallet = () => {

    const walletAmount = useSelector(state => state.walletAmount);
    const [displayAmount, setDisplayAmount] = useState(walletAmount);
    // let count;
    // setDisplayAmount(prev => { count = prev })

    useEffect(() => {
        const countUp = new CountUp('count', walletAmount, {
            duration: 1,
            startVal: displayAmount,
            useEasing: true,
        });
        countUp()
    }, [walletAmount, displayAmount]);

    return (
        <>
            <div className="wallet">
                {displayAmount}
                <img src={protocol} alt="" style={{ height: "25px" }} />
            </div>
        </>
    );
};

export default Wallet;
