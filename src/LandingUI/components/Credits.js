import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AlertMessage from './alert';

function Credits() {
  const router = useRouter();
  const [credits, setCredits] = useState(1000);
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    let planRestrictions = JSON.parse(localStorage.getItem('org'));
    if (!planRestrictions) {
      AlertMessage('Something went wrong, please try again', 'error');
      router.push('/user/dashboard');
      return;
    }
    setCredits(planRestrictions.credits);
    if (credits == 0)
      AlertMessage('Your credits have expired. Upgrade your plan to continue.', 'error');
  }, [seconds]);

  return (
    <>
      <div
        style={{
          paddingTop: 0,
          paddingBottom: 0
        }}
        className="break-inside relative overflow-hidden flex flex-col justify-between space-y-1 text-sm rounded-xl max-w-[23rem] p-3 mb-0 bg-[#5E17F4] text-white"
      >
        <div className="flex flex-row items-center space-x-3 py-3">
          <span className="text-base font-small">Credits</span>
        </div>
        <div
          className="flex flex-row items-center w-32 m-auto h-0 justify-center"
          style={{ paddingBottom: 20 }}
        >
          <div className="py-1 relative min-w-full">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-2 rounded-full bg-teal-600 w-0"
                style={{ width: `${credits / 10}%` }}
              />
              <div
                className="absolute h-4 flex items-center justify-center w-7 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
                unselectable="on"
                onselectstart="return false;"
                style={{ left: `${credits / 10}%` }}
              >
                <div className="bg-white -mt-0 text-black truncate text-xs rounded">{credits}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Credits;
