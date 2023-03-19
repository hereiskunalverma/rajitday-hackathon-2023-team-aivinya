import React from 'react';
import Image from 'next/image';
import userOneImg from '../../../public/img/user1.jpg';
import userTwoImg from '../../../public/img/user2.jpg';
import userThreeImg from '../../../public/img/user3.jpg';
import Star from '@mui/icons-material/Star';

function Mark(props) {
  return (
    <>
      {' '}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 ">
        {props.children}
      </mark>{' '}
    </>
  );
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          layout="responsive"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-md lg:text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 ">{props.title}</div>
      </div>
    </div>
  );
}

const TestimonialCard = (props) => {
  return (
    <div
      className={
        props.align == 'left'
          ? 'flex flex-col justify-center w-1/4  bg-white shadow-lg px-5 rounded-2xl py-5 -ml-20 absolute -rotate-6 left-16 z-10 invisible lg:visible -bottom-36'
          : 'flex flex-col justify-center w-1/4  bg-white shadow-lg px-5 rounded-2xl py-5 absolute right-24 lg:-right-3 rotate-6 invisible lg:visible -bottom-36'
      }
    >
      {props.testimonial}

      {/* <Avatar
              image={props.userImage == "one" ? userOneImg : userThreeImg}
              name={props.userName}
            /> */}
      <div className="flex items-center justify-center">
        <Star className="text-ot-blue" />
        <Star className="text-ot-blue" />
        <Star className="text-ot-blue" />
        <Star className="text-ot-blue" />
        <Star className="text-ot-blue" />
      </div>
    </div>
  );
};

export default TestimonialCard;
