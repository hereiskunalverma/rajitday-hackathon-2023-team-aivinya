import React, { useState } from 'react';
import AlertMessage from 'LandingUI/components/alert';
import { CircularProgress } from '@mui/material';
import axios from '../../../services/axios';

const BugReport = () => {
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
    // send feature to backend
    try {
      await axios.post(`/api/post/bugs`, formData);
      // const resp = await axios.get(`/api/get/bugs`);
      // console.log(resp)
      AlertMessage("Thank you for it. We'll act on it real quick!", 'success');
      setLoading(false);
      setFormData({
        email: '',
        title: '',
        description: ''
      });
    } catch (error) {
      console.log(error);
      AlertMessage('Please try again later!', 'error');
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
  return (
    <div>
      <div className="text-center">
        <div className=" text-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Got a <span className="text-red-500">bug</span> ?{' '}
              <span className="text-teal-500">We're thankful to you</span>
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 ">
            Submit a report for that bug, we'll fix it within hours 😉
          </p>
          <form onSubmit={formHandler}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
              </label>
              <input
                type="email"
                name="email"
                onChange={inputHandler}
                value={formData.email}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="johndoe@batman.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
                Title
              </label>
              <input
                type="title"
                name="title"
                onChange={inputHandler}
                value={formData.title}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Bug in Page"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Bug Report
              </label>
              <textarea
                id="description"
                name="description"
                onChange={inputHandler}
                value={formData.description}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Please explain a little bit, in which page you are facing in it"
              ></textarea>
            </div>
            {/* <div className="mb-6">
    <label htmlFor="imageRef" className="block mb-2 text-sm font-medium text-gray-900 ">Optional - Upload a image for reference</label>
    <input onChange={(e)=>setFormData({...formData, [e.target.name]:e.target.files[0]})} name="image" id="imageRef" accept="image/*" type="file" />
    </div> */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {loading ? <CircularProgress color="inherit" /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      {/* list to show bugs reported /*}
        {/* <div className="overflow-x-auto">
        <div className="min-w-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
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
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
    </div>
  );
};

export default BugReport;
