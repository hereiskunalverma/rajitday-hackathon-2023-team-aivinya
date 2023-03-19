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
import CreativitySlider from './CreaitivitySlider';
import styled from 'styled-components';
import axios from 'axios';
import ReactFlagsSelect from 'react-flags-select';
import { convertToRaw } from 'draft-js';
// import { ContentState } from "draft-js";
import { CircularProgress } from '@mui/material';
import CustomModal from 'LandingUI/components/CustomModal';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
import AlertMessage from 'LandingUI/components/alert';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { set } from 'lodash';
import Link from 'next/link';
import { message } from 'antd';
import { root } from 'postcss';
import { RxHamburgerMenu } from 'react-icons/rx';
const TextEditor = dynamic(() => import('./TextEditor'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <>
      <Skeleton variant="text" sx={{ width: '15%' }} />
      <Skeleton variant="rectangular" sx={{ width: '100%', marginBottom: 3 }} height={100} />
    </>
  )
});

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const placeholders = [
  [
    'AI marketing, AI writer',
    '1. How AI Is Helping Marketers Do Their Job Better\n2. How AI Is Transforming the Marketing Industry\n3. How AI Can Help Marketers Connect With Customers\n4. How AI Helps Marketers Understand Their Customers\n5. How AI Helps Marketers Plan Their Campaigns\n6. How AI Makes Marketing More Efficient\n7. How AI Can Improve Targeted Advertising\n8. What Marketers Need to Know About AI\n9. How AI Is Changing the Way We Write\n10. How AI Is Impacting journalism'
  ],
  [
    'AI Marketing and Future',
    '1. Introduction to AI Marketing\n2. AI Marketing and the Consumer Journey\n3. AI Marketing and Personalization\n4. AI Marketing and Lead Generation\n5. AI Marketing and Sales\n6. AI Marketing and Customer Service\n7. AI Marketing and Market Research\n8. AI Marketing and Competitive Analysis\n9. AI Marketing and Branding\n10. The Future of AI Marketing'
  ],
  [
    'Getting Started with Aivinya - AI Marketing Platform',
    "\n\nAivinya is an AI marketing platform that enables businesses to connect with their customers and prospects in a more personal and engaging way. The platform provides a suite of tools to help businesses automate their marketing tasks, including email marketing, social media marketing, and lead generation. Aivinya also offers a number of features to help businesses better understand their customers, including customer segmentation, customer profiling, and customer journey mapping. In this blog post, we'll provide an overview of the Aivinya platform and how it can help businesses grow their customer base and improve their marketing efforts."
  ],
  [
    'An AI powered marketing platform for auto-generating content, email automation and website and app development',
    '\n1. Automark\n2. AutoGen\n3. AutoMarketing\n4. AutoContent\n5. Email Automation\n6. Website Development\n7. App Development\n8. Automated Marketing\n9. Intelligent Marketing\n10. Smart Marketing'
  ],
  [
    'AI powered marketing platform that automate email marketing, content writing for businesses and startups.',
    '\nIn a rapidly developing world, your business needs to move fast and stay ahead of the competition to be successful. That’s why you need the latest, most advanced marketing tools available, and that’s where we come in. Our AI powered marketing tools automate email marketing, content writing for businesses and startups, so you can focus on what you do best – running your business.\n\nHere’s how it works: our software scans your website and blog to understand your business and customers. It then creates targeted email marketing campaigns and content that’s designed to engage and convert your customers. And it doesn’t stop there – our tools also track results and ROI, so you can see exactly what’s working and adjust your campaigns accordingly.\n\nIn short, our AI powered marketing tools are the perfect solution for busy businesses and startups who want to stay ahead of the competition. If you’re looking for an edge, look no further – we’re here to help you succeed.'
  ],
  [
    'AI marketing platform, saas, marketing automation',
    'AI, content writer, email automation, tech development',
    "1. A content writing platform that uses AI to help businesses create and optimize their content for better engagement with their customers.\n\n2. A marketing automation platform that uses AI to help businesses automate their marketing tasks and improve their customer engagement.\n\n3. A saas platform that uses AI to help businesses with their marketing tasks and improve their customer engagement.\n\n4. A marketing platform that uses AI to help businesses target their customers with more personalized and relevant messages.\n\n5. A platform that uses AI to help businesses create and manage their social media campaigns for better engagement with their customers.\n\n6. A platform that uses AI to help businesses track and analyze their customer engagement data to improve their marketing strategies.\n\n7. A platform that uses AI to help businesses create and deliver targeted email campaigns to their customers.\n\n8. A platform that uses AI to help businesses identify and engage with influencers who can promote their products or services.\n\n9. A platform that uses AI to help businesses create and manage their online advertising campaigns for better engagement with their customers.\n\n10. A platform that uses AI to help businesses research and analyze their competitor's marketing strategies."
  ],
  [],
  [],
  [
    'Software Engineer',
    'nodejs, backend development, aws, git/github, 3 years of experience, jenkins',
    '\nTo Whom it May Concern,\n\nI am writing to apply for the role of Software Engineer. I am a nodejs developer with 3 years of experience. I have experience with backend development, aws, git/github, and jenkins. I am a quick learner and have a strong work ethic. I am confident that I can be a valuable asset to your team.\n\nThank you for your time and consideration.\n\nSincerely,\n\n[Your Name]'
  ],
  [
    'AI Marketing Automation Tool that can automate email campaigning, content writing and analytics',
    'cold',
    ''
  ],
  [
    'Aivinya - AI Powered Marketing Platform',
    'Aivinya is a AI marketing platform that automates content writing, email automation, and many more',
    'AI Marketing Tools',
    '\nLooking for an AI marketing platform that can help take your business to the next level? Aivinya is the perfect solution! We offer content writing, email automation, and many other features to help you save time and grow your business.'
  ],
  [
    'general',
    'John Doe is a software engineer with 3 years of experience in backend development and tools like git, aws, nodejs, jenkins and express.js',
    'Interviewing a candidate for the role of software engineer',
    'Get most optimized interview questions for any domain (tech, sales, hr, etc)'
  ],
  ['Software Engineer', 'Generate Job Description for any domain (tech, sales, hr, etc)'],
  [
    'Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals and humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.The term artificial intelligence had previously been used to describe machines that mimic and display human cognitive skills that are associated with the human mind, such as learning and problem-solving.',
    '\n\nAI, intelligence, agents, learning, problem-solving, rationality, web search, recommendation, human speech, self-driving cars, automated decision-making, strategic games, optical character recognition.'
  ],
  [
    'AI Marketing Platform',
    10,
    '\n\n1. AI Marketing Platform\n2. AI Marketing Software\n3. AI Marketing Services\n4. AI Marketing Solutions\n5. AI Marketing Strategies\n6. AI Marketing Tactics\n7. AI Marketing Tools\n8. AI Marketing Trends\n9. AI Marketing Services\n10. AI Marketing Services'
  ],
  [],
  [
    'Aivinya - AI Marketing Platform',
    '\n\n1. Aivinya is the best AI marketing platform out there!\n\n2. With Aivinya, you can easily create and manage your marketing campaigns with the help of AI!\n\n3. Aivinya makes marketing easier than ever before!\n\n4. With Aivinya, you can take your marketing to the next level!\n\n5. Aivinya is the future of marketing!\n\n6. With Aivinya, you can create smarter marketing campaigns!\n\n7. Aivinya makes it easy to target your audience with AI!\n\n8. Aivinya is the perfect platform for any business that wants to use AI in their marketing!\n\n9. With Aivinya, you can reach your target audience like never before!\n\n10. Aivinya is the ultimate AI marketing platform!'
  ],
  [
    'Aiviya',
    'Aivinya is an AI powered marketing platform that automates content writing, email marketing, tech development, and many more',
    '\n\nAiviya is the world’s first AI-powered marketing platform that automates content writing, email marketing, tech development, and many more. With Aiviya, you can easily create and manage your marketing campaigns without any hassle.'
  ],
  [
    'Software Engineer with hands-on experience on aws, react, jenkins, git, having experience of more than 5 years',
    '\n\nWell, you got an amazing profile, lets generate some bio for it'
  ],
  [
    'The concept of Artificial Intelligence was introduced back in 1950. Alan Turing, a mathematician and computer scientist designed a machine named as “Turing Machine”. This machine can test whether the computers can make decisions or not. The test can check the ability of machines to respond like humans.The year 1956 is considered as the birth of Artificial Intelligence. John McCarthy, a computer scientist has introduced the word “Artificial Intelligence” in the world of computer science.In 1966, the first chatbot by the name “Eliza” (Natural Language Processing computer program) was developed by Joseph Weizenbaum. In 1972, Japan developed the first humanoid robot by the name “WABOT-1” (WAseda roBOT).',
    '\n\n1. Who introduced the concept of Artificial Intelligence?\n2. Who designed the "Turing Machine"?\n3. What is the "Turing Test"?\n4. Who introduced the term "Artificial Intelligence"?\n5. What was the first chatbot called?\n6. Who developed the first humanoid robot?\n\n1. The concept of Artificial Intelligence was introduced back in 1950 by Alan Turing. \n2. The "Turing Machine" was designed by mathematician and computer scientist Alan Turing. \n3. The "Turing Test" can test whether the computers can make decisions or not by checking the ability of machines to respond like humans. \n4. The term "Artificial Intelligence" was introduced by computer scientist John McCarthy in the world of computer science. \n5. The first chatbot was called "Eliza" and was developed by Joseph Weizenbaum. \n6. The first humanoid robot was developed by Japan and was called "WABOT-1".'
  ],
  [],
  [
    'Aivinya - AI Marketing Platform',
    '\n\nAivinya is an AI marketing platform that enables businesses to automate their marketing tasks and improve their customer engagement.'
  ],
  [
    'AI marketing platform, email automation, content writing, tech development, analytics',
    '\n\nThe Best AI Marketing Platforms to Help Automate Email Marketing and Content Writing'
  ],
  [],
  [
    'couples beatufiul evening love',
    "\n\nCouples walking in the evening,\nLove is in the air.\nThey look so happy together,\nSo in love and care.\n\nI wish I had someone like that,\nSomeone to love me back.\nBut for now I'll just keep dreaming,\nAnd wait for my perfect match."
  ],
  [
    'Horror House Kids Monster',
    '\nIn the small town of Shepherdstown, the kids always gossip about the Horror House Kids. They say that the Horror House Kids are monsters, and that they live in a house full of horrors. No one knows for sure if the stories are true, but the kids are always scared to go near the house.\n\nOne day, a group of brave kids decide to go to the Horror House to see if the stories are true. They knock on the door, and a monster answers! The kids scream and run away, but they are now convinced that the Horror House Kids are real monsters.'
  ],
  [],
  [
    'Aivinya - AI Marketing Platform tutorial',
    "\n\nAivinya is the world's first AI marketing platform that enables you to create, manage, and optimize your marketing campaigns using artificial intelligence. In this tutorial, we'll show you how to use Aivinya to create a campaign, manage your budget, and optimize your ads for maximum results."
  ],

  [
    'AI, Marketing, Automation, Content Writing, SaaS',
    '\n\n-A tour of our AI-powered marketing automation platform\n-A demo of our AI-powered content writing software\n-A look at how AI is changing the marketing landscape\n-How to use AI to automate your marketing tasks\n-The benefits of using a SaaS platform for your marketing needs'
  ]
];

const Title = styled.h1`
  font-size: 1.25rem;
`;

const AIContentOption1 = () => {
  // const classes = useStyles();

  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const splitPath = router.asPath.split('/');
  const org_id = splitPath[2];

  const getDocs = () => {
    axios
      .post(`${url}/api/get/aicontdoc`, {
        org_id: `${org_id}`,
        feature: 'aiwriter'
      })
      .then(function (response) {
        let tempList = [];
        response.data.map((item) => {
          console.log(item._doc);
          tempList.push(item._doc);
        });
        setDocList(tempList);
        // setOutputText(response.data.res)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get user plan info
  useEffect(() => {
    const planRestrictions = JSON.parse(localStorage.getItem('org'));
    console.log('plan res', planRestrictions);
    console.log(org_id);
    if (!planRestrictions) {
      AlertMessage('Something went wrong, please try again', 'error');
      router.push('/user/dashboard');
      return;
    }
    setCredits(planRestrictions.credits);
    getDocs();
    console.log(placeholders);
    if (credits <= 0)
      AlertMessage('Your credits have expired. Upgrade your plan to continue.', 'error');
  }, []);

  // loading state
  const [loading, setLoading] = useState(false);
  const iconUseCaseList = [];
  const useCaseList = [
    'Blog topics & outline',
    'Blog sections',
    'Blog section expander',
    'Business name generator',
    'Business pitch generator',
    'Business ideas generator',
    'Copywriting Framework: AIDA',
    'Copywriting Framework: PAS',
    'Cover letter',
    'Email generation',
    'Ads generation',
    'Interview questions',
    'Job Description',
    'Keyword extractor',
    'Keyword generator',
    'Landing Page & Website Copies',
    'Post ideas',
    'Product description',
    'Profile bio',
    'Question Answers',
    'Reply to Reviews & Messages',
    'SEO Meta Description',
    'SEO Meta Title',
    'SMS & Notifications',
    'Song ideas',
    'Story generation',
    'Testimonial & Review',
    'Youtube description',
    'Youtube idea'
  ];
  const apiList = [
    'blogtopics',
    'blogsections',
    'blogsectionexpander',
    'businessnames',
    'businesspitch',
    'businessideas',
    'aidacopy',
    'pascopy',
    'coverletter',
    'emails',
    'ads',
    'interview',
    'jobdesc',
    'keywords',
    'newkeywords',
    'sitecopy',
    'postideas',
    'productdescription',
    'productbio',
    'qans',
    'reply',
    'seodesc',
    'seotitle',
    'sms',
    'songideas',
    'story',
    'review',
    'ytdesc',
    'ytidea'
  ];

  const [selected, setSelected] = useState('US');
  const [useCase, setUseCase] = useState(0);
  const [sectionTitle, setSectionTitle] = useState('');

  const [tone, setTone] = useState('');
  const [model, setModel] = useState('');
  const [creativity, setCreativity] = useState('Recommended');
  const [language, setLanguage] = useState('English');

  const [keyword, setKeyword] = useState('');
  const [blogTopic, setBlogTopic] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [words, setWords] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [busiDesc, setBusiDesc] = useState('');
  const [idea, setIdea] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [skills, setSkills] = useState('');
  const [review_title, setReview_Title] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState('');
  const [points, setPoints] = useState('');
  const [features, setFeatures] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [bio, setBio] = useState('');
  const [ques, setQues] = useState('');
  const [total, setTotal] = useState('');
  const [post, setPost] = useState('');
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [about, setAbout] = useState('');
  const [purpose, setPurpose] = useState('');
  const [keywords, setKeywords] = useState('');
  const [variant, setVariant] = useState(1);

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const plan = JSON.parse(localStorage.getItem('org')).plan;

  const toneList =
    plan === 'free'
      ? ['Appreciative', 'Awestruck', 'Candid', 'Clever', 'Casual']
      : [
          'Appreciative',
          'Awestruck',
          'Candid',
          'Clever',
          'Casual',
          'Cautionary',
          'Compassionate',
          'Convincing',
          'Critical',
          'Earnest',
          'Enthusiastic',
          'Formal',
          'Funny',
          'Humble',
          'Humorous',
          'Informative',
          'Inspirational',
          'Joyful',
          'Passionate',
          'Professional',
          'Thoughtful',
          'Urgent',
          'Witty'
        ];
  const modelList = ['Super', 'Medium', 'Low'];
  const variantList = [1, 2, 3];

  const wordList = ['Short', 'Medium', 'Long'];
  const typeList = ['Technical', 'General'];
  const languageList = [
    'Arabic',
    'Bulgarian',
    'Chinese',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Farsi',
    'Filipino',
    'Finnish',
    'French',
    'German',
    'Greek',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Indonesian',
    'Italian',
    'Japanese',
    'Korean',
    'Lithuanian',
    'Malay',
    'Norwegian',
    'Polish',
    'Portuguese',
    'Romanian',
    'Russian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swedish',
    'Thai',
    'Turkish',
    'Ukrainian',
    'Vietnamese'
  ];
  const [docList, setDocList] = useState([]);
  const [titleIndex, setTitleIndex] = useState(0);
  const [credits, setCredits] = useState(1000);
  const flags = [
    'https://cdn-icons-png.flaticon.com/512/323/323301.png',
    'https://cdn-icons-png.flaticon.com/512/8363/8363171.png',
    'https://cdn-icons-png.flaticon.com/512/5315/5315264.png',
    'https://cdn-icons-png.flaticon.com/512/323/323285.png',
    'https://cdn-icons-png.flaticon.com/512/323/323332.png',
    'https://cdn-icons-png.flaticon.com/512/323/323275.png',
    'https://cdn-icons-png.flaticon.com/512/323/323329.png',
    'https://cdn-icons-png.flaticon.com/512/8363/8363208.png',
    'https://cdn-icons-png.flaticon.com/512/197/197561.png',
    'https://cdn-icons-png.flaticon.com/512/323/323359.png',
    'https://cdn-icons-png.flaticon.com/512/323/323315.png',
    'https://cdn-icons-png.flaticon.com/512/323/323332.png',
    'https://cdn-icons-png.flaticon.com/512/323/323302.png',
    'https://cdn-icons-png.flaticon.com/512/4852/4852791.png',
    'https://cdn-icons-png.flaticon.com/512/3909/3909444.png',
    'https://cdn-icons-png.flaticon.com/512/323/323287.png',
    'https://cdn-icons-png.flaticon.com/512/323/323372.png',
    'https://cdn-icons-png.flaticon.com/512/323/323325.png',
    'https://cdn-icons-png.flaticon.com/512/323/323308.png',
    'https://cdn-icons-png.flaticon.com/512/5111/5111586.png',
    'https://cdn-icons-png.flaticon.com/512/323/323271.png',
    'https://cdn-icons-png.flaticon.com/512/4854/4854148.png',
    'https://cdn-icons-png.flaticon.com/512/323/323334.png',
    'https://cdn-icons-png.flaticon.com/512/323/323338.png',
    'https://cdn-icons-png.flaticon.com/512/3909/3909361.png',
    'https://cdn-icons-png.flaticon.com/512/323/323296.png',
    'https://cdn-icons-png.flaticon.com/512/323/323300.png',
    'https://cdn-icons-png.flaticon.com/512/3909/3909257.png',
    'https://cdn-icons-png.flaticon.com/512/5315/5315850.png',
    'https://cdn-icons-png.flaticon.com/512/4855/4855742.png',
    'https://cdn-icons-png.flaticon.com/512/323/323364.png',
    'https://cdn-icons-png.flaticon.com/512/5315/5315604.png',
    'https://cdn-icons-png.flaticon.com/512/3909/3909414.png',
    'https://cdn-icons-png.flaticon.com/512/3909/3909266.png',
    'https://cdn-icons-png.flaticon.com/512/323/323319.png'
  ];
  const icons = [
    'https://cdn-icons-png.flaticon.com/512/2297/2297885.png',
    'https://cdn-icons-png.flaticon.com/512/3685/3685253.png',
    'https://cdn-icons-png.flaticon.com/512/2518/2518173.png',
    'https://cdn-icons-png.flaticon.com/512/6135/6135324.png',
    'https://cdn-icons-png.flaticon.com/512/1436/1436664.png',
    'https://cdn-icons-png.flaticon.com/512/2436/2436837.png',
    'https://cdn-icons-png.flaticon.com/512/1170/1170135.png',
    'https://cdn-icons-png.flaticon.com/512/2554/2554282.png',
    'https://cdn-icons-png.flaticon.com/512/8347/8347406.png',
    'https://cdn-icons-png.flaticon.com/512/3296/3296464.png',
    'https://cdn-icons-png.flaticon.com/512/7023/7023016.png',
    'https://cdn-icons-png.flaticon.com/512/2179/2179306.png',
    'https://cdn-icons-png.flaticon.com/512/9009/9009849.png',
    'https://cdn-icons-png.flaticon.com/512/2600/2600404.png',
    'https://cdn-icons-png.flaticon.com/512/2172/2172259.png',
    'https://cdn-icons-png.flaticon.com/512/1185/1185210.png',
    'https://cdn-icons-png.flaticon.com/512/7626/7626911.png',
    'https://cdn-icons-png.flaticon.com/512/4059/4059788.png',
    'https://cdn-icons-png.flaticon.com/512/4387/4387718.png',
    'https://cdn-icons-png.flaticon.com/512/2784/2784494.png',
    'https://cdn-icons-png.flaticon.com/512/3161/3161476.png',
    'https://cdn-icons-png.flaticon.com/512/6419/6419957.png',
    'https://cdn-icons-png.flaticon.com/512/2800/2800015.png',
    'https://cdn-icons-png.flaticon.com/512/2534/2534223.png',
    'https://cdn-icons-png.flaticon.com/512/8735/8735687.png',
    'https://cdn-icons-png.flaticon.com/512/3281/3281561.png',
    'https://cdn-icons-png.flaticon.com/512/2190/2190550.png',
    'https://cdn-icons-png.flaticon.com/512/440/440727.png',
    'https://cdn-icons-png.flaticon.com/512/1383/1383260.png'
  ];
  const titles = [
    'Generate High-Quality Blog Topics',
    'Generate Blogs Sections (Introduction, ...)',
    'Generate Whole Blog from few words',
    'Generate your Next 🦄 Business Name',
    'Generate your Next 🦄 Business Pitch',
    "Entrepreneurship is only for the bravest, let's get 'that' idea",
    'Generate AIDA Framework based marketing content',
    'Generate PAS Framework based marketing content',
    "Generate Cover Letter that lands directly to Interview's desk 😉. Best of Luck",
    'Generate High-Quality Cold Emails, Sales Emails, Newsletter Emails, Promotional Emails and ...',
    'Let that thing unleash on Social Media, generate high-quality posts/ads',
    'Get most optimized interview questions for any domain (tech, sales, hr, etc)',
    'Generate Job Description for any domain (tech, sales, hr, etc)',
    'Extract High-Quality Optimized Keywords from any text',
    'High-Quality Optimized Keywords for your content',
    'Generate Website Landing Page content that converts',
    'Generate Captions/Post Ideas for that your social media',
    'Generate High-Quality Product description from just few words',
    'Well, you got an amazing profile, lets generate some bio for it',
    'Extract Questions/Answers from a paragraph',
    "Generate responses to your customers' reviews, emails, & more",
    'Generate SEO-Optimized Meta Description',
    'Generate SEO-Optimized Meta Title',
    'Write converting content for SMS or app-push notifications',
    'Wanna be a song writer? Generate some amazing song lyrics',
    'Generate full drama,emotional,thriller... story plot from just a few words',
    'Generate review for your favorite product, people, or service',
    'Generate YouTube description for your amazing video',
    "Want to be a youtube influencer ? Let's get started with some trending youtube ideas"
  ];

  // placeholders for usecase -

  const [currentDoc, setCurrentDoc] = useState(0);

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
    console.log(`${url}/api/get/aicontent/${apiList[useCase]}`);
    console.log('post: ' + post);
    console.log('model: ' + model);
    console.log('tone: ' + tone);
    console.log('language: ' + language.toLowerCase());
    console.log('creativity: ' + creativity);
    // console.log(wordList[currentWord]);

    axios
      .post(`${url}/api/get/aicontent/${apiList[useCase]}`, {
        creativity: creativity,
        text: inputText,
        tone: tone,
        model: model,
        keyword: keyword,
        blogTopic: blogTopic,
        introduction: introduction,
        review_title: review_title,
        words: currentWord,
        currentWord: wordList[currentWord],
        busiDesc: busiDesc,
        idea: idea,
        interest: interest,
        message: message,
        skills: skills,
        role: role,
        type: type === 'Technical' ? 'technical' : type,
        points: points,
        title: title,
        desc: desc,
        bio: bio,
        features: features,
        context: context,
        ques: ques,
        total: total,
        post: post,
        name: name,
        about: about,
        purpose: purpose,
        keywords: keywords,
        language: language.toLowerCase(),
        variant: variant
      })
      .then(function (response) {
        console.log(response.data.res);
        setOutputText(response.data.res);

        if (
          credits -
            EditorState.createWithContent(ContentState.createFromText(response.data.res))
              .getCurrentContent()
              .getPlainText('\u0001')
              .trim()
              .split(/\s+/).length <
          0
        ) {
          setCredits(0);
          updateCredits(0);
        } else {
          setCredits(
            credits -
              EditorState.createWithContent(ContentState.createFromText(response.data.res))
                .getCurrentContent()
                .getPlainText('\u0001')
                .trim()
                .split(/\s+/).length
          );
          updateCredits(
            credits -
              EditorState.createWithContent(ContentState.createFromText(response.data.res))
                .getCurrentContent()
                .getPlainText('\u0001')
                .trim()
                .split(/\s+/).length
          );
        }

        let planRestrictions = JSON.parse(localStorage.getItem('org'));
        planRestrictions = {
          ...planRestrictions,
          credits:
            credits -
            EditorState.createWithContent(ContentState.createFromText(response.data.res))
              .getCurrentContent()
              .getPlainText('\u0001')
              .trim()
              .split(/\s+/).length
        };

        if (credits < 0)
          localStorage.setItem(
            'org',
            JSON.stringify({
              ...planRestrictions,
              credits: 0
            })
          );
        else localStorage.setItem('org', JSON.stringify(planRestrictions));

        setSectionTitle(response.data.title);
        AlertMessage('Generated Successfully', 'success');
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const postDoc = (data) => {
    let obj = {
      data: data,
      feature: 'aiwriter',
      org_id: `${org_id}`,
      title: prompt('Enter a title: ')
    };
    axios
      .post(`${url}/api/post/aicontdoc/`, obj)
      .then(function (response) {
        console.log(response);
        getDocs();
      })
      .catch(function (error) {
        console.log(error);
      });

    // window.reload()
  };

  const formHandler = (e) => {
    const val = e.target.value;
    console.log(val);
    setUseCase(val);
    setTitleIndex(val);
    console.log(titleIndex);
  };

  // style for input types
  let inputTypeSelect =
    'bg-white transition-all duration-300 rounded-full text-[16px] outline-none ring-0 border  border-black/40 hover:border-blue-700 focus:border-blue-700';
  let inputTypeSelectMenuItem = 'hover:bg-blue-50';
  let inputTypeText =
    'px-3 py-[7px] w-full bg-white transition-all duration-300 !rounded-full text-[16px] outline-none ring-0 border  border-black/40 hover:border-blue-700 focus:border-blue-700';
  let inputTypeTextArea =
    'p-3  w-full bg-white transition-all duration-300 !rounded-[20px] text-[16px] outline-none ring-0 border  border-black/40 hover:border-blue-700 focus:border-blue-700 min-h-[100px] h-full hover:ring-blue-500 focus:ring-blue-500 ';

  const [showSideBar, setShowSideBar] = useState(true);

  if (credits <= 0) return <p>Upgrade your subscription to continue.</p>;
  return (
    <div
      id="ai-writer"
      className="midcomponents-height overflow-hidden flex flex-col  lg:flex-row  w-full pb-5 lg:pb-0 "
    >
      {/* input side bar */}
      <div
        className={`midcomponents-height py-3 lg:py-0 bg-blue-50 ${
          showSideBar ? 'w-fit' : 'lg:w-0'
        }`}
      >
        <div id="aiwriter-leftsidebar" className="h-full lg:overflow-y-scroll overflow-x-hidden">
          <div
            className={`flex flex-row flex-wrap justify-start item gap-y-5 lg:gap-y-5  lg:px-3 py-5 lg:w-[350px] `}
          >
            {/* usecase */}
            <div className="w-full px-3">
              <Box sx={{ minWidth: 150 }}>
                <InputLabel id="demo-select-label" className="text-slate-800 aiwriter-inputLable">
                  Use Case
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    className={inputTypeSelect}
                    labelId="demo-small"
                    id="demo-select-small"
                    value={useCase}
                    onChange={formHandler}
                    style={{ height: '60' }}
                    displayEmpty
                  >
                    {useCaseList.map((item, index) => (
                      <MenuItem className={inputTypeSelectMenuItem} value={index} key={item}>
                        <div class="flex items-center text-black ">
                          <img style={{ width: 20 }} src={icons[index]}></img>
                          <span style={{ marginLeft: 8 }}>{item}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>

            {/* Language */}
            {[
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28
            ].includes(useCase) && (
              <div className="w-1/2 px-3">
                <Box sx={{ minWidth: 150 }}>
                  <InputLabel className="aiwriter-inputLable">Language</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      className={inputTypeSelect}
                      labelId="demo-small"
                      id="demo-simple-select"
                      value={language}
                      label="Language"
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{ height: '60' }}
                    >
                      {languageList.map((item, index) => (
                        <MenuItem className={inputTypeSelectMenuItem} value={item} key={item}>
                          <div class="flex items-center text-black">
                            <img style={{ width: 16 }} src={flags[index]}></img>
                            <span style={{ marginLeft: 8 }}>{item}</span>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            )}

            {/* Tone */}
            {[0, 1, 4, 6, 7, 9, 10, 13, 16, 17, 18, 20, 21, 23, 26].includes(useCase) && (
              <div className="w-1/2 px-3">
                <Box sx={{ height: {} }}>
                  <InputLabel id="demo-simple-select-label">Tone</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      className={inputTypeSelect}
                      labelId="demo-small"
                      id="demo-simple-select"
                      value={tone}
                      label="Tone"
                      onChange={(e) => setTone(e.target.value)}
                      style={{ height: '60' }}
                    >
                      {toneList.map((item, index) => (
                        <MenuItem
                          className={inputTypeSelectMenuItem}
                          value={item}
                          key={item}
                          postDoc={postDoc}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            )}

            {/* model */}
            {[0, 9, 10, 16].includes(useCase) && (
              <div className="w-1/2 px-3">
                <Box sx={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">Model</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      className={inputTypeSelect}
                      labelId="demo-small"
                      id="demo-simple-select"
                      value={model}
                      label="Model"
                      onChange={(e) => setModel(e.target.value)}
                      style={{ height: '60' }}
                    >
                      {modelList.map((item, index) => (
                        <MenuItem className={inputTypeSelectMenuItem} value={item} key={item}>
                          {item}
                          {item === 'Super' && ' (Recommended)'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            )}

            {/* varient */}
            {[
              2,
              4,
              6,
              7,
              8,
              9,
              10,
              12,
              15,
              16,
              17,
              18,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28
            ].includes(useCase) && (
              <div className="w-1/2 px-3">
                <Box sx={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">Variant</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      className={inputTypeSelect}
                      labelId="demo-small"
                      id="demo-simple-select"
                      value={variant}
                      label="Variant"
                      onChange={(e) => setVariant(e.target.value)}
                      style={{ height: '60' }}
                    >
                      {variantList.map((item, index) => (
                        <MenuItem className={inputTypeSelectMenuItem} value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            )}

            {/* Creativity */}
            {[0, 1, 2, 3, 4, 9, 10, 14, 16, 17, 18, 19, 21, 22, 25, 27].includes(useCase) && (
              <div className="w-1/2 px-3">
                <Box>
                  <InputLabel>Creativity</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      className={inputTypeSelect}
                      labelId="demo-small"
                      id="demo-simple-select"
                      value={creativity}
                      label="Creativity"
                      onChange={(e) => setCreativity(e.target.value)}
                      style={{ height: '60' }}
                    >
                      {marks.map((item, index) => (
                        <MenuItem
                          className={inputTypeSelectMenuItem}
                          value={item.label}
                          key={item.label}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            )}

            {/* Dynamic parameters */}
            <div className="w-full px-3">
              {/* input type text*/}
              <div className=" flex flex-col gap-5 items-center justify-between w-full">
                {/* Keyword */}
                {[0, 11, 12, 14, 22].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <>
                      <label
                        className={`aiwriter-inputLable ${
                          useCase == 11 && type != 'Technical' && 'text-gray-400'
                        }`}
                      >
                        {useCase == 14 ? 'Topic' : 'Keyword'}
                      </label>
                      <input
                        type="text"
                        className={inputTypeText}
                        disabled={useCase == 11 && type != 'Technical' ? true : false}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder={
                          (useCase == 0 && 'AI marketing, AI writer') ||
                          (useCase == 12 && 'nodejs, react, aws-cloud, btech, DSA') ||
                          (useCase == 14 && 'AI Marketing Platform') ||
                          (useCase == 22 &&
                            'AI marketing platform, email automation, content writing, tech development, analytics')
                        }
                      ></input>
                    </>
                  </div>
                )}

                {/* Blog Topic */}
                {[1].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">Blog Topic</label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={useCase == 1 && 'AI Marketing and Future'}
                      onChange={(e) => setBlogTopic(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Role */}
                {[8, 12].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">Role</label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={
                        (useCase == 8 && 'Software Engineer') ||
                        (useCase == 12 && 'Software Engineer')
                      }
                      onChange={(e) => setRole(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Type */}
                {[9, 11].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    {useCase == 9 ? (
                      <>
                        <label className="aiwriter-inputLable">Type</label>
                        <input
                          type="text"
                          className="p-3 bg-slate-100  border border-slate-500 rounded-md"
                          placeholder={
                            (useCase == 9 &&
                              "'cold email' or sales email' or 'newsletter email' or 'survey email'") ||
                            (useCase == 11 && 'General')
                          }
                          onChange={(e) => setType(e.target.value)}
                        ></input>
                      </>
                    ) : (
                      <div className="w-full">
                        <Box sx={{ minWidth: 150 }}>
                          <InputLabel id="demo-simple-select-label">Type</InputLabel>
                          <FormControl fullWidth>
                            <Select
                              className={inputTypeSelect}
                              labelId="demo-small"
                              id="demo-simple-select"
                              value={type}
                              label="Type"
                              onChange={(e) => setType(e.target.value)}
                            >
                              {typeList.map((item, index) => (
                                <MenuItem
                                  className={inputTypeSelectMenuItem}
                                  value={item}
                                  key={item}
                                >
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    )}
                  </div>
                )}

                {/* Title */}
                {[10, 21].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">Title</label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={
                        (useCase == 10 && 'Aivinya.com') ||
                        (useCase == 21 && 'Aivinya - AI Marketing Platform')
                      }
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Website */}
                {[].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">Website</label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={useCase == 15 && 'Aivinya'}
                      onChange={(e) => setWebsite(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Ques */}
                {[11].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">No. of Questions</label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={useCase == 11 && '19'}
                      onChange={(e) => setQues(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Total */}
                {[14].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">Total</label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={useCase == 14 && '10'}
                      onChange={(e) => setTotal(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Name */}
                {[15, 17, 26].includes(useCase) && (
                  <div className="flex flex-col w-full">
                    <label className="aiwriter-inputLable">
                      {useCase == 14 ? 'Product Name' : 'Name'}
                    </label>
                    <input
                      type="text"
                      className={inputTypeText}
                      placeholder={
                        (useCase == 15 && 'Aiviya') ||
                        (useCase == 17 && 'Aiviya') ||
                        (useCase == 26 && 'Aiviya')
                      }
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                )}

                {/* Words */}
                {[2].includes(useCase) && (
                  <div className="w-full">
                    <Box sx={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-label">Words</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          className={inputTypeSelect}
                          labelId="demo-small"
                          id="demo-simple-select"
                          value={currentWord}
                          label="Words"
                          onChange={(e) => setCurrentWord(e.target.value)}
                        >
                          {wordList.map((item, index) => (
                            <MenuItem className={inputTypeSelectMenuItem} value={item} key={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                )}
              </div>
              {/* input type text-area */}
              <div>
                {/* Introduction */}
                {[2].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Introduction</label>
                      <span>
                        Characters: {introduction.length} &nbsp; Words:{' '}
                        {introduction.length == '' ? 0 : introduction.trim().split(/\s+/).length}
                      </span>
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 2 && 'Getting Started with Aivinya - AI Marketing Platform') ||
                        (useCase == 3 &&
                          'An AI powered marketing platform for auto-generating content, email automation and website and app development')
                      }
                      onChange={(e) => setIntroduction(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Buisness Description */}
                {[3].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Business Description</label>
                      <span>
                        Characters: {busiDesc.length} &nbsp; Words:{' '}
                        {busiDesc.length == '' ? 0 : busiDesc.trim().split(/\s+/).length}
                      </span>
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 3 &&
                        'An AI powered marketing platform for auto-generating content, email automation and website and app development'
                      }
                      onChange={(e) => setBusiDesc(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Idea */}
                {[4, 25].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Idea</label>
                      <span>
                        Characters: {idea.length} &nbsp; Words:{' '}
                        {idea.length == '' ? 0 : idea.trim().split(/\s+/).length}
                      </span>
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 4 &&
                          'AI powered marketing platform that automate email marketing, content writing for businesses and startups.') ||
                        (useCase == 25 && 'Horror House Kids Monster')
                      }
                      onChange={(e) => setIdea(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Interest */}
                {[5].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Interest</label>
                      <span>
                        Characters: {interest.length} &nbsp; Words:{' '}
                        {interest.length == '' ? 0 : interest.trim().split(/\s+/).length}
                      </span>
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 5 && 'AI marketing platform, saas, marketing automation'
                      }
                      onChange={(e) => setInterest(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Skills */}
                {[5, 8].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Skills</label>
                      Characters: {skills.length} &nbsp; Words:{' '}
                      {skills.length == '' ? 0 : skills.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 5 &&
                          'AI, content writer, email automation, tech development') ||
                        (useCase == 8 &&
                          'nodejs, backend development, aws, git/github, 3 years of experience, jenkins')
                      }
                      onChange={(e) => setSkills(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Points */}
                {[9].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Points</label>
                      Characters: {points.length} &nbsp; Words:{' '}
                      {points.length == '' ? 0 : points.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 9 &&
                        'AI Marketing Automation Tool that can automate email campaigning, content writing and analytics'
                      }
                      onChange={(e) => setPoints(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Description */}
                {[6, 7, 10, 11].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Description</label>
                      Characters: {desc.length} &nbsp; Words:{' '}
                      {desc.length == '' ? 0 : desc.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 6 &&
                          'An AI powered Marketing platform that helps to automate email automation, content generation, and website analytics.') ||
                        (useCase == 7 &&
                          'Aivinya is an AI powered marketing platform that helps to automate content creation, email autonamtion, ads automation, and tech development.') ||
                        (useCase == 10 &&
                          'Aivinya.com is a saas platform that aims to automate marketing tools like email marketing, content writing, social media ads posting and product development.') ||
                        (useCase == 11 &&
                          'Interviewing a candidate for the role of software engineer.')
                      }
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Message */}
                {[20].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Message</label>
                      Characters: {message.length} &nbsp; Words:{' '}
                      {message.length == '' ? 0 : message.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 20 &&
                        'Nice platform. I think this is a game changer for a lot of startups since hiring a marketing team is quite expensive, and the platform gives almost all tools that a small business needs to get started scaling.'
                      }
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* About Website */}
                {[15].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">About Website</label>
                      Characters: {about.length} &nbsp; Words:{' '}
                      {about.length == '' ? 0 : about.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 15 && 'AI tools that automates your business marketing needs.'
                      }
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Features */}
                {[15].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Features</label>
                      Characters: {features.length} &nbsp; Words:{' '}
                      {features.length == '' ? 0 : desc.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 15 &&
                        '- AI Content generation to create website copy to social media and email content\n- Supports 20+ languages and 12+ human tones\n- Email Automation that sends and schedules millions mails to your customers\n- Website Analytics that allows to track traffic on your website and analyze the customer interaction on your website\n- Tech development that allows to create websites and mobile apps from the best developers with industry-standard'
                      }
                      onChange={(e) => setFeatures(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Bio */}
                {[11].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Bio</label>
                      Characters: {bio.length} &nbsp; Words:{' '}
                      {bio.length == '' ? 0 : bio.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 11 &&
                        'John Doe is a software engineer with 3 years of experience in backend development and tools like git, aws, nodejs, jenkins and express.js'
                      }
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Topic */}
                {[16].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">
                        {useCase == 20 ? 'Review' : 'Topic'}
                      </label>
                      Characters: {post.length} &nbsp; Words:{' '}
                      {post.length == '' ? 0 : post.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={useCase == 16 && 'Aivinya - AI Marketing Platform'}
                      onChange={(e) => setPost(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Review Title */}
                {[26].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Review Title</label>
                      Characters: {review_title.length} &nbsp; Words:{' '}
                      {review_title.length == '' ? 0 : review_title.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        useCase == 26 &&
                        'Best platform to have content writer, email automation and website analytics at one place.'
                      }
                      onChange={(e) => setReview_Title(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Decription */}
                {[17, 18].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Description</label>
                      Characters: {about.length} &nbsp; Words:{' '}
                      {about.length == '' ? 0 : about.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 17 && 'Aiviya',
                        'Aivinya is an ai enabled marketing platform that automates content writing, email automation, tech development, etc') ||
                        (useCase == 18 &&
                          'Software Engineer with hands-on experience on aws, react, jenkins, git, having experience of more than 5 years')
                      }
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Purpose */}
                {[27].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Purpose</label>
                      Characters: {purpose.length} &nbsp; Words:{' '}
                      {purpose.length == '' ? 0 : purpose.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 23 &&
                          'Enagage users to check the new features of the aivinya platform') ||
                        (useCase == 27 && 'Aivinya - AI Marketing Platform tutorial')
                      }
                      onChange={(e) => setPurpose(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Context */}
                {[23].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Context</label>
                      Characters: {context.length} &nbsp; Words:{' '}
                      {context.length == '' ? 0 : context.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 23 &&
                          'Enagage users to check the new features of the aivinya platform') ||
                        (useCase == 27 && 'Aivinya - AI Marketing Platform tutorial')
                      }
                      onChange={(e) => setContext(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* Keywords */}
                {[10, 28].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">Keywords</label>
                      Characters: {keywords.length} &nbsp; Words:{' '}
                      {keywords.length == '' ? 0 : keywords.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937', backgroundColor: 'white' }}
                      placeholder={
                        (useCase == 10 &&
                          'AI marketing tools, AI content writer, Email automation') ||
                        (useCase == 28 && 'AI, Marketing, Automation, Content Writing, SaaS')
                      }
                      onChange={(e) => setKeywords(e.target.value)}
                    ></textarea>
                  </div>
                )}
                {[13, 19, 24].includes(useCase) && (
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label className="aiwriter-inputLable">
                        {useCase == 24 ? 'Song Idea' : 'Input Text'}
                      </label>
                      Characters: {inputText.length} &nbsp; Words:{' '}
                      {inputText.length == '' ? 0 : inputText.trim().split(/\s+/).length}
                    </div>
                    <textarea
                      className={inputTypeTextArea}
                      style={{ border: '1px solid #1F2937' }}
                      placeholder={
                        (useCase == 13 &&
                          'Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals and humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.The term artificial intelligence had previously been used to describe machines that mimic and display human cognitive skills that are associated with the human mind, such as learning and problem-solving.') ||
                        (useCase == 19 &&
                          `The concept of Artificial Intelligence was introduced back in 1950. Alan Turing, a mathematician and computer scientist designed a machine named as “Turing Machine”. This machine can test whether the computers can make decisions or not. The test can check the ability of machines to respond like humans.The year 1956 is considered as the birth of Artificial Intelligence. John McCarthy, a computer scientist has introduced the word “Artificial Intelligence” in the world of computer science.In 1966, the first chatbot by the name “Eliza” (Natural Language Processing computer program) was developed by Joseph Weizenbaum. In 1972, Japan developed the first humanoid robot by the name “WABOT-1” (WAseda roBOT)."`) ||
                        (useCase == 24 && 'couples beatufiul evening love')
                      }
                      onChange={(e) => setInputText(e.target.value)}
                    ></textarea>
                  </div>
                )}
              </div>
            </div>

            {/* Submit as per usecase */}
            <div className="w-full">
              {useCase === 0 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(tone == '' || model == '' || keyword == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' || model == '' || keyword == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 1 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(tone == '' || creativity == '' || blogTopic == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' || creativity == '' || blogTopic == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 2 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        currentWord == '' ||
                        creativity == '' ||
                        introduction == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      currentWord == '' ||
                      creativity == '' ||
                      introduction == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 3 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(busiDesc == '' || creativity == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={busiDesc == '' || creativity == '' || language == '' ? true : false}
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 4 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        creativity == '' ||
                        idea == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      creativity == '' ||
                      idea == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 5 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(interest == '' || skills == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={interest == '' || skills == '' || language == '' ? true : false}
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 6 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(tone == '' || desc == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' || desc == '' || variant == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 7 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(tone == '' || desc == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' || desc == '' || variant == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 8 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(role == '' || skills == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      role == '' || skills == '' || variant == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 9 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        model == '' ||
                        creativity == '' ||
                        type == '' ||
                        points == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      model == '' ||
                      creativity == '' ||
                      type == '' ||
                      points == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 10 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        model == '' ||
                        creativity == '' ||
                        title == '' ||
                        desc == '' ||
                        keywords == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      model == '' ||
                      creativity == '' ||
                      title == '' ||
                      desc == '' ||
                      keywords == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 11 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        type == '' ||
                        (type == 'Technical' && keyword == '') ||
                        desc == '' ||
                        bio == '' ||
                        ques == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      type == '' ||
                      (type == 'Technical' && keyword == '') ||
                      desc == '' ||
                      bio == '' ||
                      ques == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 12 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(role == '' || keyword == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      role == '' || keyword == '' || variant == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 13 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(tone == '' || inputText == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={tone == '' || inputText == '' || language == '' ? true : false}
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 14 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || keyword == '' || total == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      creativity == '' || keyword == '' || total == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 15 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        name == '' ||
                        about == '' ||
                        features == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      name == '' || about == '' || features == '' || variant == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 16 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        model == '' ||
                        creativity == '' ||
                        post == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      model == '' ||
                      creativity == '' ||
                      post == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 17 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        creativity == '' ||
                        name == '' ||
                        about == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      creativity == '' ||
                      name == '' ||
                      about == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 18 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        creativity == '' ||
                        about == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      creativity == '' ||
                      about == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 19 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || inputText == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={creativity == '' || inputText == '' || language == '' ? true : false}
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 20 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(message == '' || tone == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      message == '' || tone == '' || variant == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 21 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        tone == '' ||
                        creativity == '' ||
                        title == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      tone == '' ||
                      creativity == '' ||
                      title == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 22 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || keyword == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      creativity == '' || keyword == '' || variant == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 23 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(context == '' || tone == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      context == '' || tone == '' || variant == '' || language == '' ? true : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 24 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || inputText == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      creativity == '' || inputText == '' || variant == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 25 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || idea == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      creativity == '' || idea == '' || variant == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 26 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(
                        name == '' ||
                        review_title == '' ||
                        tone == '' ||
                        variant == '' ||
                        language == ''
                      )
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      name == '' ||
                      review_title == '' ||
                      tone == '' ||
                      variant == '' ||
                      language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 27 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || purpose == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      creativity == '' || purpose == '' || variant == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}

              {useCase === 28 && (
                <div className="flex justify-center items-center mt-3">
                  <button
                    className={
                      !(creativity == '' || keywords == '' || variant == '' || language == '')
                        ? 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
                        : 'inline-flex items-center font-xl py-2 px-3 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300'
                    }
                    disabled={
                      creativity == '' || keywords == '' || variant == '' || language == ''
                        ? true
                        : false
                    }
                    onClick={getData}
                  >
                    {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* output text */}
      <div className="midcomponents-height w-full overflow-y-auto overflow-x-hidden ">
        <div className="h-full mt-5 w-full py-3">
          {/* Remainig details */}
          {/* <Title>{sectionTitle}</Title> */}

          <div className="flex flex-col lg:flex-row items-start justify-between px-3 ">
            <div className="flex flex-row gap-5">
              <RxHamburgerMenu
                className="hidden lg:inline-block cursor-pointer hover:bg-blue-200 rounded-md p-1 text-[30px] transition-all duration-200"
                onClick={() => {
                  setShowSideBar(!showSideBar);
                }}
              />
              <div>
                <span className="pr-5">
                  Remaining Credits: <b>{credits}</b>
                  <Title>{titles[titleIndex]}</Title>
                </span>
              </div>
            </div>
            {/* document */}
            {/* <span className="flex flex-row">
              {
                <Box className="flex flex-col p-1" sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <Select
                      className={inputTypeSelect}
                      labelId="demo-small"
                      id="demo-simple-select"
                      value={currentDoc}
                      onChange={(e) => {
                        setCurrentDoc(e.target.value);
                        docList.forEach((doc) => {
                          if (doc.title === e.target.value) setOutputText(doc.data);
                        });
                      }}
                    >
                      {docList.map((item, index) => (
                        <MenuItem
                          className={inputTypeSelectMenuItem}
                          value={item.title}
                          key={item.title}
                        >
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              }
              <CustomModal
                triggerContent="Tutorial"
                content={
                  <div
                    className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden"
                    style={{ paddingTop: '56.25%' }}
                  >
                    <iframe
                      className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&origin=https%3A%2F%2Fmdbootstrap.com"
                      allowFullScreen
                      data-gtm-yt-inspected-2340190_699="true"
                      id={240632615}
                    />
                  </div>
                }
              />
            </span> */}
          </div>
          {/* <label className="aiwriter-inputLable">Output Editor</label> */}
          <TextEditor value={outputText} postDoc={postDoc} useCase={placeholders[useCase].at(-1)} />
        </div>
      </div>
    </div>
  );
};

const MoreInfoToggle = ({ data }) => {
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

// custom data is here
const creativityInfo = [
  'Free to change level if not satisfied with the results',
  'The higher the level, the more factual AI will be, check below',
  'Interesting - Best for extract data like Keywords, questions & answers',
  'Low - Best for extraction from text',
  'Medium - Almost same as Recommended but a little better',
  'Recommended - If not sure choose this',
  'High - Common for ideas generation, or story completion',
  'Factual -  Sometime interesting but facts based results'
];

export default AIContentOption1;
