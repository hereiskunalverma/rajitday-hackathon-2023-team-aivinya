import AIContentOption2 from 'screens/App/AIContentOption2';
import AppLayout from '../../../components/App/AppLayout';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const AIContentOption2Page = () => {
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
        <AIContentOption2 />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

AIContentOption2Page.Layout = AppLayout;

export default AIContentOption2Page;
