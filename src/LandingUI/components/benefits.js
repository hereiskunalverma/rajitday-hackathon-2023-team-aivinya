import Image from 'next/image';
import React from 'react';
import Container from './container';
import Link from 'next/link';

export default function Benefits(props) {
  const { data } = props;

  return (
    <>
      <Container className="flex flex-wrap lg:gap-10 lg:flex-nowrap px-0.5 lg:px-28">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 px-5 ${
            props.imgPos === 'right' ? 'lg:order-1' : ''
          }`}
        >
          <div>
            <Image src={data.image} alt="Benefits" layout="intrinsic" placeholder="blur" />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 px-5 ${
            props.imgPos === 'right' ? 'lg:justify-end' : ''
          }`}
        >
          <div>
            <div className="flex flex-col w-full mt-2">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-white lg:leading-tight lg:text-4xl ">
                {data.title}
              </h3>

              <p
                className="max-w-2xl text-xl text-white lg:text-3xl xl:text-3xl "
                style={{ lineHeight: '40px' }}
              >
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

function Benefit(props) {
  return (
    <>
      <div className="flex mt-4 items-start space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 bg-indigo-500 rounded-md w-11 h-11 ">
          {React.cloneElement(props.icon, {
            className: 'w-7 h-7 text-indigo-50'
          })}
        </div>
        <div>
          <h4 className="text-2xl font-medium text-white ">{props.title}</h4>
          <p className="text-white ">{props.children}</p>
        </div>
      </div>
    </>
  );
}
