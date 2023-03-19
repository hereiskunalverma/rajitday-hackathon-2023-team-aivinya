import Link from 'next/link';
import React, { useState } from 'react';
import axios from '../../services/axios';
import AlertMessage from './alert';
import { CircularProgress } from '@mui/material';

export default function Footer() {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <Link href="/">
            <a className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 ">
              <span>
                <img src="/img/logo_withoutname.png" className="w-24" />
              </span>
              {/* <span className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 animate-text ">AIvinya</span> */}
              {/* <span className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600  animate-text"><span className='text-5xl'>Ai</span>vinya</span> */}
            </a>
          </Link>

          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-white">Aivinya for Education</p>
            <p className="mt-4 text-sm text-white">Empowering Students with AI</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-bold tracking-wide text-white">Solutions</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/">
                  <a className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
                    AI Writer
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
                    AivaChat
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
                    Integrations
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
                    API Support
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold tracking-wide text-white">Help</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/contact">
                  <a className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
                    Support
                  </a>
                </Link>
              </li>
            </ul>
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Discord = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.98,5.69c-1.68-1.34-4.08-1.71-5.12-1.82h-0.04c-0.16,0-0.31,0.09-0.36,0.24c-0.09,0.23,0.05,0.48,0.28,0.52 c1.17,0.24,2.52,0.66,3.75,1.43c0.25,0.15,0.31,0.49,0.11,0.72c-0.16,0.18-0.43,0.2-0.64,0.08C15.56,5.38,12.58,5.3,12,5.3 S8.44,5.38,6.04,6.86C5.83,6.98,5.56,6.96,5.4,6.78C5.2,6.55,5.26,6.21,5.51,6.06c1.23-0.77,2.58-1.19,3.75-1.43 c0.23-0.04,0.37-0.29,0.28-0.52c-0.05-0.15-0.2-0.24-0.36-0.24H9.14C8.1,3.98,5.7,4.35,4.02,5.69C3.04,6.6,1.09,11.83,1,16.46 c0,0.31,0.08,0.62,0.26,0.87c1.17,1.65,3.71,2.64,5.63,2.78c0.29,0.02,0.57-0.11,0.74-0.35c0.01,0,0.01-0.01,0.02-0.02 c0.35-0.48,0.14-1.16-0.42-1.37c-1.6-0.59-2.42-1.29-2.47-1.34c-0.2-0.18-0.22-0.48-0.05-0.68c0.18-0.2,0.48-0.22,0.68-0.04 c0.03,0.02,2.25,1.91,6.61,1.91s6.58-1.89,6.61-1.91c0.2-0.18,0.5-0.16,0.68,0.04c0.17,0.2,0.15,0.5-0.05,0.68 c-0.05,0.05-0.87,0.75-2.47,1.34c-0.56,0.21-0.77,0.89-0.42,1.37c0.01,0.01,0.01,0.02,0.02,0.02c0.17,0.24,0.45,0.37,0.74,0.35 c1.92-0.14,4.46-1.13,5.63-2.78c0.18-0.25,0.26-0.56,0.26-0.87C22.91,11.83,20.96,6.6,19.98,5.69z M8.89,14.87 c-0.92,0-1.67-0.86-1.67-1.91c0-1.06,0.75-1.92,1.67-1.92c0.93,0,1.67,0.86,1.67,1.92C10.56,14.01,9.82,14.87,8.89,14.87z M15.11,14.87c-0.93,0-1.67-0.86-1.67-1.91c0-1.06,0.74-1.92,1.67-1.92c0.92,0,1.67,0.86,1.67,1.92 C16.78,14.01,16.03,14.87,15.11,14.87z"></path>
  </svg>
);

const WhatsApp = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
  </svg>
);

const Telegram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    // registering email via redux store
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };

      const newEmail = {
        email
      };
      // console.log(email)
      const body = JSON.stringify(newEmail);
      const res = await axios.post(`/api/user/subscribe`, body, config);
      console.log(res.data);

      AlertMessage("We've got you!", 'success');
      setEmail('');
      setLoading(false);
    } catch (err) {
      console.log(err);
      AlertMessage('Please try again later', 'error');
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">
          Stay up to date for latest features
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="bg-white border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="john.doe@user.com"
          required
        />
        <div className="py-2">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? <CircularProgress color="inherit" /> : 'Subscribe'}
          </button>
        </div>
      </form>
    </>
  );
};
