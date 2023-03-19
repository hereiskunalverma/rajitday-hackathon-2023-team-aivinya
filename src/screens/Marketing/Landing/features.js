import { ContentWriter, EmailSoft, analytics } from 'LandingUI/components/tabs';

export const Feature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Aivinya Overview
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <p className="text-base text-gray-700 md:text-lg">
            Discover all the ways the Aivinya can help streamline your College Life.
          </p>
        </h2>
      </div>
      <div className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <img src="https://img.icons8.com/color/48/null/ai.png" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">AI Writer</h6>
            <p className="mb-3 text-sm text-gray-900">
              Generate Copy-Writed free content and 100% SEO-Optimized
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              {ContentWriter.map((item) => (
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <img src="img/logo_withoutname.png" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">AivaChat - miniChatGPT</h6>
            <p className="mb-3 text-sm text-gray-900">
              Get it running for free always with faster response
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              {EmailSoft.map((item) => (
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-integration-computer-programming-icons-flaticons-lineal-color-flat-icons.png" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Integrations</h6>
            <p className="mb-3 text-sm text-gray-900">
              Build your own AI platform with our plug-in APIs, no need to build complex AI from
              scratch
            </p>
            <ul className="mb-4 -ml-1 space-y-2">
              {analytics.map((item) => (
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
