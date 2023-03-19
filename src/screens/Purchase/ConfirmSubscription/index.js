import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { breakpoints } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import axios from 'axios';
import Card from '../../../components/Common/Card';
import ConfirmButton from '../../../components/Purchase/purchaseButton';
import AlertMessage from 'LandingUI/components/alert';

const Wrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const Text = styled.div`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
`;

const ConfirmSub = () => {
  const router = useRouter();
  const [query, setQuery] = useState(useRouter().query);
  const [loading, setLoading] = useState(true);

  const VerifyPurchase = async (query) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (query && user) {
      await axios
        .post(
          `${url}api/stripe/completed-checkout-session`,
          {
            sessionId: query,
            userId: user.id
          },
          {
            headers: {
              Authorization: `Bearer ${user.jwt_token}`
            }
          }
        )
        .then((res) => {
          // console.log(res);
          AlertMessage('Purchase Verified', 'success');
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          AlertMessage('Purchase Verification Failed', 'error');
          setLoading(false);
        });
    }
  };
  /* eslint-disable */
  useEffect(() => {
    //maybe add purchase event
    if (loading) {
      VerifyPurchase(query.session_id);
      setQuery(router.query);
    }
  }, [query, router]);

  useEffect(() => AlertMessage('Please Wait. Verifying Purchase...', 'info'), []);
  /* eslint-enable */

  return (
    <Wrapper>
      <Card>
        <Title>Your Subscription Has Been Confirmed!</Title>
        <Text>Please sign in again to complete the process</Text>
        <Text>Click below to navigate to the login screen</Text>
        <ConfirmButton
          onClick={() => {
            if (!loading) router.push('/user/dashboard');
          }}
          disabled={loading}
        >
          {loading ? 'Verifying' : 'Click Here'}
        </ConfirmButton>
      </Card>
    </Wrapper>
  );
};

export default ConfirmSub;
