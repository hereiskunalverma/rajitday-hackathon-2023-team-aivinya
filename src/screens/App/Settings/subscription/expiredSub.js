import React from 'react';
import moment from 'moment';
import Link from 'next/link';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';
import { map } from 'lodash';

const PaymentInformationCard = ({ subscriptionState, price, interval }) => {
  const planName = new Map([
    [process.env.NEXT_PUBLIC_STRIPE_RISE_PRODUCT_LIVE, 'Rise'],
    [process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT_LIVE, 'Growth'],
    [process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRODUCT_LIVE, 'Scale']
  ]);
  return (
    <Card>
      <p>Payment History</p>
      <div>
        <p>
          Previous Plan:&nbsp;
          <strong>{planName.get(subscriptionState.plan.product)} Plan</strong>
          &nbsp;at
          <strong>
            {' '}
            ${price / 100}/{interval}ly
          </strong>
        </p>
        <p>
          Period Started:
          <strong>
            {' '}
            {moment(subscriptionState.current_period_start * 1000).format('MMM Do YYYY')}
          </strong>
        </p>
        {subscriptionState.canceled_at && (
          <p>
            Canceled At:
            <strong> {moment(subscriptionState.canceled_at * 1000).format('MMM Do YYYY')}</strong>
          </p>
        )}
        {!subscriptionState.canceled_at && (
          <p>
            Expired At:
            <strong>
              {' '}
              {moment(subscriptionState.current_period_end * 1000).format('MMM Do YYYY')}
            </strong>
          </p>
        )}
        <Link href="/purchase/plan">
          <a>
            <Button>Submit</Button>
          </a>
        </Link>
        {/* {subscriptionState.status === 'trialing' && (
                    <div>
                        <div>Trial start</div>
                        <p>{moment(subscriptionState.trial_start * 1000).format('MMM Do YYYY')}</p>
                        <div>Trial End</div>
                        <p>{moment(subscriptionState.trial_end * 1000).format('MMM Do YYYY')}</p>
                    </div>
                )} */}
      </div>
    </Card>
  );
};

export default PaymentInformationCard;
