import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import OrgContext from '../../../utils/orgContext';
import { CircularProgress } from '@mui/material';
import AlertMessage from 'LandingUI/components/alert';

import { colors, breakpoints } from '../../../styles/theme';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled as styledMui } from '@mui/material/styles';
import axios from 'axios';

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeaturesWrapper = styled.div`
  margin-top: 1rem;
  padding: 0.2rem;
`;

const Feature = styled.div`
  padding-bottom: 0.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PlanButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: 500;
  width: 11rem;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16rem;
  padding: 2rem;
  background-color: white;
  border: ${(props) => (props.isActive ? 'solid 1px black' : '')};
  cursor: pointer;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  &:hover {
    border: solid 1px black;
    opacity: 85%;
  }
`;

const PlanHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

const PlanPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 900;
`;

const PurchaseHeader = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.coolGray700};
  text-align: center;
`;

const PurchaseText = styled.div`
  font-size: 1.075rem;
  font-weight: 500;
  color: ${colors.coolGray700};
  text-align: center;
  padding-bottom: 1rem;
`;

const IOSSwitch = styledMui((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

const PlanSelect = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  const location = useRouter();

  const [billing, setBilling] = useState(true); // montly default

  const [sigma_plan, set_sigma_plan] = useState(process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_MONTHLY); // price id

  const [pro_plan, set_pro_plan] = useState(process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_MONTHLY);

  const [pro_price, set_pro_price] = useState(
    process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_MONTHLY
  );

  const [sigma_price, set_sigma_price] = useState(
    process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_PRICE_MONTHLY
  );

  const sigma_type = process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_TYPE;
  const pro_type = process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_TYPE;

  //console.log('plan prices type', pro_type, sigma_type);
  console.log('Plan Price ', pro_price, sigma_price);
  //console.log('Plan ', pro_plan, sigma_plan);

  const { orgState } = useContext(OrgContext);
  const [org_name, setOrg_name] = useState(orgState.org_name);

  const [plan, setPlan] = useState(pro_plan);
  const [planType, setPlanType] = useState(pro_type);
  const [price, setPrice] = useState(pro_price);

  const [isUpgradeFlow, setUpgradeFlow] = useState();
  const [currentPlan, setCurrentPlan] = useState();
  const [subscription_id, setSubId] = useState();
  const [subscription_item, setSubItem] = useState();

  /* eslint-disable */
  useEffect(() => {
    setOrg_name(JSON.parse(localStorage.getItem('orgState')));
    console.log(orgState);
    if (!location.isReady) return;

    setCurrentPlan(location.query?.currentPlan);
    setUpgradeFlow(location.query?.isUpgradeFlow);
    setSubId(location.query?.subscription_id);
    setSubItem(location.query?.subscription_item);
  }, [location.isReady]);

  useEffect(() => {
    setOrg_name(JSON.parse(localStorage.getItem('orgState')));
    if (isUpgradeFlow) {
      if (currentPlan == sigma_plan) {
        selectPlan(sigma_plan, sigma_price, sigma_type);
      } else {
        selectPlan(pro_plan, pro_price, pro_type);
      }
    }
  }, [isUpgradeFlow]);

  /* eslint-enable */

  const selectPlan = (plan, price, type) => {
    setPlan(plan);
    setPrice(price);
    setPlanType(type);
  };

  const submitPlan = async () => {
    setLoading(true);
    console.log('plan: ' + plan);
    console.log(
      'Plain details',
      plan,
      price,
      planType,
      subscription_id,
      isUpgradeFlow,
      subscription_item
    );

    const userDetails = JSON.parse(localStorage.getItem('user'));
    setOrg_name(JSON.parse(localStorage.getItem('orgState')));
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    await axios
      .post(
        `${url}api/stripe/create-checkout-session`,
        {
          priceId: plan,
          userId: userDetails.id
        },
        {
          headers: {
            Authorization: `Bearer ${userDetails.jwt_token}`
          }
        }
      )
      .then((res) => {
        AlertMessage('Redirecting to payment gateway', 'success');
        console.log(res);
        location.push(res.data.url);
      })
      .catch((err) => {
        console.log(err);
        AlertMessage('Something went wrong', 'error');
      });
    setLoading(false);
  };

  return (
    <div>
      <PurchaseHeader>Purchasing Plan </PurchaseHeader>
      <PurchaseText>for {org_name}</PurchaseText>
      <CardsWrapper>
        <PlanCard
          isActive={plan === pro_plan}
          onClick={() => selectPlan(pro_plan, pro_price, pro_type)}
        >
          <PlanHeader>Pro Plan</PlanHeader>
          {isUpgradeFlow && currentPlan === pro_plan && <div>Current Plan</div>}
          <PlanPrice>
            ${pro_price}/{billing ? 'Monthly' : 'Yearly'}
          </PlanPrice>
          <FeaturesWrapper>
            <Link href="/pricing">
              <a
                target={'_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Check out details on pricing page
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </a>
            </Link>
          </FeaturesWrapper>
        </PlanCard>

        <PlanCard
          isActive={plan === sigma_plan}
          onClick={() => selectPlan(sigma_plan, sigma_price, sigma_type)}
        >
          <PlanHeader>Sigma Plan</PlanHeader>
          {isUpgradeFlow && currentPlan === sigma_plan && <div>Current Plan</div>}
          <PlanPrice>
            ${sigma_price}/{billing ? 'Monthly' : 'Yearly'}
          </PlanPrice>
          <FeaturesWrapper>
            <Link href="/pricing">
              <a
                target={'_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Check out details on pricing page
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </a>
            </Link>
          </FeaturesWrapper>
        </PlanCard>
      </CardsWrapper>

      <div className="w-4/5 mx-auto mb-12">
        <div className="items-center justify-center text-center">
          <Link href="/contact">
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              For Indian Payment 🇮🇳, Contact Us
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </Link>
        </div>
        <div className="text-center flex justify-center m-auto items-center text-white w-80 px-2 py-5 border-2 border-hidden border-black bg-ot-bg-blue rounded-2xl font-extrabold">
          <p className="text-lg font-bold text-white font-bold m-auto">Monthly</p>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value={billing}
                control={<IOSSwitch sx={{ m: 1 }} style={{ fontWeight: '800' }} />}
                label=""
                labelPlacement="end"
                onChange={(e) => {
                  setBilling(!billing);

                  if (!billing) {
                    console.log('mothly button');
                    set_sigma_plan(process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_MONTHLY);
                    set_sigma_price(process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_PRICE_MONTHLY);
                    set_pro_plan(process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_MONTHLY);
                    set_pro_price(process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_MONTHLY);
                  } else {
                    console.log('yearly button');
                    set_sigma_plan(process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_YEARLY);
                    set_sigma_price(process.env.NEXT_PUBLIC_STRIPE_SIGMA_PLAN_PRICE_YEARLY);
                    set_pro_plan(process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_YEARLY);
                    set_pro_price(process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_PRICE_YEARLY);
                  }
                }}
                style={{ fontWeight: '800' }}
              />
            </FormGroup>
          </FormControl>
          <p className="text-lg m-auto font-bold text-white font-bold">Yearly</p>
        </div>
      </div>

      <ButtonWrapper>
        <PlanButton onClick={submitPlan} disabled={plan === currentPlan}>
          {loading ? <CircularProgress color={'inherit'} /> : 'Submit'}
        </PlanButton>
      </ButtonWrapper>
    </div>
  );
};

export default PlanSelect;
