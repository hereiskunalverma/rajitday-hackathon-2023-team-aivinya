import React, { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import AlertMessage from 'LandingUI/components/alert';

import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import 'antd/dist/antd.css';
import './styles.css';

import AuthContext from '../utils/authContext';
import { authReducer, initialStateAuth } from '../store/reducers/authReducer';
import { Login, Logout } from '../store/actions/actions';
import OrgContext from '../utils/orgContext';
import { orgReducer, initialStateOrg } from '../store/reducers/orgReducer';
import { Remove_Org, Set_Org } from '../store/actions/actions';
import ApiContext from '../utils/apiContext';
import { apiReducer, initialStateApi } from '../store/reducers/apiReducer';
import { Fetch_failure, Fetch_init, Fetch_success } from '../store/actions/actions';
import CaslContext from '../utils/caslContext';
import { ability } from '../utils/caslAbility';
import { firebaseApp as firebase } from '../services/firebase';
import { theme } from '../styles/theme';
import { pageView } from '../services/analytics';
import { silentAuth } from '../utils/helpers';
import { useCookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';

// matomo
import { init } from '@socialgouv/matomo-next';

const NoLayout = ({ children }) => children;

function MyApp(props) {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth);
  const [apiState, dispatchApi] = useReducer(apiReducer, initialStateApi);
  const [orgState, dispatchOrg] = useReducer(orgReducer, initialStateOrg);

  const router = useRouter();

  /* eslint-disable */
  useEffect(() => {
    silentAuth(LogIn, LogOut);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  /* eslint-enable */

  const { Component, pageProps } = props;

  const Layout = Component.Layout || NoLayout;

  const LogIn = (user) => {
    dispatchAuth(Login(user));
  };

  const LogOut = () => {
    if (
      JSON.parse(localStorage.getItem('org')) != undefined ||
      JSON.parse(localStorage.getItem('user')) != null ||
      JSON.parse(localStorage.getItem('user')) != undefined
    ) {
      localStorage.removeItem('org');
      localStorage.removeItem('user');
      dispatchAuth(Logout);
      dispatchOrg(Remove_Org);
      firebase.auth().signOut();
      AlertMessage('Logged out successfully', 'success');
      router.push('/');
      return;
    }
    dispatchAuth(Logout);
    dispatchOrg(Remove_Org);
    firebase.auth().signOut();
  };

  const fetchFailure = (error) => {
    dispatchApi(Fetch_failure(error));
    return;
  };

  const fetchInit = () => {
    dispatchApi(Fetch_init);
  };

  const fetchSuccess = () => {
    dispatchApi(Fetch_success);
  };

  const SetOrg = (payload) => {
    dispatchOrg(Set_Org(payload));
  };

  return (
    <CookiesProvider>
      <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
        <ApiContext.Provider value={{ apiState, fetchFailure, fetchInit, fetchSuccess }}>
          <OrgContext.Provider value={{ SetOrg, orgState }}>
            <CaslContext.Provider value={ability}>
              <ThemeProvider theme={theme}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </CaslContext.Provider>
          </OrgContext.Provider>
        </ApiContext.Provider>
      </AuthContext.Provider>
    </CookiesProvider>
  );
}

export default MyApp;
