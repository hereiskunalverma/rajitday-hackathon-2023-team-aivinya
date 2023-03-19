import React from 'react';

const TripleColFeaturesModal = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full bg-white rounded-lg border shadow-md ">
      <div id="fullWidthTabContent" className="border-t border-gray-200 ">
        <div
          className="p-4 bg-white rounded-lg md:p-8  text-center"
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <dl className="grid grid-cols-3 gap-8 p-4 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-4 ">
            {data.map((item) => (
              <div className="flex flex-col justify-center items-center">
                <dt className="mb-2 text-3xl font-extrabold">{item.svg}</dt>
                <dd className="font-bold text-blue-600 ">{item.title}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TripleColFeaturesModal;
