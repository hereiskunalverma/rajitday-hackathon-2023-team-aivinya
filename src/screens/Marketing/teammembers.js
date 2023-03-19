import React from 'react';
import Link from 'next/link';
function TeamMem() {
  const teamsInfo = [
    {
      name: 'Kunal Verma',
      img: 'https://avatars.githubusercontent.com/u/68738369?v=4',
      Designation: 'CEO & Software Engineer',
      desc:
        'Passionate ML Engineer, Backend Developer, Love Reading Books & meeting new people. Building Aivinya for a hassle-free marketing automation',
      social: {
        github: 'https://github.com/hereiskunalverma',
        twitter: 'https://twitter.com/19kunalverma',
        linkedin: 'https://www.linkedin.com/in/kunalverma19/'
      }
    },
    {
      name: 'Supratik Chakraborty',
      img: 'https://avatars.githubusercontent.com/u/66419293?v=4',
      Designation: 'Software Engineer',
      desc:
        'Software Developer driven to find and implement solutions to existing and prospective real-world problems, without compromising the end-user experience. ',
      social: {
        github: 'https://github.com/DeagleOfficial',
        twitter: 'https://twitter.com/itssupratik',
        linkedin: 'https://www.linkedin.com/in/supratikch/'
      }
    },
    {
      name: 'Abhay Agarwal',
      img: 'https://www.openthrone.io/static/media/abhayagarwal.af684f8e48f04bb80d38.jpeg',
      Designation: 'Finance Head',
      desc: `Passionate learner, finance and customer onboarding handling at Aivinya`,
      social: {
        twitter: 'https://twitter.com/AbhayAg17923053',
        linkedin: 'https://www.linkedin.com/in/abhay-agarwal-637b801a2/'
      }
    },
    {
      name: 'Jayant Thakur',
      img: 'https://www.openthrone.io/static/media/jayantthakur.fb2333cdb7811b455029.jpeg',
      Designation: 'Operations & Marketing Head',
      desc: `Handles Management & Marketing at Aivinya`,
      social: {
        twitter: 'https://twitter.com/JayantThakur0',
        linkedin: 'https://www.linkedin.com/in/jayant-thakur-a4b5881b5/'
      }
    }
  ];
  return (
    <div>
      <div className="container flex justify-center mx-auto pt-16">
        <div>
          <p className="text-gray-500 text-lg text-center font-normal pb-3">BUILDING TEAM</p>
          <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
            The Talented People Behind the Scenes of the Organization
          </h1>
        </div>
      </div>
      <div className="w-full bg-gray-100 px-10 pt-10">
        <div className="container mx-auto">
          <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
            {teamsInfo.map((item, key) => (
              <div
                className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
                key={key}
              >
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src={item.img}
                        alt
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="font-bold text-3xl text-center pb-1">{item.name}</div>
                    <p className="text-gray-800 text-sm text-center">{item.Designation}</p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      {item.desc}
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      {/* github */}
                      {item.social.github && (
                        <Link href={item.social.github}>
                          <a className="mx-5">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#718096"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-github"
                              >
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                              </svg>
                            </div>
                          </a>
                        </Link>
                      )}
                      {/* twitter */}
                      {item.social.twitter && (
                        <Link href={item.social.twitter}>
                          <a className="mx-5">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#718096"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-twitter"
                              >
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                              </svg>
                            </div>
                          </a>
                        </Link>
                      )}

                      {/* Linkedin */}
                      {item.social.linkedin && (
                        <Link href={item.social.linkedin}>
                          <a className="mx-5">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="gray"
                                className="bi bi-linkedin"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                              </svg>
                            </div>
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMem;
