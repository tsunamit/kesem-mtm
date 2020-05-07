import React from 'react';

import './styles/DonationProgressBarStyles.css'

function DonationProgressBar({ donationGoal, currentDonationTotal }) {
  const percentComplete = Math.min(1.0, currentDonationTotal / donationGoal) * 100;

  return (
    <div>
      <div className="progress-bar-text"> 
      {`$0 --- ${currentDonationTotal} --- $${donationGoal}`}
      </div> 
      <div className="progress-bar-graphic"> 
      </div> 

    </div>
  );
}

export default DonationProgressBar;
