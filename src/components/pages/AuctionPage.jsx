import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AuctionItemContainer from '../containers/AuctionItemContainer';

import { AUCTION } from '../../constants/model';

const TITLE = 'Silent Auction';
const DESCRIPTION = 'All proceeds support our campers! To participate please see our auction rules and agreement';
const AUCTION_DATES = 'Auction is open from May 5th - May 13th';

function AuctionPage({ firebase }) {
  const [auctionItems, setAuctionItems] = useState([]);

  const mapAuctionItemDataToContainers = (auctionArrayData) => {
    return auctionArrayData.map((auctionItemData) => (
      <AuctionItemContainer
        title={auctionItemData[AUCTION.title]}
        description={auctionItemData[AUCTION.description]}
        itemOwner={auctionItemData[AUCTION.itemOwner]}
        link={auctionItemData[AUCTION.link]}
        key={auctionItemData[AUCTION.title]}
      />
    ));
  };

  /**
   * On page load
   */
  useEffect(() => {
    firebase.getAuctionItems()
      .then((responseAuctionItems) => {
        setAuctionItems(responseAuctionItems);
      });
  }, []);

  return (
    <div>
      {/* Headers */}
      <h1>{TITLE}</h1>
      <br />
      <p>{DESCRIPTION}</p>
      <br />
      <p>{AUCTION_DATES}</p>

      {/* Auction items */}
      {mapAuctionItemDataToContainers(auctionItems)}
    </div>
  );
}

AuctionPage.propTypes = {
  firebase: PropTypes.shape({
    getAuctionItems: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuctionPage;
