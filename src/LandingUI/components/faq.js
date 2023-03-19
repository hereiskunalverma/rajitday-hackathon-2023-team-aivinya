import React from 'react';
import Container from './container';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { Link } from '@mui/material';

export default function Faq() {
  return (
    <Container className="!p-0">
      <Container className="flex w-full flex-col px-3 items-center justify-center text-center text-white px-5">
        <h2 className="max-w-2xl mt-3 text-3xl lowercase font-semibold leading-snug tracking-tight animate-text [background:linear-gradient(90deg,_#ff3bff,_#ecbfbf_38.02%,_#5c24ff_75.83%,_#d94fd5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block ">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl pt-4 text-md text-extrabold leading-normal text-white lg:text-xl xl:text-xl ">
          If you need more assistance, feel free to reach out to us on{' '}
          <Link href="/contact">
            <a>
              <span className="text-white font-bolder">contact</span>
            </a>
          </Link>
        </p>
      </Container>
      <div className="w-full max-w-2xl p-2 mx-auto mb-16 rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-white bg-none focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 rounded-full border-2 border-blue-400 hover:border-fuchsia-500">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-white ">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: 'Is this free to get started?',
    answer: 'Yes, We offer 10,000 credits to get started.'
  },
  {
    question: 'How do I get free credits ?',
    answer:
      'Login the checkout the Free Credits tab, you will get the process. It is as simple as filling a form'
  },
  {
    question: 'Is the content generated original and plagiarism free ?',
    answer: 'Yes, absolutely Aivinya model generates 100% original plag-free content.'
  },
  {
    question: 'Do you offer integraitons in WhatsApp, and other social media platforms ?',
    answer: 'Yes, we do have integrations in WhatsApp, Discord, and Telegram.'
  },
  {
    question: 'Do you guys offer API to integrate in my website/app ? ',
    answer: 'Yes, we do have API support with our premium plan.'
  },
  {
    question: 'Does your AI support human tones like humour, funny, clever, etc ? ',
    answer:
      'Yes, our AI support more than 15+ human tones. You can checkout visiting our dashboard.'
  },
  {
    question: 'Does your AI support languages like hindi, rusian, engish, chinese, etc ?',
    answer:
      "Yes, our AI support more than 25+ languages and you can generate content in any of them. We're also targeting to build input languages. "
  }
];
