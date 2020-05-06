import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FadeIn from 'react-fade-in';

import AuctionItemContainer from '../containers/AuctionItemContainer';
import { AUCTION } from '../../constants/model';

import '../../styles/defaultStyles.css';
import './styles/AuctionPageStyles.css';

const TITLE = 'Silent Auction';
const AUCTION_DATES = 'Auction is open from May 6th - May 13th.';

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
   * TODO: Add Link in a href for "auction rules and agreement"
   */
  useEffect(() => {
    firebase.getAuctionItems()
      .then((responseAuctionItems) => {
        setAuctionItems(responseAuctionItems);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="container">
        {/* Headers */}
        <FadeIn delay="300" transitionDuration="2000">
          <div className="page-h1">{TITLE}</div>
          <p className="page-p">
          To further support our campers, we are hosting a Virtual Silent Auction. All items in this auction have been generously donated by friends of Camp Kesem, 
          and all proceeds from this auction directly support our campers! To participate please see our <b><a id = 'link-style' href="">auction rules and agreement</a></b>.

          </p>
          <p className="page-p bold">{AUCTION_DATES}</p>
          <br />

          {/* Auction items */}
          <div className="wrapping-grid">
            {mapAuctionItemDataToContainers(auctionItems)}
          </div>
        </FadeIn>
        {/* <ItemGrid items={mapAuctionItemDataToContainers(auctionItems)} /> */}
      </div>
      <div id = "footer"/>
    </div>
  );
}

AuctionPage.propTypes = {
  firebase: PropTypes.shape({
    getAuctionItems: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuctionPage;
