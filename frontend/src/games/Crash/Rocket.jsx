import React from 'react'
import './Rocket.css'

const Rocket = ({ isCrashed, isBetStarted }) => {
    if (isCrashed) {
        return (
            <>
                <div className="blast-container">
                    <div className="blast"></div>
                    <div className="fumes"></div>
                </div>
            </>
        )
    }
    else {

        return (
            <>
                <div class="rocket">
                    <div class="rocket-body">
                        <div class="body"></div>
                        <div class="fin fin-left"></div>
                        <div class="fin fin-right"></div>
                        <div class="window"></div>
                    </div>
                    {isBetStarted && <>
                        <div class="exhaust-flame"></div>
                        <ul class="exhaust-fumes">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </>
                    }
                </div>

            </>
        )
    }
}

export default Rocket