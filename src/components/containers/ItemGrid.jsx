import React from 'react';

import './styles/ItemGridStyles.css';

/**
 * 3 column item grid
 */
function ItemGrid({ items }) {
  const cols = [[], [], []];

  items.forEach((item, itemIndex) => {
    // sort into buckets according to modulus
    cols[itemIndex % 3].push(item);
  });

  return (
    <div className="grid-container">
      <div className="grid-col">
        {cols[0]}
      </div>
      <div className="grid-col">
        {cols[1]}
      </div>
      <div className="grid-col">
        {cols[2]}
      </div>
    </div>
  );
}

export default ItemGrid;
