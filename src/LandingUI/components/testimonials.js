import Image from 'next/image';
import React from 'react';
import Container from './container';

import userOneImg from '../../../public/img/user1.jpg';
import userTwoImg from '../../../public/img/user2.jpg';
import userThreeImg from '../../../public/img/user3.jpg';

import Star from '@mui/icons-material/Star';

export default function Testimonials() {
  return (
    <Container className="flex items-center justify-center px-0 lg:px-28">
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 px-1" style={{ padding: '10px' }}>
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 ">
            <p className="text-md  leading-normal ">
              This is <Mark>game changing</Mark>. I've worked with AIvinya team previously and must
              say they are professionals, and now they are automating an industry, Can't wait for
              the launch
            </p>

            {/* <Avatar
              image={userOneImg}
              name="Terri J Davis"
            /> */}
            <div className="flex items-center justify-center">
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 ">
            <p className="text-md  leading-normal ">
              This is going to <Mark>save a lot of money</Mark>, already mailed to signed up for a
              yearly subscription
            </p>

            <div className="flex items-center justify-center">
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 ">
            <p className="text-md leading-normal ">
              The offering is too much under such an <Mark>affordable price bracket</Mark>. I've
              talked talked to the team, and the pricing is amazing, by far the most affordable in
              the industry
            </p>

            <div className="flex items-center justify-center">
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
              <Star className="text-ot-blue" />
            </div>
          </div>
        </div>
      </div>
    </Container>
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

export function Mark(props) {
  return (
    <>
      {' '}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 ">
        {props.children}
      </mark>{' '}
    </>
  );
}
