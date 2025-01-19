import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import protocol from '../Assets/protocol.png';
import { CountUp } from 'countup.js';

const Wallet = () => {
    const isLoggedIn = useSelector(state=> state.isLoggedIn)
    const walletAmount = useSelector((state) => state.walletAmount);
    const previousAmount = useRef(walletAmount);

    useEffect(() => {
        
        const countUp = new CountUp('walletAmount', walletAmount, {
            duration: 1, 
            startVal: previousAmount.current, 
            useEasing: true, 
            separator: ',',
        });

        if (!countUp.error) {
            countUp.start(); 
        } else {
            console.error(countUp.error);
        }

        previousAmount.current = walletAmount;
    }, [walletAmount]);

    return (
        <>
            <div className="wallet">
                <span id="walletAmount">{walletAmount}</span>
                <img src={protocol} alt="" style={{ height: '25px' }} />
            </div>
        </>
    );
};

export default Wallet;
