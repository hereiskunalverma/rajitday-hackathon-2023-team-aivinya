import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Slider, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';
// import { EditorState } from "draft-js";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
import { useRouter } from 'next/router';
import AlertMessage from 'LandingUI/components/alert';

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

const AIContentOption6 = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [outputText, setOutputText] = useState('');
  const [inputText, setInputText] = useState('');
  const [credits, setCredits] = useState(1000);

  // loading state
  const [loading, setLoading] = useState(false);

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
    console.log({
      text: inputText
    });
    axios
      .post(`${url}/api/get/aicontet/aisentiment`, {
        text: inputText
      })
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
    <div className="h-screen">
      <span>
        Remaining Credits: <b>{credits}</b>
      </span>

      <h1 style={{ fontSize: '1.2rem' }}>
        Don't know what it sounds like ? I'll analysis it for you.
      </h1>
      <div className="mt-3">
        <label>Enter text to analyze ...</label>
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

export default AIContentOption6;
