import React, { useState, useEffect } from 'react';
import './styles/CountdownContainerStyles.css'

function CountdownContainer() {

    let daysText = "days"
    let hoursText = "hours"
    let minsText = "mins"

    const calculateTimeLeft = () => {
        const difference = new Date(1589072400000) - Date.now();
        let timeLeft = {};
    
        if (difference > 0) {  
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60)
        };
        }
        if (timeLeft.days == 1) {
            daysText = "day"
        } else { hoursText = "days"}

        if (timeLeft.hours == 1) {
            hoursText = "hour"
        } else { hoursText = "hours"}

        if (timeLeft.minutes == 1) {
            minsText = "min"
        } else { minsText = "mins"}

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);
    });

    let timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        timerComponents.push(timeLeft[interval]);
    });

    return (
        <div id = 'countdown-wrapper'> 
            <div id = 'countdown-vertical'> 
                <div id = 'countdown-box'>
                    {timerComponents[0]}      
                </div>
                <div id = 'countdown-text'>
                    {daysText}
                </div> 
            </div> 
            <div id = 'countdown-vertical'> 
                <div id = 'countdown-box'>
                    {timerComponents[1]}
                </div>
                <div id = 'countdown-text'>
                    {hoursText}
                </div> 
            </div> 
            <div id = 'countdown-vertical'> 
                <div id = 'countdown-box'>
                    {timerComponents[2]}
                </div>  
                <div id = 'countdown-text'>
                    {minsText}
                </div> 
            </div> 
        </div>
    );

}

export default CountdownContainer; 