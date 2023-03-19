import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Slider, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';
import axios from 'axios';
import AlertMessage from 'LandingUI/components/alert';
import { CircularProgress } from '@mui/material';
import CustomModal from 'LandingUI/components/CustomModal';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
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

const AIContentOption4 = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [docList, setDocList] = useState([]);

  const [currentDoc, setCurrentDoc] = useState(0);

  // loading state
  const [loading, setLoading] = useState(false);

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const useCaseList = ['AI Summarizer - Basic', 'AI Summarizer - Advanced'];
  const [useCase, setUseCase] = useState(useCaseList[0]);
  const [credits, setCredits] = useState(1000);

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

  const getData = () => {
    if (credits <= 0) {
      AlterMessage(
        'You have no credits left, please upgrade your plan to continue using our services',
        'error'
      );
      return;
    }
    AlertMessage('Generating...', 'info');
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
      .post(
        `${url}/api/get/aicontet/${useCase === 'AI Summarizer - Basic' ? 'aisum1' : 'aisum2'}`,
        {
          text: inputText
        }
      )
      .then(function (response) {
        console.log(response.data.res);
        AlertMessage('Generated Successfully', 'success');
        setOutputText(response.data.res);

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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  if (credits <= 0) return <p>Upgrade your subscription to continue.</p>;
  return (
    <div className="h-screen p-3">
      <span>
        Remaining Credits: <b>{credits}</b>
      </span>

      <h1 style={{ fontSize: '1.2rem' }}>
        Summarize it and make it understand even to second-grade student
      </h1>
      <div className="bg-white p-3 w-1/3 rounded-full  outline-none ring-0 border  border-black/40 hover:border-blue-700 focus:border-blue-700 justify-evenly items-center">
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Model</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={useCase}
              label="Tone"
              onChange={(e) => setUseCase(e.target.value)}
              required
            >
              {useCaseList.map((item, index) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="mt-3">
        <label>Enter paragraph to summarize</label>
        <div className="flex justify-end">
          Characters: {inputText.length} &nbsp; Words:{' '}
          {inputText.length == '' ? 0 : inputText.trim().split(/\s+/).length}
        </div>
        <textarea
          className="w-full h-1/2 bg-slate-100 p-3 rounded-lg mt-1"
          style={{ border: '1px solid #1F2937' }}
          placeholder="Start typing..."
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
      </div>

      <div className="h-3/4 mt-3">
        <div className="flex justify-center items-center mt-3">
          <button
            className={
              !(inputText == '')
                ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
            }
            disabled={inputText == '' ? true : false}
            onClick={getData}
          >
            {loading ? <CircularProgress color="inherit" /> : 'Generate'}
          </button>
        </div>

        <TextEditor value={outputText} />
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

export default AIContentOption4;
