import React, { useState, useEffect } from 'react';
import AlertMessage from 'LandingUI/components/alert';
import { CircularProgress } from '@mui/material';
import axios from '../../../services/axios';

import { FcFlashOn } from 'react-icons/fc';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black
  }
}));

const TechDevComp = () => {
  const org = JSON.parse(localStorage.getItem('org'));
  const org_id = org.org;
  const [analyticsReqs, setAnalyticsReqs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    org_id: org_id,
    name: '',
    email: '',
    desc: ''
  });

  const fetchReqs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/get/techdevreqs?org_id=${org_id}`);
      // console.log(res.data[0].status)
      setAnalyticsReqs(res.data);
      AlertMessage('Done', 'success');
      setLoading(false);
    } catch (err) {
      console.log(err);
      AlertMessage('Please try again later or contact support!', 'error');
      setLoading(false);
    }

    console.log(analyticsReqs);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      await axios.post(`/api/post/techdevreq`, formData);
      // console.log(resp)
      AlertMessage("We've received your request!", 'success');
      setLoading(false);
      setFormData({
        org_id: org_id,
        name: '',
        email: '',
        desc: ''
      });
      fetchReqs();
    } catch (error) {
      console.log(error);
      AlertMessage('Please try again later or contact support!', 'error');
      setLoading(false);
      setFormData({
        org_id: org_id,
        name: '',
        email: '',
        desc: ''
      });
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchReqsInit = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/get/chatbotreqs?org_id=${org_id}`);
        // console.log(res.data[0].status)
        setAnalyticsReqs(res.data);
        AlertMessage('Done', 'success');
        setLoading(false);
      } catch (err) {
        console.log(err);
        AlertMessage('Please try again later or contact support!', 'error');
        setLoading(false);
      }
    };
    fetchReqsInit();
  }, []);

  // fetching requests current
  return (
    <>
      <section className="overflow-hidden text-gray-700 pb-20">
        <h1 className="mb-2 m-auto text-center text-ot-blue underline text-2xl font-bold tracking-tight text-gray-900 ">
          Expertise in Modern Tech Development
        </h1>
        <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
          <div className="flex flex-wrap -m-1 md:-m-2">
            <BootstrapTooltip title="Blochain Development" placement="top">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://thumbs.dreamstime.com/b/banner-blockchain-neon-signboard-digital-technology-concept-bitcoin-cryptocurrency-decoration-element-modern-line-style-154330733.jpg"
                  />
                </div>
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="E-Commerce Development" placement="top">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCQJdWTy1pleovwtuThx89LqYbMu0Q59cKmTpHLA8774dcppzmAmuC3ZVVE7bxfTjsdg&usqp=CAU"
                  />
                </div>
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="Shopify Development" placement="top">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://e7.pngegg.com/pngimages/1011/573/png-clipart-shopify-logo-business-e-commerce-shopify-text-logo.png"
                  />
                </div>
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="SaaS Development" placement="bottom">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://img.freepik.com/premium-vector/saas-software-as-service-concept-with-icon-set-with-big-word-text-center-vector-illustration_25156-541.jpg?w=2000"
                  />
                </div>
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="Mobile App Development" placement="bottom">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://www.earthtechy.com/wp-content/uploads/2022/01/Why-Mobile-App-Development-Is-Important-for-Business.png"
                  />
                </div>
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="Cloud Technology Development" placement="bottom">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://www.fastmetrics.com/blog/wp-content/uploads/2014/10/cloud-computing-service-types-including-IoT-1024x706.png"
                  />
                </div>
              </div>
            </BootstrapTooltip>
          </div>
        </div>
      </section>
      <div className="text-center">
        <div className=" text-center m-auto p-6 max-w bg-white rounded-lg border border-gray-200 shadow-md d">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Let's start the setup
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 ">
            As simple as filling the form, we'll setup within 24 hrs
          </p>

          <form onSubmit={formHandler}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                Your Humble Name
              </label>
              <input
                type="name"
                name="name"
                value={formData.name}
                onChange={inputHandler}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Bruce Wayne"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={inputHandler}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="johndoe@batman.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">
                About Project
              </label>
              <input
                type="desc"
                name="desc"
                value={formData.desc}
                onChange={inputHandler}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Super Project Details"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {loading ? <CircularProgress color="inherit" /> : 'Start Setup'}
            </button>
          </form>
        </div>
      </div>
      {/* list to show reqs */}
      <div className="overflow-x-auto">
        <div className="min-w-screen  bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <button
                onClick={fetchReqs}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                {loading ? <CircularProgress color="inherit" /> : 'Check Submissions'}
              </button>
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-7 text-left">Name</th>
                    <th className="py-3 px-7 text-center">Desc</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {analyticsReqs &&
                    analyticsReqs.map((item, ind) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100" key={ind}>
                        <td className="py-3 px-7 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <FcFlashOn />
                            </div>
                            <span className="font-medium">{item.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">{item.desc}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const GreenTick = () => {
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

export default TechDevComp;
