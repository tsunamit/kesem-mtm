import React from 'react';

import PropTypes from 'prop-types';

import './styles/PaddlePledgeIndicatorStyles.css'

function PledgeIndicator({ amount, isSelected }) {
  const dollarAmountText = `$${amount}`;

  return (
    <div className="pledge-indicator">
      {
        isSelected
          ? <div className="pledge-indicator-text-selected"> {dollarAmountText} </div> 
          : <div className="pledge-indicator-text">  {dollarAmountText} </div> 
      }
    </div>
  );
}

PledgeIndicator.defaultProps = {
  isSelected: false,
};

PledgeIndicator.propTypes = {
  amount: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
};


function PaddlePledgeIndicator({ pledgeAmounts, currentPledgeAmount }) {
  const pledgeIndicators = pledgeAmounts.map(
    (amount) => (
      <PledgeIndicator key={amount} amount={amount} isSelected={amount === currentPledgeAmount} />
    ),
  );

  return (
    <div className="paddle-pledge-indicator">
      {pledgeIndicators}
    </div>
  );
}

PaddlePledgeIndicator.propTypes = {
  pledgeAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPledgeAmount: PropTypes.number.isRequired,
};

export default PaddlePledgeIndicator;
