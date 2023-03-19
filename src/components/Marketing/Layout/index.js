import React from 'react';
import Headroom from 'react-headroom';
import SEO from './seo';
import Header from '../Navigation/header';
import Footer from '../Navigation/footer';

const Layout = ({ children }) => {
  const seoData = {
    title: 'AIvinya Education',
    description: 'Empowering Education with AI'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Headroom>
        <Header />
      </Headroom>
      <div>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
