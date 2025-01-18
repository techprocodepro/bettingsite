import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import protocol from '../Assets/protocol.png'
import { CountUp } from 'countup.js'

const Wallet = () => {

    const walletAmount = useSelector(state => state.walletAmount);
    const previousAmount = useRef(walletAmount); // Store the previous wallet amount

    useEffect(() => {
        // Create a CountUp instance and animate from previousAmount to walletAmount
        const countUp = new CountUp('walletAmount', walletAmount, {
            duration: 1, // Animation duration
            startVal: previousAmount.current, // Start from the previous wallet amount
            useEasing: true, // Smooth easing effect
            separator: ',', // Add commas for large numbers
        });

        if (!countUp.error) {
            countUp.start(); // Start the animation
        } else {
            console.error(countUp.error);
        }

        // Update the previousAmount reference
        previousAmount.current = walletAmount;
    }, [walletAmount]); // Trigger animation whenever walletAmount changes

    return (
        <>
            <div className="wallet">
                <span id='walletAmount'>{displayAmount}</span>
                <img src={protocol} alt="" style={{ height: "25px" }} />
            </div>
        </>
    );
};

export default Wallet;
