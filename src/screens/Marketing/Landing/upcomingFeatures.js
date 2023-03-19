import React, { useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundLanding};
  paddingtop: 20px;
`;

const LargeHeader = styled.h3`
  text-align: center;
  font-size: 1.875rem;
  line-height: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;

  @media (min-width: ${breakpoints.small}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;

const SectionDescription = styled.p`
  margin-top: 1rem;
  max-width: 48rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const UpcomingFeatures = () => {
  return (
    <Wrapper className="px-3 pt-5 bg-white">
      <div className="pt-0 ">
        <LargeHeader>
          <span className="font-extrabold text-transparent text-4xl  bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-text">
            Subscribe
          </span>{' '}
          & Get Early Access
        </LargeHeader>
        <SectionDescription>
          <span className="font-extrabold  underline decoration-[0.5rem] decoration-[0.5rem] decoration-blue-400/50">
            Upcoming Features
          </span>
        </SectionDescription>
        <div className=" -mt-20">
          <section className="mx-auto container py-20 w-full max-w-full ">
            <div className="flex justify-center items-center flex-col w-full mx-auto">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center xl:gap-y-16 gap-y-20 gap-x-16 lg:gap-x-20 xl:gap-x-0 lg:px-10 xl:px-0 w-full mx-auto">
                <div className="cursor-pointer hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto">
                  <div className="mb-6">
                    <svg
                      className="true"
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 13.3333H32L28 8L24 13.3333ZM24 18.6667H32L28 24L24 18.6667Z"
                        fill="#C7D2FE"
                      />
                      <path
                        d="M1.33333 0H9.33333V32H1.33333C0.979711 32 0.640572 31.8595 0.390523 31.6095C0.140475 31.3594 0 31.0203 0 30.6667V1.33333C0 0.979711 0.140475 0.640572 0.390523 0.390523C0.640572 0.140475 0.979711 0 1.33333 0Z"
                        fill="#818CF8"
                      />
                      <path
                        d="M12 0H20C20.3536 0 20.6928 0.140475 20.9428 0.390523C21.1929 0.640572 21.3333 0.979711 21.3333 1.33333V30.6667C21.3333 31.0203 21.1929 31.3594 20.9428 31.6095C20.6928 31.8595 20.3536 32 20 32H12V0Z"
                        fill="#6366F1"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>UGC Aggregator</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>
                      Grow your business trust and awareness with user generated content and drive
                      engagement
                    </p>
                  </div>
                  <MoreInfoToggle data={SocialMediaWalls} />
                </div>
                <div className="cursor-pointer hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto">
                  <div className="mb-6">
                    <img
                      src="https://img.icons8.com/nolan/64/voice-recognition-scan.png"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>AI Text to Voice</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>Generate real voices from text</p>
                  </div>
                  <MoreInfoToggle data={AITextVoice} />
                </div>
                <div className="cursor-pointer hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto">
                  <div className="mb-6">
                    <img
                      src="https://img.icons8.com/stickers/100/000000/web-advertising.png"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>Aivads</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>Launch targeted Ads in seconds</p>
                  </div>
                  <MoreInfoToggle data={Aivads} />
                </div>
                <div className="cursor-pointer mt-20 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto pt-0 -mt-20 lg:-mt-0">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      fill="blue"
                      className="bi bi-robot"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                      <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>AI Chatbot</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>Automate your customer interaction with AI</p>
                  </div>
                  <MoreInfoToggle data={AIChatbot} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const MoreInfoToggle = ({ data }) => {
  return (
    <div className="grow-0 shrink-0 basis-auto">
      {data?.map((item, ind) => (
        <div className="flex" key={ind}>
          <div className="shrink-0 mt-1">
            <svg
              className="w-4 h-4 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
              ></path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-medium mb-1">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SocialMediaWalls = [
  'Search any keyword or hashtag, and get content',
  'Personalized content from various social media platforms',
  'Embedd with minimal lines of code in your website',
  'URL link to share the walls/widgets'
];

const AITextVoice = [
  'Generate real voices from text',
  'Multiple languages support',
  'Vast library of voices'
];

const Aivads = [
  'Google, Facebook, Instagram, Twitter Ads',
  'Campaign Automation',
  'Analytics for better reach'
];

const AIChatbot = [
  'AI ChatBot Integration',
  'Get started copy-pasting few lines of code',
  'Free Integration Support',
  'Personalized Dashboard',
  'Add team members to personalize chat experience with customers'
];
export default UpcomingFeatures;
