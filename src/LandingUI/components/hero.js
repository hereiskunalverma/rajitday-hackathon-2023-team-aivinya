import { useState, useEffect } from 'react';
import Container from './container';
import Link from 'next/link';
import Typical from 'react-typical';

// text animation
const typingText = [
  'Efficient miniChatGPT',
  3000,
  'Coding Assistant',
  3000,
  'Resumes',
  3000,
  'Research Papers',
  3000
];

export default function Hero() {
  const [users, setUser] = useState('');

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ENV);
    const authLog = localStorage.getItem('user');
    if (authLog == null || authLog == undefined) setUser("Get Started, it's free");
    else setUser('DashBoard');
  }, []);
  return (
    <div className="m-0 mr-0 mb-8 mxa-w-screen">
      <div className="flex items-center w-full justify-center px-0 overflow-hidden">
        <div className="max-w-full text-center mb-0 mx-0 w-full overflow-hidden">
          <h1 className="animate-text text-4xl sm:text-5xl md:text-7xl mt-4 mb-4 font-medium [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
            Your AI College Companion
          </h1>

          <div className="max-w-full w-screen">
            {/* TESTIMONAL CARDS  */}
            {/* <div className="invisible lg:visible"> */}

            {/* </div> */}
            <p className="text-3xl sm:text-4xl md:text-6xl tracking-[0.02em] mb-2 text-white font-medium font-clash-grotesk inline-block">
              <Typical steps={typingText} wrapper="p" loop={Infinity} />
            </p>
          </div>
          <div className="">
            <div>
              <p className="text-base leading-normal text-white xl:text-xl">
                Empowering{' '}
                <span className="animate-text font-extrabold text-transparent  [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
                  Education
                </span>{' '}
                With{' '}
                <span className="animate-text font-extrabold text-transparent [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
                  AI
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col m-4 items-center justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
            <button className="px-8 py-4 text-lg font-medium text-center text-white rounded-3xl bg-black border-2 border-fuchsia-400">
              <Link href="/auth/login" className="">
                <a rel="noopener" className="text-white text-xl hover:text-fuchsia-400">
                  {users}
                  <br />
                </a>
              </Link>
            </button>
          </div>
          <p className="pl-0 text-white text-lg font-bold">FREE FOREVER FOR ANYONE</p>
        </div>
      </div>
      <img className="w-full object-cover md:h-full md:w-full" src="/img/robohero.png" />
      <Container className="px-3 mt-12">
        <div className="flex flex-col justify-center">
          {/* <div className="text-xl text-center text-gray-700 ">
            Trusted by <span className="text-indigo-600">2000+</span> customers worldwide
          </div> */}
          {/* <div className="text-xl font-medium text-center text-white ">
            Supported{' '}
            <span className="font-bold [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] animate-text inline-block">
              Platforms
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 md:justify-around">
            <div className="py-4 text-gray-400 ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174848.png"
                alt="facebook-logo"
                className='w-16'
              />
            </div>
            <div className="py-4 text-gray-400 ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png"
                alt="insta-logo"
                className='w-16'
              />
            </div>
            <div className="py-4 text-gray-400">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3938/3938028.png"
                alt="twitter-logo"
                className='w-16'
              />
            </div>
            <div className="py-4 text-gray-400 ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
                alt="linkedin-logo"
                className='w-16'
              />
            </div>
            <div className="py-4 text-gray-400 ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt="youtube-logo"
                className='w-16'
              />
            </div>
            <div className=" pt-4 text-xl font-medium text-center text-white">
              <span className="align-middle font-bold [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block animate-text">
                And Many More...
              </span>
            </div> 
        </div> */}
        </div>
      </Container>
    </div>
  );
}

export const GreenTick = () => {
  return (
    <div className="">
      <svg
        className="w-10 h-10 text-blue-600 m-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="#32cd32"
          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
        ></path>
      </svg>
    </div>
  );
};
