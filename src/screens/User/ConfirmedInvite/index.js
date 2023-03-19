import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';

import SEO from '../../../components/Marketing/Layout/seo';
import ConfirmButton from '../../../components/Purchase/purchaseButton';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import Card from '../../../components/Common/Card';

const Wrapper = styled.div`
  text-align: center;
  padding-top: 3rem;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 38rem;
  }
`;

const StyledCard = styled(Card)`
  margin: 0;
  max-width: 38rem;
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const ConfirmedInvite = () => {
  const location = useRouter();

  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [org_id, setOrgId] = useState();

  let invite_key;

  /* eslint-disable */
  useEffect(() => {
    if (!location.isReady) return;
    invite_key = location.query.id;

    if (authState.user.id && location.isReady) verifyInvite();
  }, [authState, location.isReady]);
  /* eslint-enable */

  const verifyInvite = async () => {
    //verify invite key, returing org id.
    let user_id = authState.user.id;

    let data = { invite_key };
    let result = await axios
      .post('/api/users/verify-invite', data)
      .catch((err) => fetchFailure(err));

    let org_id = result.data.org_id;
    setOrgId(org_id);
    createRole(org_id, user_id);
  };

  const createRole = async (org_id, user_id) => {
    fetchInit();
    let role = 'user';

    let data = {
      org_id,
      user_id,
      role
    };

    await axios.post(`/api/post/role`, data).catch((err) => {
      fetchFailure(err);
    });
    fetchSuccess();
  };

  const seoData = {
    title: 'AIvinya -  Confirmed Invite page',
    description: 'AIvinya -  Confirmed Invite page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        {isLoading && <LoadingOverlay isLoading />}
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md   text-center">
          <p className="mb-2 text-xl font-semibold tracking-tight text-green-400">
            Your invite to the app has been confirmed
          </p>
          <Link href={`/app/${org_id}/dashboard`}>
            <a className="inline-flex items-center text-blue-600 hover:underline">
              <svg
                className="mb-2 w-10 h-10 text-gray-500 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clipRule="evenodd"
                ></path>
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
              </svg>
              Go To App
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
      </Wrapper>
    </React.Fragment>
  );
};

export default ConfirmedInvite;
