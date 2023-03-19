import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import SEO from '../../../components/Marketing/Layout/seo';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import Card from '../../../components/Common/Card';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SkeletonDataCard from '../../../components/Common/SkeletonDataCard';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  max-width: 24rem;
  width: 100%;
`;

const RoleText = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 1.075rem;
  font-weight: 500;
  color: black;
`;

const StyledLink = styled.div`
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
`;

const TeamApps = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess } = useContext(ApiContext);
  const [teamApps, setTeamApps] = useState([]);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };
  const [isLoading, setLoading] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    if (authState.user.id) {
      getApps();
    }
  }, [authState]);
  /* eslint-enable */

  const getApps = async () => {
    fetchInit();
    setLoading(true);
    let user_id = authState.user.id;

    let params = {
      user_id
    };

    const result = await axios.get(`/api/org`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    let userApps = result.data.filter((item) => item.role === 'user');

    setTeamApps(userApps);
    fetchSuccess();
    setLoading(false);
  };

  const seoData = {
    title: 'AIvinya -  Team Apps page',
    description: 'AIvinya -  Team Apps page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <div>
          {isLoading && <SkeletonDataCard />}
          {!isLoading && !teamApps.length && <EmptyTeamApps />}
          {teamApps ? (
            teamApps.map((org) => (
              <div
                key={org.id}
                className="p-6 m-5 hover:shadow-xl max-w-sm bg-white rounded-lg border border-gray-200 shadow-md "
              >
                <GroupAddIcon fontSize="large" />

                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                  {org.id_name}
                </h5>
                <p className="mb-3 font-normal text-gray-500 ">
                  Role:
                  <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">
                    User
                  </span>
                </p>
                <Link key={org.id} href={`/app/${org.id}/dashboard`}>
                  <a className="inline-flex items-center text-blue-600 hover:underline">
                    Go to Team Workspace
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
            ))
          ) : (
            <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
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
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                  Join a team to get started
                </h5>
              </a>
              <Link href="/">
                <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                  See our guideline
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
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const EmptyTeamApps = () => {
  return (
    <div className="p-10 m-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
      <svg
        className="py-20 w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
      <a href="#">
        <h5 className="mb-2  text-xl font-semibold tracking-tight text-gray-900 ">
          Invite Team and Start Achieving Big 🏆
        </h5>
      </a>
      <p className="mb-3 font-normal text-teal-800 ">
        You can start sending invites from your workspace.
      </p>
      <Link href="/user/dashboard">
        <a className="inline-flex items-center text-blue-600 hover:underline">
          Go to Workspace
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
  );
};

export default TeamApps;
