import AppLayout from '../../../components/App/AppLayout';
import Link from 'next/link';

const Affiliate = () => {
  return (
    <>
      <div className="m-auto p-6 max-w bg-white rounded-lg border border-gray-200 shadow-md ">
        <svg
          className="m-auto mb-2 w-20 h-20 text-gray-500 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
            clip-rule="evenodd"
          ></path>
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
        </svg>
        <a href="#" className="m-auto text-center">
          <h5 className="m-auto mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
            We've a gift for you
          </h5>
        </a>
        <div className="m-auto text-center">
          <img
            className="m-auto text-center"
            src="/img/aivinya-affiliate.png"
            height={250}
            width={250}
          />
        </div>
        <p className="m-auto text-center pt-5 pb-5 text-ot-blue text-2xl font-semibold tracking-tight text-gray-900 ">
          OR
        </p>
        <Link href="https://bit.ly/3SY7xy0">
          <a
            target={'_blank'}
            rel="noopener noreferrer"
            className="inline-flex m-auto text-center items-center text-blue-600 hover:underline"
          >
            Check this out
            <svg
              className="m-auto text-center ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </a>
        </Link>
      </div>
    </>
  );
};

Affiliate.Layout = AppLayout;

export default Affiliate;
