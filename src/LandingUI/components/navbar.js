import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Navbar() {
  const [users, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const solutions = [
    {
      name: 'Chrome Extension',
      icon: IconOne,
      href: 'https://aivinya.education/pricing'
    },
    {
      name: 'VS Code Extension',
      icon: IconTwo,
      href: 'https://aivinya.education/pricing'
    },
    {
      name: 'Discord',
      icon: IconSeven,
      href: 'https://aivinya.education/pricing'
    },
    {
      name: 'WhatsApp',
      icon: IconThree,
      href: 'https://aivinya.education/pricing'
    },
    {
      name: 'Telegram',
      icon: IconFour,
      href: 'https://aivinya.education/pricing'
    },
    {
      name: 'API Support',
      icon: IconFive,
      href: 'https://aivinya.education/pricing'
    }
  ];

  const navigation = [
    {
      name: 'Contact',
      link: '/contact'
    }
    // {
    //   name: 'Team',
    //   link: '/team'
    // }
  ];
  useEffect(() => {
    setLoading(true);
    const authLog = localStorage.getItem('user');
    if (authLog == null || authLog == undefined) setUser("Get Started, it's free");
    else setUser('DashBoard');
  }, []);

  // console.log(navigation)

  return (
    <div className="w-full bg-black">
      <nav className="container bg-black relative flex flex-wrap items-center justify-between p-2 mx-auto lg:justify-between xl:px-12">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <a className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 ">
                    <span>
                      <img src="/img/logo_withoutname.png" className="w-20" />
                    </span>
                  </a>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-indigo-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:outline-none "
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap justify-center text-center w-full my-5 lg:hidden">
                  {/* Mega Menu  */}
                  {/* Mega Menu ends  */}
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`

                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span>Integrations</span>
                        </Popover.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                {solutions.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                      <item.icon aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  <>
                    {navigation.map((item, index) => (
                      <>
                        {item.name === 'Solutions' && (
                          <Link key={index} href={item.link}>
                            <a
                              className="w-full px-4 py-2  text-white text-xl text-center rounded-md  "
                              onMouseEnter={() => setSolutions(true)}
                            >
                              {item.name}
                            </a>
                          </Link>
                        )}

                        {item.name != 'Solutions' && (
                          <Link key={index} href={item.link}>
                            <a className="w-full px-4 py-2  text-white text-xl text-center rounded-md  ">
                              {item.name}
                            </a>
                          </Link>
                        )}
                      </>
                    ))}
                    <div className="flex items-center mt-4 space-x-4 sm:mt-0">
                      <button className="px-8 py-4 text-lg font-medium text-center text-white rounded-3xl bg-black border-2 border-fuchsia-400">
                        <Link href="/auth/login" className="">
                          <a rel="noopener" className="text-white text-xl hover:text-fuchsia-400">
                            {users}

                            <br />
                          </a>
                        </Link>
                      </button>
                    </div>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`

                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span>Integrations</span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                <item.icon aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                {/* <Link href={menu.link}> */}
                <>
                  {menu.name === 'Solutions' && (
                    <Link href={menu.link}>
                      <a
                        className="w-full px-4 py-2 -ml-4 text-white text-xl rounded-md"
                        onMouseEnter={() => setSolutions(true)}
                        // onMouseLeave={() => setSolutions(false)}
                      >
                        <button className="px-3 py-1 rounded-md focus:text-white">
                          {menu.name} {/* <KeyboardArrowDownIcon /> */}
                        </button>
                      </a>
                    </Link>
                  )}

                  {menu.name != 'Solutions' && (
                    <Link href={menu.link}>
                      <a className="inline-block px-4 py-2 text-xl font-normal text-white no-underline rounded-md">
                        <button className=" px-3 py-1 rounded-md focus:text-white">
                          {menu.name}
                        </button>
                      </a>
                    </Link>
                  )}
                </>
                {/* </Link> */}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden flex items-center mt-4 space-x-4 sm:mt-0 lg:flex nav__item">
          <button className="px-8 py-4 text-lg font-medium text-center text-white rounded-3xl bg-black border-2 border-fuchsia-400">
            <Link href="/auth/login" className="">
              <a rel="noopener" className="text-white text-xl hover:text-fuchsia-400">
                {users}
                <br />
              </a>
            </Link>
          </button>
        </div>
      </nav>
    </div>
  );
}
function IconOne() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        fill="#4caf50"
        d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
      ></path>
      <path
        fill="#ffc107"
        d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
      ></path>
      <path
        fill="#4caf50"
        d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
      ></path>
      <path
        fill="#ffc107"
        d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
      ></path>
      <path
        fill="#f44336"
        d="M41.84,15H24v13l-3-1L7.16,13.26H7.14C10.68,7.69,16.91,4,24,4C31.8,4,38.55,8.48,41.84,15z"
      ></path>
      <path fill="#dd2c00" d="M7.158,13.264l8.843,14.862L21,27L7.158,13.264z"></path>
      <path fill="#558b2f" d="M23.157,44l8.934-16.059L28,25L23.157,44z"></path>
      <path fill="#f9a825" d="M41.865,15H24l-1.579,4.58L41.865,15z"></path>
      <path
        fill="#fff"
        d="M33,24c0,4.969-4.031,9-9,9s-9-4.031-9-9s4.031-9,9-9S33,19.031,33,24z"
      ></path>
      <path
        fill="#2196f3"
        d="M31,24c0,3.867-3.133,7-7,7s-7-3.133-7-7s3.133-7,7-7S31,20.133,31,24z"
      ></path>
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        fill="#29b6f6"
        d="M44,11.11v25.78c0,1.27-0.79,2.4-1.98,2.82l-8.82,4.14L34,33V15L33.2,4.15l8.82,4.14 C43.21,8.71,44,9.84,44,11.11z"
      ></path>
      <path
        fill="#0277bd"
        d="M9,33.896L34,15V5.353c0-1.198-1.482-1.758-2.275-0.86L4.658,29.239 c-0.9,0.83-0.849,2.267,0.107,3.032c0,0,1.324,1.232,1.803,1.574C7.304,34.37,8.271,34.43,9,33.896z"
      ></path>
      <path
        fill="#0288d1"
        d="M9,14.104L34,33v9.647c0,1.198-1.482,1.758-2.275,0.86L4.658,18.761 c-0.9-0.83-0.849-2.267,0.107-3.032c0,0,1.324-1.232,1.803-1.574C7.304,13.63,8.271,13.57,9,14.104z"
      ></path>
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fff"
        d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
      ></path>
      <path
        fill="#fff"
        d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
      ></path>
      <path
        fill="#cfd8dc"
        d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
      ></path>
      <path
        fill="#40c351"
        d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
      ></path>
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}

const IconFour = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path>
      <path
        fill="#fff"
        d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
      ></path>
      <path
        fill="#b0bec5"
        d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
      ></path>
      <path
        fill="#cfd8dc"
        d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
      ></path>
    </svg>
  );
};

const IconFive = () => {
  return (
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA/klEQVR4nO3WMUoEQRCF4S9RBMHQ1VDB0MDE0ExwMVEvYKqmHsELGO8djA2WUQ/gKXYMDAVBQWdpESpY3JkFHWc2mQdF93td1A8VNZ06taBDPCE1VDn6ZeC8QWiKGpWBU0s1pQ6c5rXqAmvxto7xjAEL2EFW0fP+G/B95EtxPlQMvcRR3FfwXBd8HvlVnBcV4Lfwe+Fv6oAL9LCJl1hlL/Iy8Cu2wmd1wFlkx3jEdvi7kgEbWI77Lj7qgM/KGiL/OeAEp7ieWPufwAVWsYhbDDGInu/8c8bQVAc8DL8/kY0DKt4bAaeGa0odOLW16nxeH4F+w/ARDsrAnTr5T30B/OCxNVNkVEUAAAAASUVORK5CYII="></img>
  );
};

const IconSix = () => {
  return <img src="https://img.icons8.com/3d-fluency/94/null/client-company.png" />;
};

const IconSeven = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        fill="#8c9eff"
        d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"
      ></path>
    </svg>
  );
};

export { IconOne, IconTwo, IconThree, IconFour, IconFive, IconSix, IconSeven };
