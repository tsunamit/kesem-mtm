import React from 'react';
import PropTypes from 'prop-types';

import CardContainer from './CardContainer';
import RoundedButton from '../input/RoundedButton';

const PLACE_BID = 'Place Your Bid!';

function AuctionItemContainer({ title, description, itemOwner, link }) {
  const courtesyOfString = `Courtesy of ${itemOwner}`;

  const onClickLink = (link) => {
    window.location.href = link;
  }

  return (
    <CardContainer>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{courtesyOfString}</p>
      <RoundedButton title={PLACE_BID} onClick={() => onClickLink(link)} />
    </CardContainer>
  );
}

AuctionItemContainer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itemOwner: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AuctionItemContainer;
