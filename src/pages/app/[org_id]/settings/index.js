import { OrgSettings } from '../../../../screens/App/Settings';
import AppLayout from '../../../../components/App/AppLayout';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const OrgSettingsPage = () => {
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
        <OrgSettings />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

OrgSettingsPage.Layout = AppLayout;

export default OrgSettingsPage;
