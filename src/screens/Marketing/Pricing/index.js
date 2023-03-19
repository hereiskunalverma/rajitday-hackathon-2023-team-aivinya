import React, { useState } from 'react';
import styled from 'styled-components';
import ProCard from './proCard';
import BasicCard from './basicCard';
import PricingHeader from './pricingHeader';
import { colors, breakpoints } from '../../../styles/theme';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled as styledMui } from '@mui/material/styles';
import { pricingDetails } from './pricingData';

const Background = styled.div`
  background-color: ${colors.gray900};
`;

const BackgroundSecondary = styled.div`
  background-color: ${colors.white};
  margin-top: 4rem;
  padding-bottom: 3rem;
  @media (min-width: ${breakpoints.large}) {
    margin-top: 5rem;
    padding-bottom: 5rem;
  }
`;

const InnerBackgroundWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

const InnerBackground = styled.div`
  position: absolute;
  background-color: ${colors.gray900};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 83.3%;
  @media (min-width: ${breakpoints.large}) {
    height: 66.6%;
  }
`;

const InnerWrapper = styled.div`
  position: relative;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: ${breakpoints.large}) {
    display: flex;
    justify-content: space-evenly;
  }
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

const Pricing = () => {
  const [showMore, setShowMore] = useState(false);
  const [country, setCountry] = useState(false); // default us dollar
  const onChangeHandler = (e) => {
    // console.log(showMore);
    setShowMore(!showMore);
  };
  const onChangeHandlerCountry = () => {
    setCountry(!country);
  };
  // console.log(pricingDetails)
  return (
    <Background>
      <PricingHeader />
      <div className=" w-full sm:w-4/5 mx-auto mb-12 ">
        <div className="text-center flex justify-center m-auto items-center text-white w-80 px-2 py-5 border-2 border-hidden border-black bg-ot-bg-blue rounded-2xl font-extrabold">
          <p className="text-lg font-bold text-white m-auto">Monthly</p>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="infoPricing"
                control={<IOSSwitch sx={{ m: 1 }} style={{ fontWeight: '800' }} />}
                label=""
                labelPlacement="end"
                onChange={onChangeHandler}
                style={{ fontWeight: '800' }}
              />
            </FormGroup>
          </FormControl>
          <p className="text-lg font-bold text-white m-auto ">Yearly</p>
        </div>
      </div>
      <div className=" w-full sm:w-4/5 mx-auto mb-12">
        <div className="text-center flex justify-center m-auto items-center text-white w-80 px-2 py-5 border-2 border-hidden border-black bg-ot-bg-blue rounded-2xl font-extrabold">
          <p className="text-3xl m-auto font-bold text-white ">$</p>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="infoPricing"
                control={<IOSSwitch sx={{ m: 1 }} style={{ fontWeight: '800' }} />}
                label=""
                labelPlacement="end"
                onChange={onChangeHandlerCountry}
                style={{ fontWeight: '800' }}
              />
            </FormGroup>
          </FormControl>
          <p className="text-3xl font-bold text-white  m-auto">₹</p>
        </div>
      </div>

      <BackgroundSecondary>
        <InnerBackgroundWrapper>
          <InnerBackground />
          <InnerWrapper>
            <BasicCard
              style={{}}
              title="Starter"
              price="0"
              monthlyPrice={pricingDetails.starter.monthly}
              monthlyYearly={pricingDetails.starter.monthlyYearly}
              yearlyPrice={pricingDetails.starter.yearly}
              left
              country={country}
              yearly={showMore}
              indianMonthly={pricingDetails.starter.indianmonthly}
              indianMonthlyYearly={pricingDetails.starter.indianmonthlyYearly}
              indianYearly={pricingDetails.starter.indianyearly}
            />

            <ProCard
              title="Pro"
              price="19"
              yearly={showMore}
              country={country}
              monthlyPrice={pricingDetails.pro.monthly}
              monthlyYearly={pricingDetails.pro.monthlyYearly}
              yearlyPrice={pricingDetails.pro.yearly}
              indianMonthly={pricingDetails.pro.indianmonthly}
              indianMonthlyYearly={pricingDetails.pro.indianmonthlyYearly}
              indianYearly={pricingDetails.pro.indianyearly}
            />

            <ProCard
              title="Sigma"
              yearly={showMore}
              country={country}
              monthlyPrice={pricingDetails.sigma.monthly}
              monthlyYearly={pricingDetails.sigma.monthlyYearly}
              yearlyPrice={pricingDetails.sigma.yearly}
              indianMonthly={pricingDetails.sigma.indianmonthly}
              indianMonthlyYearly={pricingDetails.sigma.indianmonthlyYearly}
              indianYearly={pricingDetails.sigma.indianyearly}
            />
          </InnerWrapper>
        </InnerBackgroundWrapper>
      </BackgroundSecondary>
    </Background>
  );
};

export default Pricing;
