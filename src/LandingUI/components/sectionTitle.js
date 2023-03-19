import React from 'react';
import Container from './container';

export default function SectionTitle(props) {
  return (
    <Container
      className={`flex w-full flex-col px-3  ${
        props.align === 'left' ? '' : 'items-center justify-center text-center text-black px-5'
      } ${props.pretitle === 'AIvinya Benefits' ? 'pt-0 lg:-mt-0' : 'mt-10'}`}
    >
      {props.pretitle && (
        <div className="text-sm font-extrabold tracking-wider text-3xl animate-text tracking-[0.02em] font-medium font-clash-grotesk [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
          {props.pretitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-black lg:leading-tight lg:text-4xl ">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="max-w-2xl py-4 text-md leading-normal font-bold text-black lg:text-xl xl:text-xl ">
          {props.children}
        </p>
      )}
    </Container>
  );
}
