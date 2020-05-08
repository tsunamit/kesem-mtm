import React from 'react';

import './styles/DonationProgressBarStyles.css'

function DonationProgressBar({ donationGoal, currentDonationTotal }) {
  const percentComplete = Math.min(1.0, currentDonationTotal / donationGoal) * 100;


  const prettyNumberHelper = (uglyNumber) => {
    return uglyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-text-wrapper"> 
        <div className="progress-bar-text">
          {`$0`}
        </div>
        <div className="progress-bar-text">
          ${prettyNumberHelper(currentDonationTotal)}
        </div>
        <div className="progress-bar-text">
          ${prettyNumberHelper(donationGoal)}
        </div>
      </div> 
      <div className="progress-bar-graphic-outline"> 
        <div className="progress-bar-graphic-fill" style={{width: `${percentComplete}%`}}>
        </div>
      </div> 
    </div>
  );
}

export default DonationProgressBar;
