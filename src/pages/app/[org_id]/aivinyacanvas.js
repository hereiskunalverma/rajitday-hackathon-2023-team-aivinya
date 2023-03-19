import AivinyaCanvasComp from 'screens/App/AivinyaCanvas/aivinyacanvasComp';
import AppLayout from '../../../components/App/AppLayout';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

const AivinyaCanvasPage = () => {
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
        <AivinyaCanvasComp />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

AivinyaCanvasPage.Layout = AppLayout;

export default AivinyaCanvasPage;
