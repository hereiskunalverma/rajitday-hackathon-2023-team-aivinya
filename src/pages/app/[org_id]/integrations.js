import AppLayout from '../../../components/App/AppLayout';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import AlertMessage from 'LandingUI/components/alert';

import {
  IconFive,
  IconFour,
  IconThree,
  IconTwo,
  IconOne,
  IconSeven
} from 'LandingUI/components/navbar';
import { BetaBadge } from 'components/Common/BetaBadge';
import axios from 'axios';

const Integrations = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    // registering email via redux store
    setLoading(true);
    try {
      var data = JSON.stringify({
        email: `${email}`,
        body: `Access the API from here: https://api.aivinya.education/api/public/aivachat`
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.aivinya.com/admin/api/customemail',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      console.log(config);
      const res = await axios(config);
      console.log(JSON.stringify(res.data));

      AlertMessage('The API has been sent to your mail!', 'success');
      setEmail('');
      setLoading(false);
    } catch (err) {
      console.log(err);
      AlertMessage('Please try again later', 'error');
      setLoading(false);
    }
  };
  const integrations = [
    {
      name: 'Chrome Extension',
      icon: <IconOne />,
      ready: false
    },
    {
      name: 'VS Code Extension',
      icon: <IconTwo />,
      ready: true,
      add: 'https://marketplace.visualstudio.com/items?itemName=hereiskunalverma.aivachat-code',
      docs:
        'https://docs.aivinya.com/books/aivinya-for-education/page/aivinya-integrations#bkmrk-vs-code-0'
    },
    {
      name: 'AivaChat API',
      icon: <IconFive />,
      href: 'https://aivinya.education/pricing',
      ready: true,
      docs:
        'https://docs.aivinya.com/books/aivinya-for-education/page/aivinya-integrations#bkmrk-aivachat-api-1',
      add: ''
    },
    {
      name: 'WhatsApp',
      icon: <IconThree />,
      ready: false,
      docs:
        'https://docs.aivinya.com/books/aivinya-for-education/page/aivinya-integrations#bkmrk-whatsapp-0',
      add: ''
    },
    {
      name: 'Telegram',
      icon: <IconFour />,
      href: 'https://aivinya.education/pricing',
      ready: true,
      docs:
        'https://docs.aivinya.com/books/aivinya-for-education/page/aivinya-integrations#bkmrk-telegram-1',
      add:
        'https://docs.aivinya.com/books/aivinya-for-education/page/aivinya-integrations#bkmrk-telegram-1'
    },
    {
      name: 'Discord',
      icon: <IconSeven />,
      href: 'https://aivinya.education/pricing',
      ready: true,
      docs:
        'https://docs.aivinya.com/books/aivinya-for-education/page/aivinya-integrations#bkmrk-telegram-1',
      add: 'https://discord.gg/YWaUakS4US'
    }
  ];

  let org, orgin_id;
  useEffect(() => {
    org = JSON.parse(localStorage.getItem('org'));
    orgin_id = org.org;
  });
  const [subStatus, setSubStatus] = useState(false);
  const getSubData = () => {
    // setLoading(true)
    if (!orgin_id) {
      router.push('/user/dashboard');
      return false;
    }
    if (org.plan === 'sigma') {
      console.log(org.plan);
      setSubStatus(true);
      return true;
    }
    // setLoading(false)
  };

  useEffect(() => {
    getSubData();
  }, []);
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-wrap flex-row gap-2 my-6 mx-14 ">
      {integrations.map((item) => (
        <div className="w-[90%] md:w-[49%] lg:w-[32%] max-w-sm bg-white border border-gray-200 shadow-sm hover:shadow-lg rounded-lg transition-all duration-200 ">
          <>
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center px-4 pt-4">
              <div className="flex flex-col items-center pb-10">
                {item.icon}
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{item.name}</h5>
                {/* {!item.ready && <BetaBadge message={'Coming Soon'} />} */}
                {!item.ready && (
                  <span className="mt-4 md:mt-6 bg-red-200 text-red-700 text-lg font-semibold rounded-md py-1 px-3">
                    Coming Soon
                  </span>
                )}
                {item.ready && (
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    {item.name === 'AivaChat API' ? (
                      <form onSubmit={onSubmit}>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          className="bg-white border border-blue text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="john.doe@user.com"
                          required
                        />
                        <div className="py-2">
                          <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                          >
                            {loading ? <CircularProgress color="inherit" /> : 'Get API'}
                          </button>
                        </div>
                        <a
                          href={item.docs}
                          target={'_blank'}
                          className="inline-flex decoration-current text-inherit items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 "
                        >
                          Docs
                        </a>
                      </form>
                    ) : (
                      <a
                        href={item.add}
                        target={'_blank'}
                        className="inline-flex items-center  px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                      >
                        {!subStatus && item.name === 'AivaChat API'
                          ? '🔒 Upgrade Plan'
                          : item.name === 'AivaChat API'
                          ? 'API sent on registered mail.'
                          : 'Add'}
                      </a>
                    )}
                    {item.name !== 'AivaChat API' && (
                      <a
                        href={item.docs}
                        target={'_blank'}
                        className="inline-flex decoration-current text-inherit items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 "
                      >
                        Docs
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      ))}
    </div>
  );
};

Integrations.Layout = AppLayout;

export default Integrations;
