import React from 'react';
import styled from 'styled-components';
import SEO from '../../../components/Marketing/Layout/seo';
import Title from '../../../components/Auth/title';
import { colors, breakpoints } from '../../../styles/theme';
import Link from 'next/link';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  display: flex;
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const TitleWrapper = styled.div`
  max-width: 36rem;
  text-align: center;
`;

const EmailConfirm = () => {
  const seoData = {
    title: 'AIvinya -  Confirm Email Page',
    description: 'AIvinya -  Confirm Email Page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
          <a>
            <img
              className="rounded-t-lg"
              src="https://img.freepik.com/free-vector/rocket-ship-with-many-planets-asteroids_1308-77052.jpg?w=2000"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                A Magical <span className="text-ot-blue"> Link</span> has been sent to your email
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 ">Click to get started</p>
            <Link href="https://mail.google.com">
              <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Check Mail
                <svg
                  aria-hidden="true"
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default EmailConfirm;
