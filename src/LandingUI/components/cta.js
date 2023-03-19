import React, { useState } from 'react';
import Link from 'next/link';
import Container from './container';
import CustomModal from './CustomModal';
import { CircularProgress } from '@mui/material';
import axios from '../../services/axios';
import { GreenTick } from './hero';

export default function Cta() {
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const addWaitlist = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/api/post/joinwaitlist`, { email: email });
      // console.log(resp)
      setIsSubmit(true);
      setLoading(false);
      setEmail('');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Container className="px-0">
      <div className="flex flex-wrap items-center justify-between w-full max-w-6xl mx-auto text-white bg-none px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-3xl border-2 border-fuchsia-400">
        <div className="flex-grow text-center mt-16 mb-8 lg:text-left">
          <h2 className="text-4xl text-transparent animate-text sm:text-7xl [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] ">
            Power Your College Life with AI
          </h2>
          <p className="mt-2 font-medium font-bold text-white lg:text-xl">
            Save 60% of your precious College Time
          </p>
        </div>
        <div className="flex flex-shrink-0 justify-center text-center ">
          <Link href="/auth/login">
            <a
              rel="noopener"
              className="inline-block py-3 text-lg font-small text-center text-white bg-none border-2 border-fuchsia-400 rounded-full px-7 lg:px-10 lg:py-5 "
            >
              Get Started
            </a>
          </Link>

          
        </div>
      </div>
    </Container>
  );
}
