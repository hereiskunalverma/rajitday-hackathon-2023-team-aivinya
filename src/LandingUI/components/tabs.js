import React from 'react';
import Container from 'LandingUI/components/container';

function tabs() {
  return (
    <div className="mytabs bg-white">
      <input type="radio" id="tabfree" name="mytabs" defaultChecked="checked" />
      <label
        htmlFor="tabfree"
        className="text-center md:text-md lg:text-xl w-1/3 hover:underline border border-transparent border-b-black"
      >
        AI Writer
      </label>
      <div className="tab border-2 border-blue-400 rounded-3xl my-4">
        <div className="flex justify-center object-cover relative w-full">
          <div className="flex flex-col md:flex-row rounded-lg bg-white">
            <div className="p-6 w-full flex flex-col justify-start ">
              <p className="text-2xl">
                <b>Generate any content in minutes</b>
              </p>
              <MoreInfoToggle data={ContentWriter} />
            </div>
            <img
              className="w-full md:w-1/2 object-cover rounded-lg md:rounded-none md:rounded-lg"
              src="img/contentgen.gif"
              alt
            />
          </div>
        </div>
      </div>
      <input type="radio" id="tabsilver" name="mytabs" />
      <label
        htmlFor="tabsilver"
        className="text-center w-1/3 text-xl hover:underline border border-transparent border-b-black"
      >
        AivaChat
      </label>
      <div className="tab border-2 border-blue-400 rounded-3xl my-4">
        <div className="flex justify-center object-cover relative w-full">
          <div className="flex flex-col md:flex-row rounded-lg bg-white">
            <div className="p-6 w-full flex flex-col justify-start ">
              <p className="text-2xl">
                <b>Mini chatGPT 😉 </b>
              </p>
              <MoreInfoToggle data={EmailSoft} />
            </div>
            <img
              className=" w-full md:w-1/2 md:h-auto object-cover rounded-lg md:rounded-none md:rounded-lg"
              src="img/email.gif"
              alt
            />
          </div>
        </div>
      </div>
      <input type="radio" id="tabgold" name="mytabs" />
      <label
        htmlFor="tabgold"
        className="text-center w-1/3 hover:underline border text-xl border-transparent border-b-black"
      >
        Integrations
      </label>
      <div className="tab border-2 border-blue-400 rounded-3xl my-4">
        <div className="flex justify-center object-cover relative w-full">
          <div className="flex flex-col md:flex-row rounded-lg bg-white">
            <div className=" w-full flex flex-col justify-start ">
              <p className="text-2xl">
                <b>Access the AI from any device</b>
              </p>
              <MoreInfoToggle data={analytics} />
            </div>
            <img
              className="w-full md:w-1/2 md:h-auto object-coverrounded-lg md:rounded-none md:rounded-lg"
              src="/img/integrations.gif"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <p className="font-medium sm:text-md lg:text-2xl mb-1">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// essential data

export const ContentWriter = [
  'Free 10,000 credits',
  'More than 20+ Human Tones',
  'More than 15+ Human Languages',
  'Generate Cover Letters, Research Paper Content, etc',
  'Generate Social Media posts for your fest, clubs, etc',
  '... and more with 20+ templates'
];

export const analytics = [
  'API Access to integrate in your website/app',
  'VS Code Extension',
  'Chrome Extension',
  'WhatsApp Bot',
  'Telegram Bot',
  'Discord Bot'
];

export const EmailSoft = [
  'Just Like chatGPT with few additions',
  'Generate Copyright-Free Images',
  'Browser Internet Results'
];

export default tabs;
