import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { ValidSchema, SignupAuth } from '../helpers';

import SEO from '../../../components/Marketing/Layout/seo';
import ErrorText from '../../../components/Common/errorText';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';
import Button from '../../../components/Auth/Buttons/authButton';
import AuthCard from '../../../components/Auth/authCard';
import Label from '../../../components/Auth/authFormLabel';
import Input from '../../../components/Common/forms/TextInput';
import ContinueWith from '../../../components/Auth/continueWith';
import GoogleButton from '../../../components/Auth/Buttons/googleButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import SignUpFormHeader from './signupFormHeader';
import CircularProgress from '@mui/material/CircularProgress';

// TODO: replace with actual data
const getData = () => ({
  site: {
    siteMetadata: {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    }
  }
});

const Signup = () => {
  console.log(process.env.NEXT_SITE_URL);
  const location = useRouter();
  const data = getData();
  const domainUrl = data.site.siteMetadata.siteUrl;
  const { firebase } = useContext(AuthContext);
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
  /* eslint-disable */

  const handleSubmit = async (values) => {
    fetchInit();

    let email = values.email;
    let password = values.password;
    let username = values.username;

    let authRes = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(
      authRes,
      firebase,
      fetchFailure,
      username,
      domainUrl,
      isInviteFlow,
      invite_key,
      location
    );
  };

  //Google OAuth2 Signin
  const GoogleSignin = async () => {
    fetchInit();
    let provider = new firebase.auth.GoogleAuthProvider();

    //wait for firebase to confirm signup
    let authRes = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        fetchFailure(error);
      });

    SignupAuth(
      authRes,
      firebase,
      fetchFailure,
      null,
      domainUrl,
      isInviteFlow,
      invite_key,
      location
    );
  };

  const seoData = {
    title: 'AIvinya -  Sign up Page',
    description: 'AIvinya -  Sign up Page'
  };

  return (
    <React.Fragment>
      <section>
        <SEO seoData={seoData} />
        {isLoading && <LoadingOverlay open={isLoading} />}
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img src="/img/signup.jpg" className="w-full" alt="Phone image" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 text-center ">
              <div className="py-3">
                <SignUpFormHeader />
              </div>
              <Formik
                validationSchema={ValidSchema}
                initialValues={{ email: '', password: '', username: '' }}
                onSubmit={handleSubmit}
              >
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
                        data-test-id="email"
                        placeholder="super@user.com"
                      />
                    </div>
                    {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                    <div className="mb-6">
                      <input
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text"
                        name="username"
                        id="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="my username"
                        data-test-id="username"
                      />
                    </div>
                    {errors.username && touched.username && (
                      <ErrorText>{errors.username}</ErrorText>
                    )}
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
                        data-test-id="password"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <ErrorText>{errors.password}</ErrorText>
                    )}

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
                      {isLoading ? <CircularProgress /> : 'Sign Up'}
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

export default Signup;
