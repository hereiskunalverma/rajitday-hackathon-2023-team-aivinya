import FeatureReq from '../../../screens/App/FeatureReq';
import AppLayout from '../../../components/App/AppLayout';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const FeatureRequest = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authLog = localStorage.getItem('user');
    console.log(authLog);
    if (authLog == null || authLog == undefined) router.push('/auth/signup');
    else setAuth(true);
  }, []);

  return (
    <>
      {auth ? (
        <FeatureReq />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

FeatureRequest.Layout = AppLayout;

export default FeatureRequest;
