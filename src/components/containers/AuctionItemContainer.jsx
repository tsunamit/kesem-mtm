import React from 'react';
import PropTypes from 'prop-types';

import CardContainer from './CardContainer';
import RoundedButton from '../input/RoundedButton';

import './styles/AuctionItemContainerStyles.css';

const PLACE_BID = 'Place Your Bid!';

function AuctionItemContainer({ title, description, itemOwner, link }) {
  const courtesyOfString = `Courtesy of ${itemOwner}`;

  const onClickLink = () => {
    window.location.href = link;
  };

  return (
    <div className="card-container">
      <div className="content-container">
        <h1 className="card-h1">{title}</h1>
        <div className="card-content-filler">
          <p className="card-p">{description}</p>
        </div>
        <p className="card-p">{courtesyOfString}</p>
        <RoundedButton title={PLACE_BID} onClick={() => onClickLink()} />
      </div>
    </div>
  );
}

AuctionItemContainer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itemOwner: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AuctionItemContainer;
