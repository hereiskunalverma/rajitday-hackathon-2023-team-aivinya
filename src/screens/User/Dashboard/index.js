import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Empty } from 'antd';
import AlertMessage from 'LandingUI/components/alert';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { silentAuth } from 'utils/helpers';
import { breakpoints } from '../../../styles/theme';
import Axios from 'axios';
import axios from '../../../services/axios';

import SEO from '../../../components/Marketing/Layout/seo';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import Button from '../../../components/Common/buttons/PrimaryButton';

import DangerButton from '../../../components/Common/buttons/DangerButton';
import TextInput from '../../../components/Common/forms/TextInput';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInputWrapper from '../../../components/Common/forms/TextInputWrapper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CircularProgress from '@mui/material/CircularProgress';
import SkeletonDataCard from '../../../components/Common/SkeletonDataCard';
import Card from '@mui/material/Card';
import { useRouter } from 'next/router';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;

  @media (min-width: ${breakpoints.medium}) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  // max-width: 24rem;
  width: 100%;
`;

const CreateAppWrapper = styled.div`
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

const AppsSection = styled.div`
  margin: 0;
  @media (min-width: ${breakpoints.medium}) {
    margin-right: 5rem;
  }
`;

const StyledHeader = styled.h1`
  text-align: center;
  @media (min-width: ${breakpoints.medium}) {
    text-align: left;
  }
`;

const AppsWrapper = styled.div`
  width: 100%;
  padding-bottom: 3rem;
  display: block;

  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
  }
`;

const Dashboard = () => {
  const { authState, LogOut, LogIn } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [orgs, setOrgs] = useState([]);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };
  const [loadingData, setLoadingData] = useState(false);
  const [planData, setPlanData] = useState(null);

  // const getAdminData = async () => {
  //   setLoadingData(true);
  //   const url = process.env.NEXT_PUBLIC_BACKEND_URL
  //   await axios.post(`${url}/api/plan/admin`, {
  //     userId: authState.user.id
  //   })
  //     .then((res) => {
  //       setLoadingData(false);
  //       setPlanData(res.data);
  //     })
  //     .catch((err) => {
  //       setLoadingData(false);
  //     });
  // }

  // useEffect(() => { getAdminData() })

  const router = useRouter();

  /* eslint-disable */
  useEffect(() => {
    // AlertMessage("Welcome to dashboard", "success")
    const authLog = localStorage.getItem('user');
    if (authLog == null || authLog == undefined || !authState || !authState.user) {
      AlertMessage('Please login to continue', 'error');
      router.push('/auth/login');
    }

    if (authState.user.id) {
      AlertMessage('Loading your data...', 'info');
      getOrgs();
      // getAdminData();
    } else router.push('/auth/login');
  }, []);
  /* eslint-enable */

  const getOrgs = async () => {
    setLoadingData(true);
    let user_id = authState.user.id;

    let params = {
      user_id
    };
    const result = await axios.get(`/api/org`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });
    if (!result) return;
    console.log(result);
    let adminOrgs = result.data.filter((item) => item.role === 'admin');

    setOrgs(adminOrgs);
    setLoadingData(false);
    fetchSuccess();
  };

  const postOrg = async (event) => {
    event.preventDefault();
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    let plan = {
      workspace: 1,
      team_members: 1
    };
    await Axios.post(`${url}api/plan/getUserPlan`, {
      userId: authState.user.id
    })
      .then((res) => {
        console.log(res);
        plan = res.data;
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
        AlertMessage('something went wrong', 'error');
      });
    if (!plan.success) return;
    if (orgs.length >= 5) {
      setLoadingData(false);
      AlertMessage('Max Limit Reached', 'error');
      return;
    } else if (orgs.length >= plan.workspace) {
      setLoadingData(false);
      AlertMessage('Max Limit Reached', 'error');
      AlertMessage('Upgrade your subscription.', 'success');
      return;
    }
    // event.preventDefault();
    fetchInit();

    let org_name = event.target.name.value;
    let email = authState.user.email;
    let user_id = authState.user.id;
    let role = 'admin';

    let data = {
      org_name,
      role,
      email,
      user_id
    };
    await axios.post(`${url}api/org`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });
    setLoadingData(true);
    getOrgs();
    fetchSuccess();
    setLoadingData(false);
  };

  const seoData = {
    title: 'AIvinya -  Dashboard page',
    description: 'AIvinya -  Dashboard page'
  };

  const goToWorkspace = async (orgId, orgName) => {
    AlertMessage(`Loading ${orgName} workspace...`, 'info');
    setLoadingData(true);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    await Axios.post(`${url}api/plan/get-plan`, {
      orgId: orgId
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('org', JSON.stringify(res.data));
        console.log('org', localStorage.getItem('org'));
        setLoadingData(false);
        router.push(`/app/${orgId}/dashboard`);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
        AlertMessage('Something went wrong', 'error');
      });
  };

  return (
    <React.Fragment>
      <div
        className="overflow-hidden"
        style={{ display: 'flex', flexDirection: 'row', maxWidth: '100vw' }}
      >
        <SEO seoData={seoData} />

        <div>
          {isLoading && <LoadingOverlay isLoading />}
          <p className="text-4xl font-bold leading-snug tracking-tight text-black-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight ">
            Dashboard
          </p>
          <ContentWrapper
            className="flex items-center justify-center"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <AppsSection>
              <h2>My Workspaces :</h2>

              <div className="flex">
                <AppsWrapper className="flex items-center justify-center">
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full mx-0"
                    style={{ margin: '0px' }}
                  >
                    <CreateAppWrapper className=" pr-0 lg:pr-3 m-3 m-3 ml-0 -ml-3 lg:-ml-0">
                      <form onSubmit={postOrg} style={{ width: '100%' }}>
                        <div className="max-w-md bg-white hover:shadow-2xl rounded-lg border  border-gray-200 shadow-md ">
                          <div className="p-5 px-3">
                            <a href="#">
                              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
                                Create New Workspace
                              </h5>
                            </a>
                            <TextInputWrapper>
                              <FieldLabel htmlFor="name">
                                Create: <TextInput type="text" name="name" />
                              </FieldLabel>
                            </TextInputWrapper>
                            <Button
                              type="submit"
                              className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white ${!isLoading ? 'bg-blue-700' : 'bg-white'
                                } rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 `}
                            >
                              {isLoading ? <CircularProgress color="inherit" /> : 'Save'}
                              {!isLoading && (
                                <svg
                                  aria-hidden="true"
                                  className="ml-2 -mr-1 w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              )}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CreateAppWrapper>

                    {loadingData && <SkeletonDataCard />}
                    {!orgs.length == 0 ? (
                      orgs.map((org) => (
                        <div
                          key={org.id}
                          className="p-5 m-3 ml-0 -ml-3 lg:-ml-0 hover:shadow-xl w-md lg:w-md bg-white rounded-lg border border-gray-200 shadow-md"
                          style={{ height: '231px' }}
                        >
                          <DashboardIcon fontSize="large" />

                          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                            {org.org_name}
                          </h5>
                          <p className="mb-3 font-normal text-gray-500 ">
                            Role:
                            <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                              Admin
                            </span>
                          </p>
                          <div state={{ org }} onClick={() => goToWorkspace(org.id, org.org_name)}>
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
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="p-5 m-3 ml-0 -ml-3 lg:-ml-0 hover:shadow-xl w-md lg:w-md bg-white rounded-lg border border-gray-200 shadow-md"
                        style={{ height: '231px' }}
                      >
                        <DashboardIcon fontSize="large" />

                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                          No Workspaces
                        </h5>
                        <Link href="#">
                          <a className="inline-flex items-center text-blue-600 hover:underline">
                            Create One to get started
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </AppsWrapper>
              </div>
            </AppsSection>
          </ContentWrapper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
