import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

export default function CreativitySlider() {
  return (
    <Box sx={{ width: '150px' }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={20}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => (
          <div>{value == 0 ? marks[0].label : marks[Math.round(value / 20)].label}</div>
        )}
        // marks={marks}
      />
    </Box>
  );
}
