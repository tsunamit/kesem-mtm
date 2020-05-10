/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { paddleDataModel } from '../constants/model';

export const logPaddlesInSession = async (firebase, sessionId) => {
  console.log('logging paddles in session: ', sessionId);
  const emailToDonationAmountMap = {};

  const paddles = await firebase.getPaddlesCollection(sessionId);
  console.log('fetched paddles: ', paddles);

  paddles.forEach((paddle) => {
    const name = paddle[paddleDataModel.name];
    const email = paddle[paddleDataModel.email];
    const donation = paddle[paddleDataModel.amountPledged];

    if (Object.prototype.hasOwnProperty.call(emailToDonationAmountMap, email)) {
      console.log(`${email} already in map. Adding ${donation} to donation`);
      emailToDonationAmountMap[paddle[paddleDataModel.email]].donation += donation;
    } else {
      console.log(`${email} not in map. creating new entry.`);
      emailToDonationAmountMap[paddle[paddleDataModel.email]] = {
        name,
        email,
        donation,
      };
    }
  });

  console.log(emailToDonationAmountMap);
};
