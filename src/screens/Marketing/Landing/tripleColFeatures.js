import React, { useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';
import { BetaBadge } from 'components/Common/BetaBadge';

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

const TripleColFeatures = () => {
  return (
    <Wrapper className="px-3 pt-5 bg-white">
      <div className="pt-0 ">
        <LargeHeader>
          <span className="font-extrabold text-transparent text-4xl  bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-text">
            AI Powered
          </span>{' '}
          Marketing Tools
        </LargeHeader>
        <SectionDescription>
          <span className="font-medium text-ot-blue">Running a business ?</span> No worries we have
          all what you need at{' '}
          <span
            className="text-ot-blue font-medium underline
        decoration-red-500 decoration-[0.25rem]
        motion-safe:transition-all motion-safe:duration-200"
          >
            one price
          </span>
        </SectionDescription>
        <div className=" -mt-20">
          <section className="mx-auto container py-20 w-full max-w-full ">
            <div className="flex justify-center items-center flex-col w-full mx-auto">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center xl:gap-y-16 gap-y-20 gap-x-16 lg:gap-x-20 xl:gap-x-0 lg:px-10 xl:px-0 w-full mx-auto">
                <div className="cursor-pointer my-8 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      fill="blue"
                      className="bi bi-vector-pen"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>AI Content Writer</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>Generate Content that customers love</p>
                  </div>
                  <MoreInfoToggle data={AIContentWriter} />
                </div>
                <div className="cursor-pointer my-8 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto pt-0 -mt-20 lg:-mt-0">
                  <div className="mb-6">
                    <img
                      src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-canvas-art-and-design-xnimrodx-blue-xnimrodx-3.png"
                      width={96}
                      height={96}
                      color="blue"
                    />
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center ">
                    <h2>
                      Aivinya Canvas <BetaBadge />{' '}
                    </h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center ">
                    <p>
                      Like <span className="text-ot-blue font-bold">Canva</span> but AI Powered
                    </p>
                  </div>
                  <MoreInfoToggle data={AivinyaCanvas} />
                </div>
                <div className="cursor-pointer my-8 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto pt-0 -mt-20 lg:-mt-0">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      fill="blue"
                      className="bi bi-graph-up-arrow"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>
                      <span className="text-orange-700">Privacy-Centric</span> Customer Analytics
                    </h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>
                      A powerful web analytics dashboard that gives you 100% data ownership and
                      protects your customer's privacy
                    </p>
                  </div>
                  <MoreInfoToggle data={Analytics} />
                </div>
                <div className="cursor-pointer my-8 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto pt-0 -mt-20 lg:-mt-0">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      fill="blue"
                      className="bi bi-envelope-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555l-4.2 2.568a2.785 2.785 0 0 0-.051-.105c-.666-1.3-2.363-1.917-3.699-1.25-1.336-.667-3.033-.05-3.699 1.25l-.05.105L.05 3.555ZM11.584 8.91a4.694 4.694 0 0 1-.073.139L16 11.8V4.697l-4.003 2.447c.027.562-.107 1.163-.413 1.767Zm-4.135 3.05c-1.048-.693-1.84-1.39-2.398-2.082L.19 12.856A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144L10.95 9.878c-.559.692-1.35 1.389-2.398 2.081L8 12.324l-.551-.365ZM4.416 8.91c-.306-.603-.44-1.204-.413-1.766L0 4.697v7.104l4.49-2.752a4.742 4.742 0 0 1-.074-.138Z" />
                      <path d="M8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>Email Marketing</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>
                      Send and schedule <span className="text-teal-500">millions of emails</span>{' '}
                      for your campaign
                    </p>
                  </div>
                  <MoreInfoToggle data={EmailMarket} />
                </div>
                <div className="cursor-pointer my-8 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto pt-0 -mt-20 lg:-mt-0">
                  <div className="mb-6">
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.2079 0.175992L0.781281 6.91599C0.68372 6.96073 0.601072 7.03256 0.543175 7.12294C0.485278 7.21331 0.454572 7.31842 0.454712 7.42575C0.454853 7.53308 0.485833 7.63811 0.543966 7.72833C0.6021 7.81856 0.684936 7.89017 0.782614 7.93466L15.3226 14.6253C15.7519 14.8227 16.2479 14.8227 16.6773 14.6253L31.2173 7.93466C31.315 7.8903 31.3979 7.81879 31.4562 7.72865C31.5145 7.6385 31.5456 7.53351 31.5459 7.42618C31.5461 7.31885 31.5156 7.2137 31.4578 7.12325C31.4 7.0328 31.3175 6.96086 31.2199 6.91599L16.792 0.175992C16.544 0.0601174 16.2736 6.10352e-05 15.9999 6.10352e-05C15.7263 6.10352e-05 15.4559 0.0601174 15.2079 0.175992Z"
                        fill="#818CF8"
                      />
                      <path
                        d="M31.22 15.568L28.24 14.176C28.0266 14.0763 27.794 14.0243 27.5584 14.0236C27.3229 14.0229 27.09 14.0735 26.876 14.172L16.6773 18.8653C16.4649 18.963 16.2338 19.0136 16 19.0136C15.7662 19.0136 15.5351 18.963 15.3227 18.8653L5.12267 14.172C4.90885 14.0737 4.67621 14.0232 4.4409 14.0239C4.20559 14.0246 3.97324 14.0765 3.76001 14.176L0.780006 15.568C0.682503 15.6128 0.599949 15.6848 0.54217 15.7752C0.48439 15.8657 0.453823 15.9708 0.454103 16.0782C0.454384 16.1855 0.485502 16.2905 0.543754 16.3806C0.602006 16.4708 0.684937 16.5423 0.782674 16.5866L15.3227 23.276C15.535 23.3742 15.7661 23.4251 16 23.4251C16.2339 23.4251 16.465 23.3742 16.6773 23.276L31.2173 16.5866C31.3151 16.5423 31.398 16.4708 31.4563 16.3806C31.5145 16.2905 31.5456 16.1855 31.5459 16.0782C31.5462 15.9708 31.5156 15.8657 31.4578 15.7752C31.4001 15.6848 31.3175 15.6128 31.22 15.568Z"
                        fill="#C7D2FE"
                      />
                      <path
                        d="M31.22 24.144L28.24 22.752C28.0266 22.6522 27.794 22.6002 27.5585 22.5995C27.3229 22.5989 27.09 22.6495 26.876 22.748L16.6774 27.44C16.4649 27.5376 16.2338 27.5882 16 27.5882C15.7662 27.5882 15.5351 27.5376 15.3227 27.44L5.12269 22.7466C4.90887 22.6484 4.67623 22.5978 4.44091 22.5985C4.2056 22.5992 3.97326 22.6511 3.76002 22.7506L0.780019 24.144C0.682891 24.189 0.600708 24.2609 0.543205 24.3512C0.485701 24.4415 0.455288 24.5464 0.455568 24.6535C0.455849 24.7605 0.486813 24.8653 0.544789 24.9553C0.602765 25.0453 0.685324 25.1168 0.782686 25.1613L15.3227 31.852C15.752 32.0493 16.248 32.0493 16.6774 31.852L31.2174 25.1613C31.3147 25.1168 31.3973 25.0453 31.4553 24.9553C31.5132 24.8653 31.5442 24.7605 31.5445 24.6535C31.5448 24.5464 31.5143 24.4415 31.4568 24.3512C31.3993 24.2609 31.3172 24.189 31.22 24.144Z"
                        fill="#6366F1"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>Collaborate</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>
                      Invite team members with custom{' '}
                      <span className="text-yellow-500">Workspaces</span>
                    </p>
                  </div>
                  <MoreInfoToggle data={TeamCol} />
                </div>

                <div className="cursor-pointer my-8 hover:shadow-ot-blue shadow-xl hover:shadow py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col w-full mx-auto pt-0 -mt-20 lg:-mt-0">
                  <div className="mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      fill="blue"
                      className="bi bi-headset"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
                    </svg>
                  </div>
                  <div className="text-gray-800  text-2xl font-semibold text-center">
                    <h2>24x7 Support</h2>
                  </div>
                  <div className="text-gray-600  mt-2 text-lg text-center">
                    <p>Ready to serve our customers </p>
                  </div>
                  <MoreInfoToggle data={Support} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export const MoreInfoToggle = ({ data }) => {
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

const AIContentWriter = [
  'Write Blogs',
  'Write Product Description',
  'Write Stories',
  'Write Lead Generating Emails',
  'Generate Social Media Posts',
  '... many more'
];

const AIChatbot = [
  'AI ChatBot Integration',
  'Get started copy-pasting few lines of code',
  'Free Integration Support',
  'Personalized Dashboard',
  'Add team members to personalize chat experience with customers'
];

const AivinyaCanvas = [
  'Generate Social Media posts from few words',
  'Generate images from text',
  'No Plagiarism, AI generated content',
  'Save posts in png format',
  'Transparent Background Images'
];

const Analytics = [
  '100% Ownership of Data',
  'Customer Privacy Centric Analysis',
  'Analyze ecommerce, mobile app, website visits, etc',
  'Google Analytics data Importer',
  'Manage multiple websites',
  'Add team members'
];

const EmailMarket = [
  'Personalized Email Marketing Campaign Dashboard',
  'Import Emails in one-click',
  'No more spending on MailChimp',
  'Schedule Milions of Emails',
  'Personalized Email Templates'
];

const TechDev = [
  'Cost might applicable for complex projects',
  'Free 12-Month Tech and Maintenance Support',
  'Free 3-Month Feature Add Support',
  'Free Hosting Server and Maintenance'
];

const AISentient = [
  'Search for keyword on any social media',
  'Analysis users mood',
  'Show users what they wanted to see'
];

const TeamCol = [
  'Collaborate with Team Members',
  'Together things become big',
  'Invite team members',
  'Personalized Different Workspaces'
];

const Support = ['Availability upto 24x7', 'Chat', 'Call', 'Mail'];
export default TripleColFeatures;
