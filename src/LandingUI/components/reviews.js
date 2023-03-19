import React from 'react';
import StarIcon from '@mui/icons-material/Star';

const texts = [
  'This is game changing.',
  'This is going to save a lot of money',
  'Affordable price bracket'
];

const Reviews = () => {
  return (
    <div className="flex flex-col lg:flex-row xl:flex-row items-center justify-evenly">
      {texts.map((text, index) => (
        <div
          className={
            index == 2
              ? 'flex flex-col items-center justify-center'
              : 'flex flex-col items-center justify-center invisible lg:visible'
          }
        >
          <div>{text}</div>
          <div>
            <StarIcon style={{ color: '#F5BE41' }} />
            <StarIcon style={{ color: '#F5BE41' }} />
            <StarIcon style={{ color: '#F5BE41' }} />
            <StarIcon style={{ color: '#F5BE41' }} />
            <StarIcon style={{ color: '#F5BE41' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
