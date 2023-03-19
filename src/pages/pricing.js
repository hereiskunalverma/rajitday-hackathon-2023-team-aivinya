import React, { useState, useEffect } from 'react';
import Pricing from '../screens/Marketing/Pricing';
import Layout from '../components/Marketing/Layout';
import { overallData } from '../screens/Marketing/Pricing/pricingData';
import Link from 'next/link';
import BasicModal from './user/BasicModal';
import { PopupButton } from '@typeform/embed-react';
import SEO from '../components/Marketing/Layout/seo';
import Footer from 'LandingUI/components/footer';

const PricingPage = () => {
  // matomo analytics
  // console.log(overallData.mainData)

  // seo
  const seoData = {
    title: 'Pricing - Aivinya',
    description: 'Empowering Education with AI'
  };

  return (
    <>
      <SEO seoData={seoData} />
      <Pricing />
      <PricingMoreInfo />
      <div className="bg-black bg-cover" style={{ backgroundImage: `url("/looper-bg.svg")` }}>
        <Footer />
      </div>
    </>
  );
};

// tones data
const tones = [
  'Create Content in Human Tones',
  'Appreciative',
  'Awestruck',
  'Candid',
  'Passionate',
  'and many more'
];

// content writer data
const aicontent = [
  'Cover Letters',
  'Research Content',
  'Social Media Content',
  'Interview Questions',
  'Blogs',
  '... and many more with 20+ templates'
];

// content languages support
const languages = [
  'English',
  'Hindi',
  'Russian',
  'German',
  'French',
  '... 25+'
]

// seo
const seoData = {
  title: 'Pricing - Aivinya for Education',
  description: 'Empowering Education with AI'
};

const PricingMoreInfo = () => (
  <>
    <SEO seoData={seoData} />
    <div className="">
      <div className="w-full bg-ot-bg-black py-12">
        <div className="container mx-auto">
          <div className="w-11/12 mx-auto">
            <div className="xl:flex lg:flex items-end">
              <div className="flex flex-wrap xl:w-1/4 bg-white items-center justify-center pt-8 pb-8 lg:mb-0 xl:mb-0 md:mb-2 sm:mb-2 mb-2 shadow">
                <img src="https://cdn.tuk.dev/assets/calculator-img.png" alt="true" />
              </div>
              <div className="xl:flex lg:flex md:flex sm:flex shadow">
                <div className=" bg-white pt-8 pb-8 lg:mb-0 xl:mb-0 md:mb-0 sm:mb-0 mb-2 pl-6 pr-6 flex flex-col xl:w-1/3 lg:w-1/3 justify-center items-center border-r border-l border-gray-200">
                  <div className="mb-6">
                    <img src="https://cdn.tuk.dev/assets/paper-plane.png" alt="true" />
                  </div>
                  <p className="text-center text-2xl font-bold text-gray-800 mb-3">Starter</p>
                  <p className="text-center text-sm text-gray-600 mb-6 font-normal w-full">
                    Best to explore and try things out, pay as you scale
                  </p>
                </div>
                <div className="bg-white pt-8 pb-8 lg:mb-0 xl:mb-0 md:mb-0 sm:mb-0 mb-2 pl-6 pr-6 flex flex-col xl:w-1/3 lg:w-1/3 justify-center items-center border-r border-l border-gray-200">
                  <div className="mb-5">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/716/716606.png"
                      style={{ color: 'grey' }}
                      width={45}
                      height={45}
                    />
                  </div>
                  <p className="text-center text-2xl font-bold text-gray-800 mb-3">Pro</p>
                  <p className="text-center text-sm text-gray-600 mb-6 font-normal w-full">
                      Best for those who are hustling 
                  </p>
                </div>
                <div className="bg-white pt-8 pb-8 lg:mb-0 xl:mb-0 md:mb-0 sm:mb-0 mb-2 pl-6 pr-6 flex flex-col xl:w-1/3 lg:w-1/3 justify-center items-center border-r border-l border-gray-200">
                  <div className="mb-6">
                    <img src="https://cdn.tuk.dev/assets/start-button.png" alt="true" />
                  </div>
                  <p className="text-center text-2xl font-bold text-gray-800 mb-3">Scale</p>
                  <p className="text-center text-sm text-gray-600 mb-6 font-normal w-full">
                    Best for starting something big with out-of-the box integrations and API support
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow bg-white">
              <div className="">
                <p className="pl-4  pt-3 pb-3  bg-white text-2xl font-bold text-gray-800 w-3/12">
                  Features
                </p>
                <table className="table-fixed truncate w-full bg-white">
                  <tbody className="truncate">
                    {pricingData.map((item, key) => (
                      <tr className="truncate" key={key}>
                        <td className="w-1/4 truncate border border-gray-200 p-2 sm:p-4 text-xs sm:text-sm text-black font-medium break-words ">
                          <div className="inlineblock w-full whitespace-pre-wrap md:flex flex-row">
                            {item[0]}
                           <span className='hidden md:inline-block'>

                            {(item[0] == 'Content Tones' || item[0] == 'AI Writer' || item[0]=='Content Languages') && (

                              <BasicModal toggleButton="?">
                                {item[0] == 'AI Writer' ? (
                                  <PricingModalInfo data={aicontent} />
                                ) : (
                                  item[0] !== 'Content Languages' && 
                                  <PricingModalInfo data={tones} />
                                )}
                                {item[0] == 'Content Languages' && (
                                  <PricingModalInfo data={languages}/>
                                )}
                              </BasicModal>
                            )}
                            </span>

                          </div>
                        </td>
                        <td className="w-1/4 truncate border border-gray-200 p-2 sm:p-4 text-center text-xs sm:text-sm font-bold text-teal-700">
                          <div className="flex flex-row justify-center whitespace-pre-wrap">
                            {item[1]}
                          </div>
                        </td>
                        <td className=" truncate w-1/4 border whitespace-pre-wrap border-gray-200 p-2 sm:p-4 text-center text-xs sm:text-sm font-bold text-blue-800">
                          {item[2]}
                        </td>
                        <td className=" truncate w-1/4 border whitespace-pre-wrap border-gray-200 p-2 sm:p-4 text-center text-xs sm:text-sm font-bold text-blue-800">
                          {item[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pricing-box max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
          <div className="bg-white  px-6 py-8 lg:flex-shrink-1 lg:p-12">
            <h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9 ">
              Need Different ?
            </h3>
            <p className="mt-6 text-base leading-6 text-gray-500 ">
              We also have enterprise support, contact us, tell your requirements and we'll set up
              for you 😉
            </p>
            <div className="mt-8">
              <div className="flex items-center">
                <h4 className="flex-shrink-0 pr-4 bg-white  text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">
                  What&#x27;s included
                </h4>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>
              <ul className="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                {overallData.plans.custom.map((item, key) => (
                  <li className="flex items-start lg:col-span-1" key={key}>
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        stroke="currentColor"
                        fill="#10b981"
                        viewBox="0 0 1792 1792"
                      >
                        <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-sm leading-5 text-gray-700 ">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-8 px-6 text-center bg-gray-50  lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
            <div className="mt-6">
              <div className="rounded-md shadow">
                <PopupButton
                  id="YyDm7tiz"
                  style={{ fontSize: 20 }}
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Contact Sales
                </PopupButton>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </>
);

PricingPage.Layout = Layout;

// modal data
const PricingModalInfo = (data) => {
  // console.log(data)
  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-lg border shadow-md sm:p-8 ">
      <ul role="list" className="my-7 space-y-5">
        {data.data.map((item, index) => (
          <li className="flex space-x-3" key={index}>
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-blue-600 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-normal leading-tight text-gray-800 ">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const pricingData = [];

function preprocessData() {
  for (let i = 0; i < overallData.mainData.length; i++) {
    const temp = [];
    temp.push(overallData.mainData[i]);
    temp.push(overallData.plans.starter[i]);
    temp.push(overallData.plans.pro[i]);
    temp.push(overallData.plans.sigma[i]);
    pricingData.push(temp);
  }
}

preprocessData();
// console.log(pricingData)
PricingPage.Layout = Layout;

export default PricingPage;
