import React, { useState, useEffect } from 'react';
import AlertMessage from 'LandingUI/components/alert';
import { CircularProgress } from '@mui/material';
import axios from '../../../services/axios';
import { FcFlashOn } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AnalyticsComp = () => {
  const router = useRouter();
  const org = JSON.parse(localStorage.getItem('org'));
  const orgin_id = org.org;
  const [subStatus, setSubStatus] = useState(false);
  const getSubData = () => {
    // setLoading(true)
    if (!orgin_id) {
      AlertMessage('Something went wrong, please try again', 'error');
      router.push('/user/dashboard');
      return false;
    }
    if (org.plan === 'free') {
      AlertMessage(
        'You are on a free plan, please upgrade to continue using our services. If you had already purchased a plan, please relogin',
        'error'
      );
      return false;
    } else if (org.plan === 'growth' || org.plan === 'scale' || org.plan === 'rise') {
      setSubStatus(true);
      AlertMessage('Enter your email', 'info');
      return true;
    }
    // setLoading(false)
  };
  console.log(orgin_id);
  const [analyticsReqs, setAnalyticsReqs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    org_id: orgin_id,
    status: false,
    email: '',
    website: '',
    linkDashboard: '#'
  });

  const fetchReqs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/get/analyticsreqs?org_id=${orgin_id}`);
      // console.log(res.data[0].status)
      console.log(res);
      setAnalyticsReqs(res.data);
      AlertMessage('Done', 'success');
      setLoading(false);
    } catch (err) {
      console.log(err);
      AlertMessage('Please try again later or contact support!', 'error');
      setLoading(false);
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      await axios.post(`/api/post/analyticsreq`, formData);
      // console.log(resp)
      AlertMessage("We've received your request!", 'success');
      setLoading(false);
      setFormData({
        org_id: orgin_id,
        status: false,
        email: '',
        website: '',
        linkDashboard: '#'
      });
      fetchReqs();
    } catch (error) {
      console.log(error);
      AlertMessage('Please try again later or contact support!', 'error');
      setLoading(false);
      setFormData({
        org_id: orgin_id,
        status: false,
        email: '',
        website: '',
        linkDashboard: '#'
      });
    }
  };

  useEffect(() => {
    const fetchReqsInit = async () => {
      setLoading(true);
      console.log('anal', orgin_id);
      try {
        console.log('inside get requests', orgin_id);
        const res = await axios.get(`/api/get/analyticsreqs?org_id=${orgin_id}`);
        // console.log(res.data[0].status)
        setAnalyticsReqs(res.data);
        AlertMessage('Done', 'success');
        setLoading(false);
      } catch (err) {
        console.log('notice', err);
        AlertMessage('Please try again later or contact support!', 'error');
        setLoading(false);
      }
    };
    fetchReqsInit();
  }, []);
  useEffect(() => getSubData(), []);
  // fetching requests current
  return (
    <>
      <div className="text-center">
        <div className=" text-center m-auto p-6 max-w bg-white rounded-lg border border-gray-200 shadow-md ">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Aivinya Anaytics - Preview
            </h5>
          </a>
          <iframe
            className="m-auto"
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/tG8Wv4G1XLQ"
            title="Aivinya Analytics Tutorial"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="text-center">
        <div className=" text-center m-auto p-6 max-w bg-white rounded-lg border border-gray-200 shadow-md ">
          {analyticsReqs.length === 0 ? (
            <>
              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Let's start the setup
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 ">
                As simple as filling the form, we'll setup within 24 hrs
              </p>
              <p className="mb-3 font-light text-xs text-gray-700 ">
                Powered by OpenSource and Privacy Focused - Matomo Analytics
              </p>

              <form onSubmit={formHandler}>
                <div className="mb-6 text-center">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 m-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                    placeholder="johndoe@batman.com"
                    required
                  />
                </div>
                <div className="mb-6 text-center">
                  <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">
                    First Website, you can add more later
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    id="website"
                    className="bg-gray-50 border border-gray-300 m-auto text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
                    placeholder="https://awesomewebsite.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  disabled={!subStatus}
                >
                  {loading ? (
                    <CircularProgress color="inherit" />
                  ) : subStatus ? (
                    'Start Setup'
                  ) : (
                    '🔒 Purchase a plan'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {analyticsReqs[0]?.status ? (
                <GreenTick />
              ) : (
                <img
                  src="https://img.icons8.com/color/96/000000/time-machine--v1.png"
                  className="m-auto"
                />
              )}

              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {analyticsReqs[0]?.status ? 'Congratulations, Enjoy' : 'Almost Done!'}
                </h5>
              </a>
              {!analyticsReqs[0]?.status && (
                <p className="mb-3 font-normal text-gray-700 ">Usually takes less than 5hrs</p>
              )}
            </>
          )}
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
                    <th className="py-3 px-7 text-left">Reports</th>
                    <th className="py-3 px-7 text-center">Status</th>
                    <th className="py-3 px-7 text-center">Link</th>
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
                            <span className="font-medium">Request Submitted</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span
                            className={`${
                              item.status
                                ? 'bg-teal-200 text-teal-600'
                                : 'bg-yellow-200 text-purple-600'
                            } py-1 px-3 text-bold rounded-full text-xs`}
                          >
                            {item.status ? 'Active' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <Link href={item.status ? item.linkDashboard : '#'}>
                            <a
                              target={'_blank'}
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              {!item.status ? (
                                'Building'
                              ) : (
                                <div>
                                  Go to Dashboard
                                  <svg
                                    className="ml-2 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                  </svg>
                                </div>
                              )}
                            </a>
                          </Link>
                        </td>
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

export default AnalyticsComp;
