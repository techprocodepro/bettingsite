import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import protocol from '../Assets/protocol.png'

const Wallet = () => {

    const walletAmount = useSelector(state => state.walletAmount);
    const [displayAmount, setDisplayAmount] = useState(walletAmount);

    useEffect(() => {

        if (displayAmount !== walletAmount) {
            const interval = setInterval(() => {
                setDisplayAmount(prevAmount => {
                    if (prevAmount < walletAmount) {
                        return prevAmount + 1;  // Increase the display amount when the wallet increases
                    } else if (prevAmount > walletAmount) {
                        return prevAmount - 1; // Decrease the display amount when the wallet decreases
                    }
                    clearInterval(interval);
                    return prevAmount; // Stop when displayAmount reaches walletAmount
                });
            }, 1);

            // Clear the interval when the component unmounts or walletAmount has finished animating
            return () => clearInterval(interval);
        }
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
