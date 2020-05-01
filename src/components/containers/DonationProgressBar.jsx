import React from 'react';

import PropTypes from 'prop-types';

function DonationProgressBar({ donationGoal, currentDonationTotal }) {
  const percentComplete = Math.min(1.0, currentDonationTotal / donationGoal) * 100;

  return (
    <div>
      <h1>{`$0 --- ${currentDonationTotal} --- $${donationGoal}`}</h1>
      <div>
        <p>[progress bar {percentComplete}% full]</p>
      </div>
    </div>
  );
}

export default DonationProgressBar;
