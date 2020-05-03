import React from 'react';

import PropTypes from 'prop-types';

function PledgeIndicator({ amount, isSelected }) {
  const dollarAmountText = `$${amount}`;

  return (
    // TODO toggle styles depending on if it is selected
    <div>
      {
        isSelected
          ? <b>{dollarAmountText}</b>
          : <p>{dollarAmountText}</p>
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
    <div>
      {pledgeIndicators}
    </div>
  );
}

PaddlePledgeIndicator.propTypes = {
  pledgeAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPledgeAmount: PropTypes.number.isRequired,
};

export default PaddlePledgeIndicator;
