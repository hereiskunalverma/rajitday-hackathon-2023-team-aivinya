import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Box, Slider, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import CustomModal from 'LandingUI/components/CustomModal';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import AlertMessage from 'LandingUI/components/alert';
import Link from 'next/link';
import { TbSend } from 'react-icons/tb';
import { BsSun } from 'react-icons/bs';
import { BiError } from 'react-icons/bi';
import { TbRefresh } from 'react-icons/tb';
import { FaUserAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import AuthContext from '../../../utils/authContext';

import { BsLightningCharge } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { text } from '@fortawesome/fontawesome-svg-core';

const TextEditor = dynamic(() => import('../AIContentOption1/TextEditor'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <>
      <Skeleton variant="text" sx={{ width: '15%' }} />
      <Skeleton variant="rectangular" sx={{ width: '100%', marginBottom: 3 }} height={100} />
    </>
  )
});

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.25rem;
`;

const AIContentOption2 = () => {
  const { authState } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(outputText)
  // }, [outputText])
  const router = useRouter();
  useEffect(() => {
    let planRestrictions = JSON.parse(localStorage.getItem('org'));
    if (!planRestrictions) {
      AlertMessage('Something went wrong, please try again', 'error');
      router.push('/user/dashboard');
      return;
    }
    setCredits(planRestrictions.credits);
    if (credits <= 0)
      AlertMessage('Your credits have expired. Upgrade your plan to continue.', 'error');
  }, []);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  // loading state
  const [loading, setLoading] = useState(false);

  const [tone, setTone] = useState('Casual');
  const plan = JSON.parse(localStorage.getItem('org')).plan;

  const toneList =
    plan === 'free'
      ? ['Appreciative', 'Awestruck', 'Candid', 'Clever', 'Casual']
      : [
          'Appreciative',
          'Awestruck',
          'Candid',
          'Clever',
          'Casual',
          'Cautionary',
          'Compassionate',
          'Convincing',
          'Critical',
          'Earnest',
          'Enthusiastic',
          'Formal',
          'Funny',
          'Humble',
          'Humorous',
          'Informative',
          'Inspirational',
          'Joyful',
          'Passionate',
          'Professional',
          'Thoughtful',
          'Urgent',
          'Witty'
        ];
  const [inputText, setInputText] = useState('');
  const [creativity, setCreativity] = useState('Interesting');

  const [outputText, setOutputText] = useState('');
  const [credits, setCredits] = useState(1000);

  const [qna, setQna] = useState([]);
  const [genrating, setGenrating] = useState(false);

  const handleInputValueChange = (e) => {
    e.target.style.height = '28px';
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
    setInputText(e.target.value);
  };

  const marks = [
    {
      value: 0,
      label: 'Interesting'
    },

    {
      value: 20,
      label: 'Low'
    },
    {
      value: 40,
      label: 'Medium'
    },
    {
      value: 60,
      label: 'Recommended'
    },
    {
      value: 80,
      label: 'High'
    },
    {
      value: 100,
      label: 'Factual'
    }
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  const getData = (giventext) => {
    if (credits <= 0) {
      AlterMessage(
        'You have no credits left, please upgrade your plan to continue using our services',
        'error'
      );
      return;
    }
    let newqna = qna;
    newqna.push({ text: giventext, who: 'user' });
    newqna.push({ text: '', who: 'ai' });

    setQna(newqna);
    setInputText('');
    setshowCursor(true);
    // AlertMessage('Generating...', 'info');

    const org = JSON.parse(localStorage.getItem('org'));
    if (!org) {
      router.push('/user/dashboard');
      return;
    }
    setCredits(org.credits);
    const updateCredits = async (credits) => {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios
        .post(`${url}api/plan/update-credits`, {
          orgId: org.org,
          credits: credits
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setLoading(true);
    axios
      .post(`${url}/api/public/aivachat`, {
        text: giventext ? giventext : inputText
      })
      .then(function (response) {
        console.log(response.data.res);
        // AlertMessage('Generated Successfully', 'success');
        setOutputText(response.data.res);

        // my updates
        let newqna = qna;
        newqna.pop();
        let text = removeEmptylinesFromBigning(response.data.res);
        newqna.push({ text: text, who: 'ai' });
        setQna(newqna);

        setCredits(
          Math.max(
            credits -
              EditorState.createWithContent(ContentState.createFromText(response.data.res))
                .getCurrentContent()
                .getPlainText('\u0001')
                .trim()
                .split(/\s+/).length,
            0
          )
        );

        let planRestrictions = JSON.parse(localStorage.getItem('org'));
        planRestrictions = {
          ...planRestrictions,
          credits: Math.max(
            credits -
              EditorState.createWithContent(ContentState.createFromText(response.data.res))
                .getCurrentContent()
                .getPlainText('\u0001')
                .trim()
                .split(/\s+/).length,
            0
          )
        };
        updateCredits(
          Math.max(
            credits -
              EditorState.createWithContent(ContentState.createFromText(response.data.res))
                .getCurrentContent()
                .getPlainText('\u0001')
                .trim()
                .split(/\s+/).length,
            0
          )
        );

        localStorage.setItem('org', JSON.stringify(planRestrictions));
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  const removeEmptylinesFromBigning = (text) => {
    return text.replace(/^\s*\n/gm, '').replace(/\n\s*$/gm, '');
  };
  const regenrateResponse = () => {
    setGenrating(true);
    let newqna = qna;
    newqna.pop();

    let text = newqna[newqna.length - 1].text;
    newqna.pop();
    setQna(newqna);
    getData(text);
  };

  const handleOnSubmit = () => {
    if (inputText.length > 0) {
      let text = removeEmptylinesFromBigning(inputText);
      getData(text);
    }
  };

  const handleInputkeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      getData(inputText);
    }
  };
  const [showCursor, setshowCursor] = useState(true);
  let cursorremoveTimout;
  const handletypeWriterTyping = (n) => {
    if (cursorremoveTimout) {
      clearTimeout(cursorremoveTimout);
    }
    cursorremoveTimout = setTimeout(() => {
      console.log('hiding cursor');
      setLoading(false);
      setshowCursor(false);
    }, 2000);
    cursorremoveTimout.clear;
  };

  if (credits <= 0) return <p>Upgrade your subscription to continue.</p>;

  return (
    <div className=" h-full ">
      {/* bigginng style */}
      {qna.length == 0 && (
        <div className="flex flex-col items-center text-sm  overflow-y-auto mb-10">
          <div className="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 ">
            <h1 class="text-4xl font-semibold text-center mt-6  ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
              AivaChat
            </h1>
            <div className="md:flex items-start text-center gap-3.5">
              <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                <h2 className="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                  <BsSun size={30} /> Examples
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                  <button
                    onClick={() => {
                      getData(
                        'Generate outline of a Research Paper on Artificial Intelligence and its Future.'
                      );
                    }}
                    class="w-full bg-gray-50  p-3 rounded-md hover:bg-gray-200 "
                  >
                    "Generate outline of a Research Paper on Artificial Intelligence and its
                    Future." →
                  </button>
                  <button
                    onClick={() => {
                      getData(
                        'Generate a social media post on college fest organising on 5th March 2023.'
                      );
                    }}
                    class="w-full bg-gray-50  p-3 rounded-md hover:bg-gray-200 "
                  >
                    "Generate a social media post on college fest organising on 5th March 2023." →
                  </button>
                  <button
                    onClick={() => {
                      getData('How do I make an API request in Javascript using axios?');
                    }}
                    class="w-full bg-gray-50  p-3 rounded-md hover:bg-gray-200 "
                  >
                    "How do I make an API request in Javascript using axios?" →
                  </button>
                </ul>
              </div>
              <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                  <BsLightningCharge size={30} />
                  Upcoming
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                  <li class="w-full bg-gray-50  p-3 rounded-md">Search Internet</li>
                  <li class="w-full bg-gray-50  p-3 rounded-md">
                    Generate Copy-Right Free and Unique Images
                  </li>
                </ul>
              </div>
              <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                  <BiError size={30} />
                  Privacy & Limitation
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                  <li class="w-full bg-gray-50  p-3 rounded-md">
                    Your search query will be used to make the AI Model better and more accurate
                  </li>
                  <li class="w-full bg-gray-50  p-3 rounded-md">
                    We'll track your search query to comply our Vision of Responsible AI
                  </li>
                  <li class="w-full bg-gray-50  p-3 rounded-md">
                    Inappropriate search might led to termination of account
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {qna.length > 0 && (
        <div className="pb-36 lg:pb-7 flex flex-col items-center text-sm min-h-[70vh]">
          {qna.map((item, index) => {
            if (item.who == 'user') {
              return (
                <div
                  key={item.text}
                  className="w-full border-b border-black/10 text-gray-800 group "
                >
                  <div className="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                    <div className="w-[30px] flex flex-col relative items-start">
                      {authState.user.id ? (
                        <img src="/img/user_icon.png" className="h-[30px] w-[30px] rounded-md" />
                      ) : (
                        <FaUserAlt size={30} className="rounded-md" />
                      )}
                    </div>
                    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                        {item.text}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (item.who == 'ai') {
              return (
                <div
                  key={item.text}
                  className="w-full border-b border-black/10 text-gray-800 bg-gray-200 group "
                >
                  <div className="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                    <div className="w-[30px] flex flex-col relative items-start">
                      <img
                        src={'/img/logo_withoutname.png'}
                        className="h-[30px] w-[30px] rounded-md"
                      />
                    </div>
                    <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                      <div className="min-h-[20px] whitespace-pre-wrap">
                        {qna.length - 1 == index ? (
                          <>
                            <Typewriter
                              words={[item.text]}
                              loop={1}
                              typeSpeed={5}
                              onType={(n) => {
                                handletypeWriterTyping(n);
                              }}
                              cursor={showCursor}
                              cursorBlinking={false}
                              cursorStyle={
                                <span
                                  className={`cursor-ai-blink ${showCursor ? '' : 'hidden'}`}
                                ></span>
                              }
                            />
                            {/* <span className={`cursor-ai-blink ${showCursor?"":"hidden"}`} ></span> */}
                          </>
                        ) : (
                          item.text
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}

      <div className="absolute md:sticky bottom-0 py-5 pt-10 w-full bg-gradient-to-t from-gray-100 via-gray-100  to-transparent px-4 md:px-14 ">
        {/* regenrate buton */}
        {!loading && qna.length > 0 && (
          <div class="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center mb-4 ">
            <button
              onClick={regenrateResponse}
              class="btn flex justify-center items-center gap-2 btn-neutral border-0 md:border bg-white py-1.5 px-4 rounded-md"
            >
              <TbRefresh size={14} />
              Regenerate response
            </button>
          </div>
        )}

        {/*  */}
        <div className=" text-[16px] flex flex-row w-full md:w-3/4 mx-auto py-2 px-4 flex-gorw relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
          <textarea
            value={inputText}
            id="text-input"
            onKeyDown={handleInputkeyPress}
            onChange={handleInputValueChange}
            rows={1}
            className="m-0 w-full resize-none border-none bg-transparent p-0 pl-1 pr-7 focus:ring-0 focus-visible:ring-0 outline-none"
            style={{ maxHeight: '200px' }}
          ></textarea>
          <button
            onClick={handleOnSubmit}
            disabled={loading}
            className={`absolute p-1 bottom-1.5 right-3 rounded-md text-gray-500  text-[22px] ${
              !loading ? 'hover:bg-gray-200 ' : 'cursor-text'
            } `}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <TbSend />}
          </button>
        </div>
      </div>
    </div>
  );
};

const MoreInfoToggle = () => {
  return (
    <div className="grow-0 shrink-0 basis-auto">
      <p>Free to change level if not satisfied with the results.</p>
      <p>The higher the level, the more factual AI will be, check below...</p>
      <div className="flex">
        <div className="shrink-0 mt-1">
          <img
            src="https://img.icons8.com/flat-round/64/000000/arrow--v1.png"
            width={20}
            height={20}
          />
        </div>
        <div className="grow ml-4">
          <p className=" mb-1">
            <span className="text-ot-blue font-medium">Interesting</span> - Best for extract data
            like Keywords, questions & answers
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="shrink-0 mt-1">
          <img
            src="https://img.icons8.com/flat-round/64/000000/arrow--v1.png"
            width={20}
            height={20}
          />
        </div>
        <div className="grow ml-4">
          <p className="mb-1">
            <span className="text-ot-blue font-medium">Low</span> - Best for extraction from text
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="shrink-0 mt-1">
          <img
            src="https://img.icons8.com/flat-round/64/000000/arrow--v1.png"
            width={20}
            height={20}
          />
        </div>
        <div className="grow ml-4">
          <p className="mb-1">
            <span className="text-ot-blue font-medium">Medium</span> - Almost same as Recommended
            but a little better
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="shrink-0 mt-1">
          <img
            src="https://img.icons8.com/flat-round/64/000000/arrow--v1.png"
            width={20}
            height={20}
          />
        </div>
        <div className="grow ml-4">
          <p className="mb-1">
            <span className="text-ot-blue font-medium">Recommended</span> - If not sure choose this
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="shrink-0 mt-1">
          <img
            src="https://img.icons8.com/flat-round/64/000000/arrow--v1.png"
            width={20}
            height={20}
          />
        </div>
        <div className="grow ml-4">
          <p className="mb-1">
            <span className="text-ot-blue font-medium">High</span> - Common for ideas generation, or
            story completion
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="shrink-0 mt-1">
          <img
            src="https://img.icons8.com/flat-round/64/000000/arrow--v1.png"
            width={20}
            height={20}
          />
        </div>
        <div className="grow ml-4">
          <p className="mb-1">
            <span className="text-ot-blue font-medium">Factual</span> - Sometimes interesting but
            facts based results
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIContentOption2;
