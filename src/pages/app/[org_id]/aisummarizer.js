import AIContentOption4 from 'screens/App/AIContentOption4';
import AppLayout from '../../../components/App/AppLayout';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const AIContentOption4Page = () => {
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
        <AIContentOption4 />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

AIContentOption4Page.Layout = AppLayout;

export default AIContentOption4Page;
