import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Slider,
  Modal
} from '@mui/material';

const AivaDisplay = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const size = ['low','mid','high']
  return (
    <div className="container my-24 px-6 mx-auto">
      {/* Section: Design Block */}
      <section className="mb-32 text-gray-800">
        <div className="flex flex-wrap">
          <div className="grow-0 shrink-0 basis-auto mb-12 md:mb-0 w-full md:w-7/12 px-3 lg:px-6">
            <div>
              <img src="https://picsum.photos/1000/600" />
              <div className="my-8">
              <div className="md:flex flex-row">
        <input type="text" className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Enter Ideas" />
        <button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">
          Submit
        </button>
      </div>
              </div>
            </div>
          </div>
          <div className="grow-0 shrink-0 basis-auto w-full md:w-5/12 px-3 lg:px-6">
            <p className="font-bold mb-6">Enter the custom</p>
            <form>
            <Box className="my-4" sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Width</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={width}
                label="Width"
                onChange={(e) => setWidth(e.target.value)}
              >
                  {size.map((item, index) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="my-4" sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Height</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={height}
                label="Width"
                onChange={(e) => setHeight(e.target.value)}
              >
                  {size.map((item, index) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

              <button
                className={
                  !(width == '' || height == '')
                    ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                }
                disabled={width == '' || height == ''? true : false}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Section: Design Block */}
    </div>
  );
};

export default AivaDisplay;
