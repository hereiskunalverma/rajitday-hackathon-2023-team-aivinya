import React, { useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import OrgContext from '../../../../utils/orgContext';
import ApiContext from '../../../../utils/apiContext';
import AuthContext from '../../../../utils/authContext';
import axios from '../../../../services/axios';
import AlertMessage from 'LandingUI/components/alert';

import SEO from '../../../../components/Marketing/Layout/seo';
import SettingsHeader from '../../../../components/App/Navigation/settingsHeader';
import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import NullSubscriptionCard from './NullSubscriptionCard';
import CancelSubscriptionCard from './cancelSubscirptionCard';
import PaymentInformationCard from './paymentInformationCard';
import UpgradeSubscription from './upgradeSubscription';
import ExpiredSub from './expiredSub';

import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const SubscriptionSettings = () => {
  const router = useRouter();

  const premium_plan = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_MONTHLY;
  const basic_plan = process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_MONTHLY;
  const rise_plan = process.env.NEXT_PUBLIC_STRIPE_RISE_PLAN_MONTHLY;

  const premium_price = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PRICE_MONTHLY;
  const basic_price = process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_PRICE_MONTHLY;
  const rise_price = process.env.NEXT_PUBLIC_STRIPE_RISE_PLAN_PRICE_MONTHLY;

  const premium_type = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_TYPE;
  const basic_type = process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_TYPE;
  const rise_type = process.env.NEXT_PUBLIC_STRIPE_RISE_PLAN_TYPE;

  const { orgState } = useContext(OrgContext);
  const { id, stripe_customer_id, primary_email, subscription_id } = orgState;
  const { fetchFailure, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { authState } = useContext(AuthContext);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const [isModalSub, setModalSub] = useState(false);

  //stripe payment state
  const [subscriptionState, setSubscription] = useState();
  // const [planType, setPlanType] = useState("");
  const [price, setPrice] = useState(0);
  const [interval, setInterval] = useState('year');

  /* eslint-disable */
  useEffect(() => {
    localStorage.setItem('orgState', JSON.stringify(orgState.org_name));
    if (stripe_customer_id && subscription_id) {
      AlertMessage('Getting subscription details...', 'info');
      getSubscription();
    } else {
      console.log('no subscription');
      console.log(stripe_customer_id);
      console.log(subscription_id);
      console.log(orgState);
    }
  }, [orgState]);

  useEffect(() => {
    if (subscriptionState) {
      setCurrentSubscription();
    }
  }, [subscriptionState]);

  useEffect(() => {
    console.log('apoc time', new Date().valueOf());
    return () => fetchSuccess();
  }, []);
  /* eslint-enable */

  /* 
      Stripe Methods
  */

  const getSubscription = async () => {
    let params = { subscription_id };
    const subscription = await axios
      .get('/stripe/get-subscription', { params, headers })
      .catch((err) => {
        fetchFailure(err);
      });

    console.log('subscription', subscription);

    if (subscription.data.plan) {
      setSubscription(subscription.data);
      setPrice(subscription.data.plan.amount);
      setInterval(subscription.data.plan.interval);

      console.log('subscription', subscription.data);
      console.log('price', subscription.data.plan.amount, price);
      console.log('interval', subscription.data.plan.interval, interval);
    }
  };

  const cancelSubscription = async () => {
    setModalSub(false);
    let data = {
      email: primary_email,
      subscription_id
    };

    await axios.post('/stripe/cancel-subscription', data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    setModalSub(false);
    message.success('Subscription Canceled');
    router.push('/user/dashboard');
  };

  /* 
      Helper Methods
  */

  const setCurrentSubscription = () => {
    return;
  };

  const handleModal = () => {
    setModalSub(false);
  };

  const seoData = {
    title: 'AIvinya -  Subscription page',
    description: 'AIvinya -  Subscription page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        <SettingsHeader org_id={id} />

        <Title>Subscription Settings</Title>
        {isLoading && <LoadingOverlay />}
        {!subscriptionState && <NullSubscriptionCard />}
        {subscriptionState && (
          <>
            {(!subscriptionState.canceled_at ||
              subscriptionState.current_period_end > new Date().valueOf()) && (
                <React.Fragment>
                  <PaymentInformationCard
                    price={price}
                    subscriptionState={subscriptionState}
                    interval={interval}
                  />
                  <UpgradeSubscription subscriptionState={subscriptionState} interval={interval} />
                  <CancelSubscriptionCard
                    setModalSub={setModalSub}
                    isModalSub={isModalSub}
                    handleModal={handleModal}
                    cancelSubscription={cancelSubscription}
                  />
                </React.Fragment>
              )}
            {subscriptionState.canceled_at && (
              <ExpiredSub price={price} subscriptionState={subscriptionState} interval={interval} />
            )}
          </>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default SubscriptionSettings;
