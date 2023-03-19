import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import Banner from './banner';
import Navbar from '../../../LandingUI/components/navbar';

const Header = () => {
  return (
    <>
      <Banner />
      <Navbar />
    </>
  );
};

export default Header;
