import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { LoginAuth } from '../helpers';
import { colors } from '../../../styles/theme';

import SEO from '../../../components/Marketing/Layout/seo';
import ErrorText from '../../../components/Common/errorText';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import Button from '../../../components/Auth/Buttons/authButton';
import Label from '../../../components/Auth/authFormLabel';
import Input from '../../../components/Common/forms/TextInput';
import ContinueWith from '../../../components/Auth/continueWith';
import GoogleButton from '../../../components/Auth/Buttons/googleButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import LoginFormHeader from './loginFormHeader';
import AuthCard from '../../../components/Auth/authCard';
import CircularProgress from '@mui/material/CircularProgress';

const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const ForgotPassword = styled.div`
  text-decoration: underline;
  color: blue;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
`;

const RememberMeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RememberMeLabel = styled.label`
  margin-left: 0.1rem;
  font-size: 0.925rem;
  color: ${colors.coolGray900};
`;

const StyledLink = styled.a`
  color: ${colors.royalBlue};
`;

const Login = () => {
  // const org = JSON.parse(localStorage.getItem('org'));
  const location = useRouter();
  const { firebase, LogIn } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [invite_key, setInviteKey] = useState();
  const [isInviteFlow, setInviteFlow] = useState();

  /* eslint-disable */
  //extract data from query params
  useEffect(() => {
    if (!location.isReady) return;
    setInviteFlow(location.query.isInviteFlow);
    setInviteKey(location.query.verify_key);
  }, [location.isReady]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  /* eslint-enable */

  const handleSubmit = async (values) => {
    fetchInit();
    let email = values.email;
    let password = values.password;

    let authRes = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    LoginAuth(authRes, LogIn, firebase, fetchFailure, isInviteFlow, invite_key, location);
  };

  //Google OAuth2 Signin
  const GoogleSignin = async (event) => {
    event.preventDefault();
    await fetchInit();
    console.log('fetchedinit');
    let provider = new firebase.auth.GoogleAuthProvider();
    console.log('provider: ' + provider);

    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
        console.log(error);
      });

    LoginAuth(authRes, LogIn, firebase, fetchFailure, isInviteFlow, invite_key, location);
  };

  const seoData = {
    title: 'AIvinya -  Login Page',
    description: 'AIvinya -  Login Page'
  };

  return (
    <React.Fragment>
      <section>
        <SEO seoData={seoData} />
        {isLoading && <LoadingOverlay isLoading />}
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img src="/logintest.png" className="w-full" alt="Login image" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 text-center ">
              <div className="py-3">
                <LoginFormHeader />
              </div>
              <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <input
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="super@user.com"
                      />
                    </div>
                    {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                    <div className="mb-6">
                      <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="my super user password"
                        // type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <ErrorText>{errors.password}</ErrorText>
                    )}
                    <ForgotPasswordWrapper>
                      <RememberMeWrapper>
                        <input id="remember_me" name="remember_me" type="checkbox" />
                        <RememberMeLabel htmlFor="remember_me">Remember me</RememberMeLabel>
                      </RememberMeWrapper>

                      <ForgotPassword>
                        <Link href="/auth/passwordreset" passHref>
                          <StyledLink>Forgot your password?</StyledLink>
                        </Link>
                      </ForgotPassword>
                    </ForgotPasswordWrapper>
                    <button
                      type="submit"
                      className={`inline-block px-7 border-2 py-3 ${
                        isLoading ? 'bg-white' : 'bg-blue-600'
                      } text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg ${
                        !isLoading && 'focus:bg-blue-700'
                      } focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full`}
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      {isLoading ? <CircularProgress /> : 'Sign In'}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
