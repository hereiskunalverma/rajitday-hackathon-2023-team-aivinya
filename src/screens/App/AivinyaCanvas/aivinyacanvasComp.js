import React, { useState, useEffect } from 'react';
import AlertMessage from 'LandingUI/components/alert';
import { CircularProgress } from '@mui/material';
import axios from '../../../services/axios';
import { FcFlashOn } from 'react-icons/fc';
import Link from 'next/link';
import { BetaBadge } from 'components/Common/BetaBadge';

const AivinyaCanvasComp = () => {
  const token = JSON.parse(localStorage.getItem('user')).jwt_token;
  const plan = JSON.parse(localStorage.getItem('org')).plan;
  return (
    <>
      <div className="text-center">
        <div className=" text-center m-auto p-6 max-w bg-white rounded-lg border border-gray-200 shadow-md ">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Auto Generate Image Posts with AI <BetaBadge size="xl"/>
            </h5>
          </a>
          <iframe
            className="m-auto"
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/eSCcuGTs1n0"
            title="Aivinya Canvas Tutorial"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="overflow-x-auto text-center">
        <div className="min-w-screen  bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className=" shadow-md rounded my-6">
            <Link target="_blank" href={`https://canvas.aivinya.com/?user=${token}&plan=${plan}`}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Let's Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AivinyaCanvasComp;
