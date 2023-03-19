import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Marketing/Layout';
import ContactForm from '../screens/Marketing/contactpage';
import { CircularProgress } from '@mui/material';
import axios from '../services/axios';
import SEO from '../components/Marketing/Layout/seo';
import Footer from 'LandingUI/components/footer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  border: '0 none transparent',
  boxShadow: 24,
  p: 4
};

const Support = () => {
  // matomo analytics

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const handleForm = () => setShowContactForm(!showContactForm);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/docs/get/books');
      console.log(res.data.data);
      setBooks(res.data.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // seo
  const seoData = {
    title: 'Contact - Aivinya',
    description: 'Empowering Education with AI'
  };

  return (
    <>
      <SEO seoData={seoData} />
      <div>
        <div className="relative py-16 bg-gradient-to-b from-indigo-700 to-indigo-600 flex justify-center items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-10 text-white">
              We're here to help
            </h1>
            {/* <div className="bg-indigo-800 rounded relative mt-6 lg:mt-14 py-4 pl-4 flex items-center w-full">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <circle cx={10} cy={10} r={7} />
                                    <line x1={21} y1={21} x2={15} y2={15} />
                                </svg>
                            </div>
                            <input type="text" placeholder="Search for answers" className=" ml-4 w-full bg-transparent text-base leading-none text-white placeholder-white focus:outline-none" />
                        </div> */}
          </div>
        </div>
        <div className="container mx-auto py-9 flex flex-col items-center justify-center">
          {loading && <CircularProgress color="inherit" size={90} />}
          {/* <div role="list" className="w-11/12 md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {books?.map((item) => (
              <div role="listitem" className="focus:outline-none" key={item.id}>
                <Link href="https://docs.aivinya.com/shelves/aivinya-tutorials-public">
                  <a
                    target={'_blank'}
                    rel="noopener noreferrer"
                    className="bg-white focus:outline-none shadow-md flex items-center p-4 lg:p-8 cursor-pointer"
                  >
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-adjustments-horizontal"
                          width={32}
                          height={32}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#3730A3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx={14} cy={6} r={2} />
                          <line x1={4} y1={6} x2={12} y2={6} />
                          <line x1={16} y1={6} x2={20} y2={6} />
                          <circle cx={8} cy={12} r={2} />
                          <line x1={4} y1={12} x2={6} y2={12} />
                          <line x1={10} y1={12} x2={20} y2={12} />
                          <circle cx={17} cy={18} r={2} />
                          <line x1={4} y1={18} x2={15} y2={18} />
                          <line x1={19} y1={18} x2={20} y2={18} />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className=" text-lg font-medium leading-none text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm  lg:leading-normal text-gray-600 mt-2 2xl:w-7/12">
                          {item.description}
                        </p>
                        <p className="text-xs lg:leading-normal text-gray-600 mt-2 2xl:w-7/12">
                          Author: Kunal Verma
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div> */}
          <div className="mt-9 md:mt-11 lg:mt-16">
            <div className="text-center">
              {/* TODO: for self help doc */}
              {/* <h1 className="text-3xl font-medium leading-loose text-gray-800">Didn’t find an answer?</h1> */}
              <p className="mx-4 md:mx-0 mb-4 text-base leading-none text-gray-600 mt-4">
                Submit a request below we'll reach out real quick 😉
              </p>
            </div>
            {/* <div role="list" aria-label="Our Team mates" className="flex flex-wrap items-center justify-around mt-2 ">
                            <div role="listitem" className="focus:outline-none">
                                <img src="https://www.openthrone.io/static/media/kunalverma.b921bef2fed66dddabb7.jpeg" style={{borderRadius: "50%"}} width="80px" height="80px"  alt="Display avatar of Kunal Verma" role="img" />
                                <p className="text-base font-semibold leading-none text-gray-800 mt-2">Kunal Verma</p>
                                <p className="text-base leading-none text-gray-600 mt-2">Developer</p>
                            </div>
                            <div role="listitem" className="focus:outline-none">
                                <img src="https://www.openthrone.io/static/media/abhayagarwal.af684f8e48f04bb80d38.jpeg" style={{borderRadius: "50%"}} width="80px" height="80px"  alt="Display avatar of Abhay Agarwal" role="img" />
                                <p className="text-base font-semibold leading-none text-gray-800 mt-2">Abhay Agarwal</p>
                                <p className="text-base leading-none text-gray-600 mt-2">Support</p>
                            </div>
                            <div role="listitem" className="focus:outline-none">
                                <img src="https://www.openthrone.io/static/media/jayantthakur.fb2333cdb7811b455029.jpeg" style={{borderRadius: "50%"}} width="80px" height="80px" alt="Display avatar of Jayant Thakur" role="img" />
                                <p className="text-base font-semibold leading-none text-gray-800 mt-2">Jayant Thakur</p>
                                <p className="text-base leading-none text-gray-600 mt-2">Support</p>
                            </div>
                        </div> */}
            <div className="flex justify-center items-center pb-4">
              <button
                className="mt-4 md:mt-6 py-3 px-6 bg-indigo-800 hover:bg-indigo-700 rounded text-white text-center font-medium text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800"
                onClick={handleForm}
              >
                {showContactForm ? 'Close' : 'Submit a Request'}
              </button>
            </div>
            {showContactForm && <ContactForm />}
          </div>
        </div>
      </div>
      <div className="bg-black bg-cover" style={{ backgroundImage: `url("/looper-bg.svg")` }}>
        <Footer />
      </div>
    </>
  );
};

Support.Layout = Layout;

export default Support;
