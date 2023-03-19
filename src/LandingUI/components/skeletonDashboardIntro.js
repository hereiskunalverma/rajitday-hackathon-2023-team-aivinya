import React from 'react';
import Typical from 'react-typical';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

const typingText = [
  'Efficient miniChatGPT',
  3000,
  'Coding Assistant',
  3000,
  'Resumes',
  3000,
  'Research Papers',
  3000
];

const SkeletonDasboardIntro = () => {
  return (
    <div className="container justify-center px-5 flex mx-auto text-center">
      <Card className="rounded-3xl border-4 border-blue-400" sx={{ width: 500, height: 400, m: 2 }}>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
          action={null}
          title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />

        <a
          href="#"
          className="block p-6 w-90 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 "
        >
          <h5 className="mb-2 text-5xl font-extrabold text-transparent pb-3 bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900">
            Preparing ...{' '}
          </h5>
          <p className="font-normal text-4xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <Typical steps={typingText} wrapper="p" loop={Infinity} />
          </p>
        </a>

        <CardContent>
          <>
            <Skeleton animation="wave" height={50} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={50} width="80%" />
          </>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonDasboardIntro;
