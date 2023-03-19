import React, { useEffect } from 'react';
import Layout from '../components/Marketing/Layout';
import Benefits from '../LandingUI/components/benefits';
import { benefitOne, benefitTwo } from '../LandingUI/components/data';
import Link from 'next/link';
import TripleColFeatures from '../screens/Marketing/Landing/tripleColFeatures';
import UpcomingFeatures from '../screens/Marketing/Landing/upcomingFeatures.js';
import SEO from '../components/Marketing/Layout/seo';
import Footer from 'LandingUI/components/footer';
import { Mark } from 'LandingUI/components/testimonials';

const Solutions = () => {
  // seo
  const seoData = {
    title: 'Vision - Aivinya',
    description: 'AI Powered Platform for all your needs'
  };
  return (
    <>
      <SEO seoData={seoData} />
      <div>
        <section className="">
          <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
            <h1 className="md:text-2xl xl:text-3xl font-bold tracking-tight mb-12 ">
              <span className="font-extrabold text-transparent lg:text-4xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-text underline decoration-[0.5rem] decoration-[0.5rem] decoration-blue-400/50 ">
                Mission to become
              </span>{' '}
              <br />{' '}
              <div className="mt-8">
                An{' '}
                <span className="max-w-xl selection:bg-red-500">
                  {' '}
                  <Mark> everything</Mark>
                </span>{' '}
                Platform to launch an <Mark>idea</Mark> into a successful <Mark>business</Mark>{' '}
                under <Mark>budget</Mark>
              </div>
            </h1>
            <Link href="/auth/login">
              <a
                className="inline-block px-7 py-3 mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                role="button"
              >
                Get Started for Free
              </a>
            </Link>
            <Link href="/pricing">
              <a
                className="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                role="button"
              >
                Learn more
              </a>
            </Link>
          </div>
          <TripleColFeatures />
          <UpcomingFeatures />
        </section>
      </div>
      <div className="bg-black bg-cover" style={{ backgroundImage: `url("/looper-bg.svg")` }}>
        <Footer />
      </div>
    </>
  );
};

Solutions.Layout = Layout;

export default Solutions;
