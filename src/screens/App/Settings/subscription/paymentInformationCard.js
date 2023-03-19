import React from 'react';
import moment from 'moment';

import Card from '../../../../components/Common/Card';

const PaymentInformationCard = ({ subscriptionState, price, planType, interval }) => {
  const planName = new Map([
    [process.env.NEXT_PUBLIC_STRIPE_RISE_PRODUCT_LIVE, 'Rise'],
    [process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_LIVE, 'Growth'],
    [process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRODUCT_LIVE, 'Scale']
  ]);
  return (
    <Card>
      {/* <h2>Payment Information</h2> */}
      <div>
        <p>
          Current Plan:&nbsp;
          <strong>{planName.get(subscriptionState.plan.product)} Plan</strong>
          &nbsp;at
          <strong>
            {' '}
            ${price / 100}/{interval}ly
          </strong>
        </p>
        <p>
          Billing Period Start:
          <strong>
            {' '}
            {moment(subscriptionState.current_period_start * 1000).format('MMM Do YYYY')}
          </strong>
        </p>
        <p>
          Next Payment:
          <strong>
            {' '}
            {moment(subscriptionState.current_period_end * 1000).format('MMM Do YYYY')}
          </strong>
        </p>
        <p>
          Member Since:
          <strong> {moment(subscriptionState.created * 1000).format('MMM Do YYYY')}</strong>
        </p>
        {subscriptionState.status === 'trialing' && (
          <div>
            <div>Trial start</div>
            <p>{moment(subscriptionState.trial_start * 1000).format('MMM Do YYYY')}</p>
            <div>Trial End</div>
            <p>{moment(subscriptionState.trial_end * 1000).format('MMM Do YYYY')}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PaymentInformationCard;
