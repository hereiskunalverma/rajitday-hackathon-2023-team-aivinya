import React, { useState } from 'react';
import AlertMessage from 'LandingUI/components/alert';
import { CircularProgress } from '@mui/material';
import axios from '../../../services/axios';

const FeatureReq = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: ''
  });
  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      await axios.post(`/api/post/features`, formData);
      // console.log(resp)
      AlertMessage("We've received your request!", 'success');
      setLoading(false);
      setFormData({
        email: '',
        title: '',
        description: ''
      });
    } catch (error) {
      console.log(error);
      AlertMessage('Please try again later or contact support!', 'error');
      setLoading(false);
      setFormData({
        email: '',
        title: '',
        description: ''
      });
    }
  };
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // fetching requests current
  return (
    <>
      <div className="text-center">
        <div className=" text-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Want a new <span className="text-ot-blue">ever-wanting</span> feature ?
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 ">
            Submit a feature request that you ever wanted, we take our customers' suggestions
            seriously
          </p>
          <form onSubmit={formHandler}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
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
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
                Feature
              </label>
              <input
                type="title"
                name="title"
                value={formData.title}
                onChange={inputHandler}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="title of my feature"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={inputHandler}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Explain a little bit, you can also include links for references..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {loading ? <CircularProgress color="inherit" /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      {/* list to show all features requested/*}
        {/* <div className="overflow-x-auto">
        <div className="min-w-screen  bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full ">
                <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-7 text-left">Reports</th>
                                <th className="py-3 px-7 text-center">Status</th>
                                <th className="py-3 px-7 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-7 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                 width="24" height="24"
                                                 viewBox="0 0 48 48"
                                                 style={{fill: "#000000"}}
                                                 >
                                                <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
                                            </svg>
                                        </div>
                                        <span className="font-medium">React Project</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div> */}
    </>
  );
};

export default FeatureReq;
