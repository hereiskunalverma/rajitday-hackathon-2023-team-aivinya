import React from 'react';
import Layout from '../../components/User/Layout';
import Dashboard from '../../screens/User/Dashboard';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const DashboardPage = () => {
  useEffect(() => {
    console.log('on dashboard');
    // document.cookie = `user=${localStorage.getItem("user")};domain=.www.aivinya.com;path=/;`;

    // let user="user"
    // let value=localStorage.getItem("user");
    // let expires = "";
    // let host = location.host;
    // let domainParts = host.split('.');
    // domainParts.shift();
    // let domain = '.'+domainParts.join('.');
    // document.cookie = user+"="+value+expires+"; path=/";
    // domain = "domain=" + (document.domain.match(/[^\.]*\.[^.]*$/)[0]) + ";";
    // cookies.set('myName', 'Aman', { path: '/', domain: domain });

    console.log(document.cookie);

    // browser.cookie.set()
  });

  return <Dashboard />;
};

DashboardPage.Layout = Layout;

export default DashboardPage;
