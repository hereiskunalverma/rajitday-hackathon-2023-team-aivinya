import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Aiva = () => {
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const twitterBearerToken = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;

  const getTwitterUser = `https://api.twitter.com/2/users/by/username/`;

  const [twitterPosts, setTwitterPosts] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    axios
      .post(`${url}/api/get/sourcesByAiva`, {
        aiva_id: router.query.aiva_id
      })
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((item) => {
          if (item.name === 'Twitter') {
            getTweets();
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);

  const getTweets = () => {
    axios
      .get(`http://localhost:5000/api/get/twitterPosts`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return <div>This is an Aiva.</div>;
};

export default Aiva;
