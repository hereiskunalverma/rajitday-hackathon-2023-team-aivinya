import Dashboard from '../../../screens/App/Dashboard';
import AppLayout from '../../../components/App/AppLayout';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useCookies } from 'react-cookie';
import OrgContext from '../../../utils/orgContext';
import AuthContext from '../../../utils/authContext';
import { useContext } from 'react';

import { useState, useEffect } from 'react';

const DashPage = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);

  //  const orgState  = useContext(OrgContext);
  const { authState } = useContext(AuthContext);
  // const { id, stripe_customer_id, primary_email, subscription_id } = orgState;

  useEffect(() => {
    const authLog = localStorage.getItem('user');
    console.log(authLog);

    if (authLog == null || authLog == undefined) router.push('/auth/signup');
    else setAuth(true);

    // planRestrictions();
  }, []);

  return (
    <>
      {auth ? (
        <Dashboard />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

DashPage.Layout = AppLayout;

export default DashPage;
